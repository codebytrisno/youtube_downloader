import { extractYoutubeId, isYouTubeUrl } from "@/lib/youtube";
import { NextRequest, NextResponse } from "next/server";

type ApiResult = {
  link?: string;
  title?: string;
  thumbnail?: string;
  duration?: string;
  quality?: string;
  message?: string;
  status?: string;
  result?: {
    link?: string;
    title?: string;
    thumbnail?: string;
    duration?: string;
  };
};

type NormalizedResult = {
  url: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  quality: string;
  size: string;
};

const DEFAULT_HOST = "youtube-mp36.p.rapidapi.com";

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function formatDuration(seconds: number | string | undefined): string {
  const secs = typeof seconds === "string" ? parseInt(seconds || "0", 10) : (typeof seconds === "number" ? seconds : 0);
  if (!secs || isNaN(secs)) return "Unknown";
  const mins = Math.floor(secs / 60);
  const sec = secs % 60;
  return `${mins}:${sec.toString().padStart(2, "0")}`;
}

function getHost(): string {
  return process.env.VIDEO_DOWNLOAD_API_HOST || process.env.RAPID_API_HOST || DEFAULT_HOST;
}

function getApiKey(): string | undefined {
  return process.env.VIDEO_DOWNLOAD_API_KEY || process.env.RAPID_API_KEY;
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchFromRapidApi(sourceUrl: string): Promise<ApiResult> {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw {
      message: "API key belum dikonfigurasi. Atur VIDEO_DOWNLOAD_API_KEY di Vercel Environment Variables.",
      status: 503
    };
  }

  const host = getHost();
  const videoId = extractYoutubeId(sourceUrl);
  const endpoint = `https://${host}/dl?id=${encodeURIComponent(videoId)}`;

  const maxRetries = 20;
  let attempts = 0;
  let lastData: any = {};

  while (attempts < maxRetries) {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": host,
      },
    });

    let data: any;
    try {
      data = await response.json();
    } catch {
      throw {
        message: "API mengembalikan respons yang tidak valid.",
        status: response.status
      };
    }

    lastData = data;

    if (data.status === "processing") {
      attempts++;
      await sleep(1000);
      continue;
    }

    if (!response.ok) {
      throw {
        message: stringValue(data.msg || data.message) || "API request failed",
        status: response.status
      };
    }

    return {
      link: data.link,
      message: data.msg,
      status: data.status,
    };
  }

  return {
    link: lastData.link,
    message: lastData.msg || "Konversi memakan waktu terlalu lama. Coba lagi nanti.",
    status: lastData.status,
  };
}

function normalizeResult(data: ApiResult, sourceUrl: string): NormalizedResult {
  const videoId = extractYoutubeId(sourceUrl);
  const result = data.result || data;
  
  return {
    url: stringValue(result.link),
    title: stringValue(result.title) || `YouTube Video (${videoId})`,
    thumbnailUrl: stringValue(result.thumbnail) || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    duration: formatDuration(result.duration),
    quality: "320kbps",
    size: "Unknown",
  };
}

async function handleConvert(sourceUrl: string) {
  if (!sourceUrl) {
    return NextResponse.json({ message: "URL YouTube wajib diisi." }, { status: 400 });
  }

  if (!isYouTubeUrl(sourceUrl)) {
    return NextResponse.json({ message: "Masukkan URL YouTube yang valid." }, { status: 400 });
  }

  try {
    const data = await fetchFromRapidApi(sourceUrl);

    const downloadLink = stringValue(data.link);

    if (!downloadLink) {
      const detail = stringValue(data.message) || "Coba lagi dalam beberapa saat.";
      return NextResponse.json({ message: detail, status: data.status || "502" }, { status: 502 });
    }

    return NextResponse.json(normalizeResult(data, sourceUrl));
  } catch (error: any) {
    const isConfigError = error?.status === 503;
    const status = isConfigError ? 503 : (error?.status || 502);

    return NextResponse.json({
      message: isConfigError ? error.message : (error?.message || "API gagal memproses permintaan."),
      detail: isConfigError ? "Atur environment variable yang diperlukan." : (error?.message || "Unknown error")
    }, { status });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sourceUrl = request.nextUrl.searchParams.get("url") || "";
    return await handleConvert(sourceUrl);
  } catch {
    return NextResponse.json({ message: "API gagal memproses permintaan." }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json().catch(() => null);
    const sourceUrl = typeof payload?.url === "string" ? payload.url.trim() : "";
    return await handleConvert(sourceUrl);
  } catch {
    return NextResponse.json({ message: "API gagal memproses permintaan." }, { status: 502 });
  }
}