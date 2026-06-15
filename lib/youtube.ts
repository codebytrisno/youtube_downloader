export function extractYoutubeId(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    const pathname = url.pathname;

    if (host === "youtu.be") {
      return pathname.slice(1).split(/[?&]/)[0] || "jfKfPfyJRdk";
    }

    if (host.endsWith("youtube.com")) {
      if (pathname.startsWith("/watch")) {
        return url.searchParams.get("v") || "jfKfPfyJRdk";
      }

      if (pathname.startsWith("/shorts/") || pathname.startsWith("/live/")) {
        return pathname.split("/")[2] || "jfKfPfyJRdk";
      }
    }
  } catch {
    return "jfKfPfyJRdk";
  }

  return "jfKfPfyJRdk";
}

export function isYouTubeUrl(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");
    return host === "youtube.com" || host === "youtu.be";
  } catch {
    return false;
  }
}
