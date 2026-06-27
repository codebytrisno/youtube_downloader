import { extractYoutubeId, isYouTubeUrl } from "@/lib/youtube";
import { NextRequest, NextResponse } from "next/server";

type NormalizedResult = {
  url: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  quality: string;
  size: string;
  format: string;
};

const DEFAULT_HOST = "youtube-to-mp4-mp3.p.rapidapi.com";

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function pick(values: Record<string, unknown>, ...keys: string[]): string {
  for (const key of keys) {
    const v = stringValue(values[key]);
    if (v) return v;
  }
  return "";
}

function formatDuration(value: string | number | undefined): string {
  const str = String(value ?? "");
  if (!str) return "Unknown";

  const num = parseInt(str, 10);
  if (!isNaN(num) && num > 0) {
    const mins = Math.floor(num / 60);
    const sec = num % 60;
    return `${mins}:${sec.toString().padStart(2, "0")}`;
  }

  return str;
}

function detectFormat(url: string, requestedFormat: string): string {
  const ext = url.split("?").shift()?.split(".").pop()?.toLowerCase();
  if (ext === "mp4") return "mp4";
  if (ext === "webm") return "mp4";
  if (ext === "mp3" || ext === "m4a" || ext === "aac" || ext === "wav") return "mp3";
  return requestedFormat;
}

function getHost(): string {
  return process.env.VIDEO_DOWNLOAD_API_HOST || process.env.RAPID_API_HOST || DEFAULT_HOST;
}

function getApiKey(): string | undefined {
  return process.env.VIDEO_DOWNLOAD_API_KEY || process.env.RAPID_API_KEY;
}

async function fetchFromApi(sourceUrl: string, format: string = "mp3") {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw { message: "API key belum dikonfigurasi. Atur VIDEO_DOWNLOAD_API_KEY di Vercel Environment Variables.", status: 503 };
  }

  const host = getHost();
  const endpoint = format === "mp4" ? "video-info" : "audio-info";
  const url = `https://${host}/api/${endpoint}?url=${encodeURIComponent(sourceUrl)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": host,
    },
  });

  if (!response.ok) {
    let msg = "API request failed";
    try {
      const err = await response.json();
      msg = stringValue(err.message) || stringValue(err.msg) || msg;
    } catch {}
    throw { message: msg, status: response.status };
  }

  return response.json();
}

function normalizeResult(data: any, sourceUrl: string, format: string): NormalizedResult {
  const videoId = extractYoutubeId(sourceUrl);
  const downloadUrl = pick(data, "downloadUrl", "source", "url", "link", "src");
  const title = pick(data, "title", "name");
  const thumbnail = pick(data, "thumbnail", "thumb", "thumbnailUrl");
  const duration = formatDuration(data.duration ?? data.length ?? data.lengthSeconds);
  const quality = pick(data, "quality", "resolution");
  const fileSize = pick(data, "fileSizeMB", "size", "fileSize", "contentLength");

  const actualFormat = detectFormat(downloadUrl, format);
  const defaultQuality = actualFormat === "mp4" ? "720p" : "320kbps";

  return {
    url: downloadUrl,
    title: title || `YouTube Video (${videoId})`,
    thumbnailUrl: thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    duration,
    quality: quality || defaultQuality,
    size: fileSize ? `${fileSize} MB` : "Unknown",
    format: actualFormat,
  };
}

async function handleConvert(sourceUrl: string, format: string = "mp3") {
  if (!sourceUrl) {
    return NextResponse.json({ message: "URL YouTube wajib diisi." }, { status: 400 });
  }

  if (!isYouTubeUrl(sourceUrl)) {
    return NextResponse.json({ message: "Masukkan URL YouTube yang valid." }, { status: 400 });
  }

  try {
    const data = await fetchFromApi(sourceUrl, format);
    const result = normalizeResult(data, sourceUrl, format);

    if (!result.url) {
      return NextResponse.json({
        message: stringValue(data.message) || data.msg || "Gagal mendapatkan link download.",
        status: "502",
      }, { status: 502 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    const isConfigError = error?.status === 503;
    const status = isConfigError ? 503 : (error?.status || 502);

    return NextResponse.json({
      message: isConfigError ? error.message : (error?.message || "API gagal memproses permintaan."),
      detail: isConfigError ? "Atur environment variable yang diperlukan." : (error?.message || "Unknown error"),
    }, { status });
  }
}

export async function GET(request: NextRequest) {
  try {
    const sourceUrl = request.nextUrl.searchParams.get("url") || "";
    const format = request.nextUrl.searchParams.get("format") || "mp3";
    return await handleConvert(sourceUrl, format);
  } catch {
    return NextResponse.json({ message: "API gagal memproses permintaan." }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json().catch(() => null);
    const sourceUrl = typeof payload?.url === "string" ? payload.url.trim() : "";
    const format = typeof payload?.format === "string" ? payload.format.trim() : "mp3";
    return await handleConvert(sourceUrl, format);
  } catch {
    return NextResponse.json({ message: "API gagal memproses permintaan." }, { status: 502 });
  }
}
