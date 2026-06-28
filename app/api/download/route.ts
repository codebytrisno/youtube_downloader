import { Innertube } from "youtubei.js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const type = request.nextUrl.searchParams.get("type");
  const quality = request.nextUrl.searchParams.get("quality") || "720";

  if (!url || !type) {
    return NextResponse.json({ error: "Missing url or type parameter" }, { status: 400 });
  }

  const videoId = extractVideoId(url);

  if (!videoId) {
    return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
  }

  const rapidKey = process.env.RAPIDAPI_KEY;

  // Try RapidAPI first if key is available
  if (rapidKey) {
    try {
      const dlQuality = quality;
      const dlUrl = new URL("https://youtube-convert-download-api-mp3-mp4.p.rapidapi.com/dl/");
      dlUrl.searchParams.set("videoId", videoId);
      dlUrl.searchParams.set("quality", dlQuality);
      dlUrl.searchParams.set("format", type);

      const response = await fetch(dlUrl.toString(), {
        headers: {
          "x-rapidapi-key": rapidKey,
          "x-rapidapi-host": "youtube-convert-download-api-mp3-mp4.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        if (data.dlUrl && data.status === "ready") {
          const fileRes = await fetch(data.dlUrl);
          if (fileRes.ok && fileRes.body) {
            const contentType = type === "mp3" ? "audio/mpeg" : "video/mp4";
            const extension = type === "mp3" ? "mp3" : "mp4";
            return new NextResponse(fileRes.body, {
              headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="video.${extension}"`,
              },
            });
          }
        }
      }
      console.warn("RapidAPI download failed, falling back to Innertube");
    } catch (e) {
      console.warn("RapidAPI download error, falling back to Innertube", e);
    }
  }

  // Fallback: use Innertube (youtubei.js)
  try {
    const yt = await Innertube.create();
    const info = await yt.getInfo(videoId);

    const title = info.basic_info.title || "audio";
    const filename = title.replace(/[<>:\"/\\|?*]/g, "_").trim() || "audio";

    const allFormats = [
      ...(info.streaming_data?.formats || []),
      ...(info.streaming_data?.adaptive_formats || []),
    ];

    if (allFormats.length === 0) {
      return NextResponse.json({ error: "No streaming data available" }, { status: 500 });
    }

    // For MP3: find best audio format with URL
    if (type === "mp3") {
      const audioFormat = allFormats.find((f) => f.url && f.has_audio && !f.has_video)
        || allFormats.find((f) => f.has_audio && !f.has_video);

      if (audioFormat?.url) {
        return await streamFromUrl(audioFormat.url, filename, "audio/mpeg", "mp3");
      }

      // Fallback: use yt.download for audio only
      const audioStream = await yt.download(videoId, { type: "audio", format: "mp4" });
      return new NextResponse(audioStream as any, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Disposition": `attachment; filename="${filename}.mp3"`,
        },
      });
    }

    // For MP4: find muxed format (video+audio) first
    const muxed = allFormats.find((f) => f.has_video && f.has_audio);
    if (muxed?.url) {
      return await streamFromUrl(muxed.url, filename, "video/mp4", "mp4");
    }

    // No muxed format found (e.g. 1080p). Use yt.download for combined stream
    try {
      const qualityMap: Record<string, string> = {
        "144": "144p", "240": "240p", "360": "360p", "480": "480p",
        "720": "720p", "1080": "1080p", "1440": "1440p", "2160": "2160p",
        "4k": "2160p",
      };
      const ytQuality = qualityMap[quality] || "720p";

      const combinedStream = await yt.download(videoId, {
        type: "video+audio",
        quality: ytQuality,
        format: "mp4",
      });

      return new NextResponse(combinedStream as any, {
        headers: {
          "Content-Type": "video/mp4",
          "Content-Disposition": `attachment; filename="${filename}.mp4"`,
        },
      });
    } catch (downloadErr) {
      console.error("yt.download failed, trying video-only fallback", downloadErr);
    }

    // Last resort: find any video format with URL
    const videoOnly = allFormats.find((f) => f.has_video && f.url);
    if (videoOnly?.url) {
      return await streamFromUrl(videoOnly.url, filename, "video/mp4", "mp4");
    }

    return NextResponse.json({ error: "No downloadable format found for this video" }, { status: 500 });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}

async function streamFromUrl(
  streamUrl: string,
  filename: string,
  contentType: string,
  extension: string
): Promise<NextResponse> {
  const response = await fetch(streamUrl, {
    headers: {
      Referer: "https://www.youtube.com",
      Origin: "https://www.youtube.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok || !response.body) {
    throw new Error("Failed to fetch stream from YouTube");
  }

  return new NextResponse(response.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}.${extension}"`,
    },
  });
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}
