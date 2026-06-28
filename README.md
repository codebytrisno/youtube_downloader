# YouTube Downloader

Aplikasi web untuk mengunduh video YouTube sebagai MP3 (audio) atau MP4 (video) dengan cepat dan gratis. Dibangun dengan **Next.js 15**, **React 19**, **TypeScript**, dan **Tailwind CSS**.

## Fitur

- Konversi video YouTube ke MP3 atau MP4
- Pilih kualitas: 128–320 kbps (MP3) atau 360p–4K (MP4)
- Tampilkan info video (judul, durasi, thumbnail) sebelum unduh
- Tema terang/gelap
- UI responsif (desktop, tablet, mobile)
- Bahasa Indonesia
- Tidak perlu registrasi

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 3
- **Bahasa:** TypeScript
- **Ekstraksi YouTube:** [youtubei.js](https://github.com/LuanRT/YouTube.js)
- **Font:** Inter (Google Fonts)
- **Ikon:** Material Symbols

## Cara Install

```bash
npm install
```

## Cara Menjalankan

```bash
# Development
npm run dev

# Production
npm run build
npm run start
```

Buka `http://localhost:3000`.

## Script

| Perintah        | Keterangan                    |
| --------------- | ----------------------------- |
| `npm run dev`   | Server development            |
| `npm run build` | Build production              |
| `npm run start` | Jalankan production server    |
| `npm run lint`  | Linting ESLint                |
| `npm run typecheck` | Cek tipe TypeScript       |
