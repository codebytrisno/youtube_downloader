# Rencana Pengujian Unit (Unit Test Plan - UTP)
## Aplikasi Konverter YouTube ke MP3

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Ruang Lingkup Pengujian](#2-ruang-lingkup-pengujian)
3. [Lingkungan Pengujian](#3-lingkungan-pengujian)
4. [Strategi dan Alat Pengujian](#4-strategi-dan-alat-pengujian)
5. [Matriks Tanggung Jawab Pengujian](#5-matriks-tanggung-jawab-pengujian)
6. [Kriteria Kelulusan dan Kegagalan](#6-kriteria-kelulusan-dan-kegagalan)
7. [Kasus Uji Unit](#7-kasus-uji-unit)
8. [Skenario Eksekusi dan Pelaporan](#8-skenario-eksekusi-dan-pelaporan)

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen
Dokumen ini bertujuan untuk mendefinisikan strategi, ruang lingkup, dan detail kasus uji untuk pengujian unit (unit testing) aplikasi konverter YouTube ke MP3. Pengujian unit ini memastikan setiap komponen dan fungsi utilitas bekerja sesuai spesifikasi sebelum integrasi ke modul lain.

### 1.2 Deskripsi Aplikasi
Aplikasi konverter YouTube ke MP3 adalah aplikasi web dibangun menggunakan Next.js 14, React 18, TypeScript, dan Tailwind CSS. Aplikasi ini memungkinkan pengguna untuk memasukkan URL YouTube, melakukan konversi ke format MP3, dan mengunduh hasil konversi.

### 1.3 Definisi dan Singkatan
| Singkatan | Makna |
|-----------|-------|
| UTP | Unit Test Plan - Rencana Pengujian Unit |
| UT | Unit Test - Pengujian Unit |
| TC | Test Case - Kasus Uji |
| PASS | Hasil pengujian yang memenuhi ekspektasi |
| FAIL | Hasil pengujian yang tidak memenuhi ekspektasi |
| SKIP | Pengujian yang dilewati |
| BLOCK | Pengujian yang diblokir karena ketergantungan eksternal |

---

## 2. Ruang Lingkup Pengujian

### 2.1 Ruang Lingkup Masuk (In Scope)
Pengujian unit mencakup modul-modul berikut:

| No | Komponen/Fungsi | Lokasi File | Jenis |
|----|----------------|-------------|-------|
| 1 | `ConverterForm()` | `components/converter-form.tsx` | Komponen React |
| 2 | `isYouTubeUrl()` | `lib/youtube.ts` | Fungsi Utilitas |
| 3 | `extractYoutubeId()` | `lib/youtube.ts` | Fungsi Utilitas |
| 4 | `DownloadResult()` | `components/download-result.tsx` | Komponen React |
| 5 | `Header()` | `components/header.tsx` | Komponen React |
| 6 | `Footer()` | `components/footer.tsx` | Komponen React |

### 2.2 Ruang Lingkup Keluar (Out of Scope)
- Pengujian End-to-End (E2E) menggunakan Playwright/Cypress
- Pengujian integrasi dengan API eksternal (ytdl-core, API YouTube)
- Pengujian performa dan beban (load testing)
- Pengujian keamanan (security testing)
- Pengujian aksesibilitas mendalam (axe-core)
- Pengujian UI visual (visual regression testing)

---

## 3. Lingkungan Pengujian

### 3.1 Spesifikasi Lingkungan
| Aspek | Detail |
|-------|--------|
| Sistem Operasi | Windows 10/11, macOS 14+, Linux Ubuntu 22.04+ |
| Runtime | Node.js >= 18.17.0 |
| Browser (untuk JSDOM) | JSDOM 24+ (simulasi DOM) |
| Resolusi Layar | Minimal 1280x720 untuk pengujian komponen responsif |
| Database/Mock | Tidak ada - menggunakan mock dan stub |

### 3.2 Konfigurasi Lingkungan
- **Environment Variables**: Menggunakan file `.env.test` dengan nilai dummy
- **Mocking Framework**: `jest.spyOn()` atau `vi.spyOn()` untuk mock modul
- **DOM Simulation**: JSDOM untuk simulasi lingkungan browser
- **Storage Simulation**: Mock untuk `localStorage` dan `sessionStorage`

### 3.3 Persiapan Lingkungan
```bash
# Instalasi dependensi
npm install

# Instalasi dependensi pengujian
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @types/jest

# Menjalankan pengujian
npm test

# Menjalankan pengujian dengan coverage
npm test -- --coverage
```

---

## 4. Strategi dan Alat Pengujian

### 4.1 Framework Pengujian yang Direkomendasikan

| Alat | Versi | Alasan Pemilihan |
|------|-------|------------------|
| **Vitest** | ^2.0.0 | Cepat, kompatibel dengan Vite, dukungan TypeScript native, cocok untuk Next.js 14+ |
| **Jest** | ^29.7.0 | Pilihan alternatif, stabil, banyak dokumentasi, didukung penuh oleh Next.js |

**Rekomendasi**: Menggunakan **Vitest** karena kecepatan eksekusi yang signifikan dibanding Jest, dukungan native untuk ESM dan TypeScript, serta integrasi yang baik dengan ekosistem Vite yang mendasari Next.js.

### 4.2 Library Pendukung

| Library | Fungsi |
|---------|--------|
| `@testing-library/react` | Merender dan menguji komponen React |
| `@testing-library/jest-dom` | Matcher tambahan untuk asserting elemen DOM |
| `@testing-library/user-event` | Simulasi interaksi pengguna (ketik, klik, hover) |
| `jsdom` | Lingkungan DOM virtual untuk Node.js |
| `@testing-library/react-hooks` | Menguji custom hooks (jika diperlukan) |

### 4.3 Tipe Pengujian
| Tipe | Deskripsi |
|------|-----------|
| **Positif** | Menguji skenario normal dimana input valid dan sistem berjalan sesuai ekspektasi |
| **Negatif** | Menguji skenario error handling dengan input tidak valid atau kondisi ekstrem |
| **Batas (Boundary)** | Menguji nilai batas atas dan bawah dari input |
| **Edege Case** | Menguji kondisi-kondisi jarang yang mungkin terjadi |

---

## 5. Matriks Tanggung Jawab Pengujian

| No | Modul | Jumlah TC | Penanggung Jawab | Prioritas |
|----|-------|-----------|-------------------|-----------|
| 1 | `ConverterForm()` | 12 | Developer Frontend | Tinggi |
| 2 | `isYouTubeUrl()` | 8 | Developer Frontend | Tinggi |
| 3 | `extractYoutubeId()` | 8 | Developer Frontend | Tinggi |
| 4 | `DownloadResult()` | 8 | Developer Frontend | Tinggi |
| 5 | `Header()` | 5 | Developer Frontend | Sedang |
| 6 | `Footer()` | 3 | Developer Frontend | Sedang |
| **Total** | | **44** | | |

---

## 6. Kriteria Kelulusan dan Kegagalan

### 6.1 Kriteria Kelulusan
- Semua Test Case dengan prioritas **Tinggi** harus mendapatkan hasil **PASS**
- Persentase kelulusan minimum: **95%** dari total Test Case
- Coverage kode minimum: **80%** untuk statements, branches, functions, dan lines
- Tidak ada Test Case dengan prioritas **Tinggi** yang mendapatkan hasil **FAIL**
- Semua error message harus sesuai dengan spesifikasi dan mudah dipahami pengguna

### 6.2 Kriteria Kegagalan
- Setidaknya satu Test Case prioritas **Tinggi** mendapatkan hasil **FAIL**
- Persentase kelulusan di bawah **80%**
- Aplikasi mengalami crash atau error tidak terduga selama eksekusi pengujian
- Mock tidak berfungsi dengan benar sehingga pengujian bergantung pada layanan eksternal

### 6.3 Tindakan Remediasi Kegagalan
1. Identifikasi Test Case yang gagal dan akar penyebabnya
2. Perbaiki bug pada kode sumber atau sesuaikan ekspektasi pengujian
3. Jalankan kembali pengujian yang terdampak
4. Dokumentasikan perubahan dalam laporan pengujian

---

## 7. Kasus Uji Unit

### 7.1 Komponen: ConverterForm()

**File**: `components/converter-form.tsx`

#### 7.1.1 Validasi URL
| ID | Deskripsi | Input/Aksi | Ekspektasi | Prioritas |
|----|-----------|------------|------------|-----------|
| TC-CF-01 | URL YouTube valid (https://www.youtube.com/watch?v=xxx) | Masukkan URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ` ke dalam input | `isYouTubeUrl()` mengembalikan `true`, tidak menampilkan error | Tinggi |
| TC-CF-02 | URL YouTube valid dengan www | Masukkan URL `https://www.youtube.com/watch?v=abc123` ke dalam input | `isYouTubeUrl()` mengembalikan `true`, tidak menampilkan error | Tinggi |
| TC-CF-03 | URL YouTube valid tanpa www | Masukkan URL `https://youtube.com/watch?v=abc123` ke dalam input | `isYouTubeUrl()` mengembalikan `true`, tidak menampilkan error | Tinggi |
| TC-CF-04 | URL YouTube pendek (youtu.be) valid | Masukkan URL `https://youtu.be/abc123` ke dalam input | `isYouTubeUrl()` mengembalikan `true`, tidak menampilkan error | Tinggi |
| TC-CF-05 | URL YouTube tidak valid - domain salah | Masukkan URL `https://www.youtubee.com/watch?v=abc123` ke dalam input | Menampilkan pesan error "Masukkan URL YouTube yang valid." | Tinggi |
| TC-CF-06 | URL YouTube tidak valid - format salah | Masukkan URL `https://www.google.com` ke dalam input | Menampilkan pesan error "Masukkan URL YouTube yang valid." | Tinggi |
| TC-CF-07 | URL YouTube tidak valid - string acak | Masukkan string `bukan_url_apa_pun` ke dalam input | Menampilkan pesan error "Masukkan URL YouTube yang valid." | Tinggi |
| TC-CF-08 | Input kosong | Biarkan input kosong dan coba submit form | `isYouTubeUrl()` mengembalikan `false` karena string kosong, menampilkan pesan error | Tinggi |

#### 7.1.2 State Loading dan Submit Form
| ID | Deskripsi | Input/Aksi | Ekspektasi | Prioritas |
|----|-----------|------------|------------|-----------|
| TC-CF-09 | Submit form dengan URL valid - state loading aktif | Masukkan URL valid dan submit form | Tombol menjadi disabled, teks tombol berubah menjadi "Converting", progress bar muncul | Tinggi |
| TC-CF-10 | Submit form - loading mencegah submit ganda | Klik tombol submit berulang kali saat loading | Hanya satu permintaan API yang dikirim (fetch hanya dipanggil sekali) | Tinggi |
| TC-CF-11 | Submit form - state loading di-reset setelah selesai | Tunggu hingga proses selesai | Tombol kembali aktif, progress bar menghilang, `loading` menjadi `false` | Tinggi |
| TC-CF-12 | Progress bar muncul dengan nilai awal | Submit form dengan URL valid | Progress bar muncul dengan nilai awal 8% | Sedang |

#### 7.1.3 Error Handling
| ID | Deskripsi | Input/Aksi | Ekspektasi | Prioritas |
|----|-----------|------------|------------|-----------|
| TC-CF-13 | API mengembalikan error 400 | Mock fetch mengembalikan response dengan status 400 dan message "URL tidak valid" | Menampilkan pesan error dari response, state loading di-reset | Tinggi |
| TC-CF-14 | API mengembalikan error 500 | Mock fetch mengembalikan response dengan status 500 | Menampilkan pesan error "Konversi gagal." atau message dari server, state loading di-reset | Tinggi |
| TC-CF-15 | Network error / fetch gagal | Mock fetch melempar Error("Network error") | Menampilkan pesan error "Network error", state loading di-reset | Tinggi |
| TC-CF-16 | Response JSON tidak valid | Mock fetch mengembalikan JSON yang tidak sesuai tipe `ConvertResponse` | Menampilkan pesan error "Konversi gagal.", state loading di-reset | Sedang |

#### 7.1.4 Interaksi localStorage dan Navigasi
| ID | Deskripsi | Input/Aksi | Ekspektasi | Prioritas |
|----|-----------|------------|------------|-----------|
| TC-CF-17 | Simpan hasil ke localStorage pada sukses | Submit form dengan URL valid, API mengembalikan data sukses | `localStorage.setItem("yt-mp3-result", ...)` dipanggil dengan data yang benar termasuk `sourceUrl` | Tinggi |
| TC-CF-18 | Navigasi ke halaman download pada sukses | Submit form dengan URL valid, API mengembalikan data sukses | `router.push("/download")` dipanggil | Tinggi |
| TC-CF-19 | localStorage tidak diubah pada error | Submit form, API mengembalikan error 500 | `localStorage.setItem()` tidak dipanggil | Tinggi |

---

### 7.2 Fungsi Utilitas: isYouTubeUrl()

**File**: `lib/youtube.ts`

#### 7.2.1 Pola URL Valid
| ID | Deskripsi | Input | Ekspektasi | Prioritas |
|----|-----------|-------|------------|-----------|
| TC-IYU-01 | URL www.youtube.com/watch | `https://www.youtube.com/watch?v=dQw4w9WgXcQ` | Mengembalikan `true` | Tinggi |
| TC-IYU-02 | URL youtube.com tanpa www | `https://youtube.com/watch?v=dQw4w9WgXcQ` | Mengembalikan `true` | Tinggi |
| TC-IYU-03 | URL youtu.be pendek | `https://youtu.be/dQw4w9WgXcQ` | Mengembalikan `true` | Tinggi |
| TC-IYU-04 | URL dengan parameter tambahan | `https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=120s` | Mengembalikan `true` | Tinggi |
| TC-IYU-05 | URL dengan http (bukan https) | `http://www.youtube.com/watch?v=dQw4w9WgXcQ` | Mengembalikan `true` | Sedang |
| TC-IYU-06 | URL m.youtube.com (mobile) | `https://m.youtube.com/watch?v=dQw4w9WgXcQ` | Mengembalikan `true` (karena host.endsWith("youtube.com")) | Sedang |

#### 7.2.2 Pola URL Tidak Valid
| ID | Deskripsi | Input | Ekspektasi | Prioritas |
|----|-----------|-------|------------|-----------|
| TC-IYU-07 | Domain youtube salah eja | `https://www.youtubee.com/watch?v=abc123` | Mengembalikan `false` | Tinggi |
| TC-IYU-08 | Domain lain sepenuhnya | `https://www.google.com` | Mengembalikan `false` | Tinggi |
| TC-IYU-09 | String bukan URL | `bukan_url_apa_pun` | Mengembalikan `false` | Tinggi |
| TC-IYU-10 | String kosong | `""` | Mengembalikan `false` | Tinggi |
| TC-IYU-11 | URL dengan port | `https://www.youtube.com:443/watch?v=abc123` | Mengembalikan `true` (host masih youtube.com) | Sedang |

---

### 7.3 Fungsi Utilitas: extractYoutubeId()

**File**: `lib/youtube.ts`

#### 7.3.1 Ekstraksi ID dari URL Format Watch
| ID | Deskripsi | Input | Ekspektasi | Prioritas |
|----|-----------|-------|------------|-----------|
| TC-EYI-01 | URL watch standar | `https://www.youtube.com/watch?v=dQw4w9WgXcQ` | Mengembalikan `dQw4w9WgXcQ` | Tinggi |
| TC-EYI-02 | URL watch tanpa www | `https://youtube.com/watch?v=dQw4w9WgXcQ` | Mengembalikan `dQw4w9WgXcQ` | Tinggi |
| TC-EYI-03 | URL watch dengan parameter lain | `https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=120s` | Mengembalikan `dQw4w9WgXcQ` | Tinggi |
| TC-EYI-04 | URL watch tanpa parameter v | `https://www.youtube.com/watch` | Mengembalikan fallback `jfKfPfyJRdk` | Tinggi |

#### 7.3.2 Ekstraksi ID dari URL Format Short
| ID | Deskripsi | Input | Ekspektasi | Prioritas |
|----|-----------|-------|------------|-----------|
| TC-EYI-05 | URL youtu.be standar | `https://youtu.be/dQw4w9WgXcQ` | Mengembalikan `dQw4w9WgXcQ` | Tinggi |
| TC-EYI-06 | URL youtu.be dengan query | `https://youtu.be/dQw4w9WgXcQ?t=30` | Mengembalikan `dQw4w9WgXcQ` | Tinggi |
| TC-EYI-07 | URL youtu.be tanpa ID | `https://youtu.be/` | Mengembalikan fallback `jfKfPfyJRdk` | Tinggi |

#### 7.3.3 Ekstraksi ID dari URL Format Shorts/Live
| ID | Deskripsi | Input | Ekspektasi | Prioritas |
|----|-----------|-------|------------|-----------|
| TC-EYI-08 | URL shorts standar | `https://www.youtube.com/shorts/dQw4w9WgXcQ` | Mengembalikan `dQw4w9WgXcQ` | Tinggi |
| TC-EYI-09 | URL live standar | `https://www.youtube.com/live/dQw4w9WgXcQ` | Mengembalikan `dQw4w9WgXcQ` | Tinggi |
| TC-EYI-10 | URL shorts tanpa ID | `https://www.youtube.com/shorts/` | Mengembalikan fallback `jfKfPfyJRdk` | Sedang |

#### 7.3.4 Ekstraksi ID dari Input Tidak Valid
| ID | Deskripsi | Input | Ekspektasi | Prioritas |
|----|-----------|-------|------------|-----------|
| TC-EYI-11 | String bukan URL | `bukan_url` | Mengembalikan fallback `jfKfPfyJRdk` | Tinggi |
| TC-EYI-12 | String kosong | `""` | Mengembalikan fallback `jfKfPfyJRdk` | Tinggi |
| TC-EYI-13 | Domain bukan YouTube | `https://www.vimeo.com/123456` | Mengembalikan fallback `jfKfPfyJRdk` | Tinggi |

---

### 7.4 Komponen: DownloadResult()

**File**: `components/download-result.tsx`

#### 7.4.1 Render Default dan Data
| ID | Deskripsi | Kondisi | Ekspektasi | Prioritas |
|----|-----------|---------|------------|-----------|
| TC-DR-01 | Render dengan fallback data (tanpa localStorage) | `localStorage` kosong, tanpa query param | Menampilkan data fallback (judul Lofi Hip Hop, thumbnail default, durasi 4:32, kualitas 320kbps, ukuran 10.4 MB) | Tinggi |
| TC-DR-02 | Render dengan data dari localStorage | `localStorage` berisi data hasil konversi | Menampilkan data dari `localStorage` yang di-merge dengan fallback | Tinggi |
| TC-DR-03 | Render dengan title dari query parameter | Query param `?title=Judul Kustom` | Judul menampilkan "Judul Kustom" (override dari localStorage) | Tinggi |
| TC-DR-04 | Override localStorage dengan query parameter | `localStorage` berisi judul A, query param `?title=B` | Judul menampilkan "B" | Tinggi |

#### 7.4.2 Tombol Download
| ID | Deskripsi | Kondisi | Ekspektasi | Prioritas |
|----|-----------|---------|------------|-----------|
| TC-DR-05 | Tombol download aktif dengan URL valid | `result.url` memiliki nilai (misal `https://example.com/file.mp3`) | Tombol dapat diklik (`pointer-events-auto`), `aria-disabled="false"`, href sesuai dengan URL | Tinggi |
| TC-DR-06 | Tombol download disabled tanpa URL | `result.url` string kosong | Tombol tidak dapat diklik (`pointer-events-none`), opacity 50%, `aria-disabled="true"`, href="#" | Tinggi |
| TC-DR-07 | Tombol download menampilkan ikon download | Tombol dalam keadaan aktif | Ikon `download` dari MaterialIcon ditampilkan | Sedang |
| TC-DR-08 | Teks tombol download | Tombol dalam keadaan aktif | Menampilkan teks "Download MP3" | Sedang |

#### 7.4.3 Interaksi localStorage
| ID | Deskripsi | Kondisi | Ekspektasi | Prioritas |
|----|-----------|---------|------------|-----------|
| TC-DR-09 | Membaca data dari localStorage saat mount | `localStorage` berisi JSON valid | Data dari `localStorage` di-parse dan ditampilkan | Tinggi |
| TC-DR-10 | Menangani localStorage dengan JSON invalid | `localStorage` berisi string bukan JSON | Tidak terjadi crash, data fallback tetap ditampilkan | Tinggi |
| TC-DR-11 | localStorage kosong | `localStorage` tidak memiliki key `yt-mp3-result` | Data fallback ditampilkan | Tinggi |
| TC-DR-12 | Menangani localStorage null | `localStorage.getItem()` mengembalikan `null` | Tidak terjadi crash, data fallback ditampilkan | Tinggi |

#### 7.4.4 Link Navigasi
| ID | Deskripsi | Aksi | Ekspektasi | Prioritas |
|----|-----------|------|------------|-----------|
| TC-DR-13 | Link "Convert Another" mengarah ke home | Render komponen | Link memiliki href `/` dan teks "Convert Another" | Tinggi |
| TC-DR-14 | Link "Convert Another" menampilkan ikon refresh | Render komponen | Ikon `refresh` dari MaterialIcon ditampilkan | Sedang |

---

### 7.5 Komponen: Header()

**File**: `components/header.tsx`

#### 7.5.1 Render Link Navigasi
| ID | Deskripsi | Kondisi | Ekspektasi | Prioritas |
|----|-----------|---------|------------|-----------|
| TC-HD-01 | Render semua item navigasi | Pathname `/` | Menampilkan 3 link: Home, FAQ, Privacy Policy | Tinggi |
| TC-HD-02 | Link Home aktif di halaman utama | Pathname `/` | Link Home memiliki style aktif (border-b-2 border-primary, text-primary) | Tinggi |
| TC-HD-03 | Link FAQ aktif di halaman utama | Pathname `/` (karena FAQ adalah anchor `/#faq`) | Link FAQ memiliki style aktif | Tinggi |
| TC-HD-04 | Link FAQ tidak aktif di halaman lain | Pathname `/privacy` | Link FAQ memiliki style tidak aktif (text-secondary) | Tinggi |
| TC-HD-05 | Link Privacy Policy aktif | Pathname `/privacy` | Link Privacy Policy memiliki style aktif | Tinggi |
| TC-HD-06 | Render brand logo dan nama | Selalu ditampilkan | Menampilkan ikon `play_circle` dan teks "YT-MP3" | Tinggi |

#### 7.5.2 Responsivitas
| ID | Deskripsi | Kondisi | Ekspektasi | Prioritas |
|----|-----------|---------|------------|-----------|
| TC-HD-07 | Navigasi tersembunyi di layar kecil | Lebar layar < 768px (md breakpoint) | Elemen `<nav>` memiliki class `hidden md:flex` | Sedang |
| TC-HD-08 | Navigasi terlihat di layar besar | Lebar layar >= 768px | Elemen `<nav>` terlihat (class `md:flex`) | Sedang |

---

### 7.6 Komponen: Footer()

**File**: `components/footer.tsx`

#### 7.6.1 Render Konten Footer
| ID | Deskripsi | Kondisi | Ekspektasi | Prioritas |
|----|-----------|---------|------------|-----------|
| TC-FT-01 | Render brand name | Selalu ditampilkan | Menampilkan teks "YT-MP3" dengan class `text-primary` | Tinggi |
| TC-FT-02 | Render link Privacy Policy | Selalu ditampilkan | Link dengan href `/privacy` dan teks "Privacy Policy" | Tinggi |
| TC-FT-03 | Render link Terms | Selalu ditampilkan | Link dengan href `/` dan teks "Terms" | Tinggi |
| TC-FT-04 | Render link Contact | Selalu ditampilkan | Link dengan href `/` dan teks "Contact" | Tinggi |
| TC-FT-05 | Render copyright text | Selalu ditampilkan | Menampilkan teks "© 2026 Create By Trisno Sanjaya" | Tinggi |

#### 7.6.2 Styling dan Layout
| ID | Deskripsi | Kondisi | Ekspektasi | Prioritas |
|----|-----------|---------|------------|-----------|
| TC-FT-06 | Link memiliki style hover | Hover mouse ke link | Link memiliki `hover:underline hover:text-primary` | Sedang |
| TC-FT-07 | Layout responsif | Lebar layar kecil | Link link tersusun vertikal (`flex-col`) | Sedang |
| TC-FT-08 | Layout responsif | Lebar layar besar (md) | Link link tersusun horizontal (`md:flex-row md:justify-between`) | Sedang |

---

## 8. Skenario Eksekusi dan Pelaporan

### 8.1 Skenario Eksekusi
1. **Persiapan**: Instalasi semua dependensi pengujian
2. **Konfigurasi**: Setup file konfigurasi Vitest/Jest dan mock
3. **Eksekusi**: Jalankan seluruh Test Case
4. **Analisis**: Evaluasi hasil dan identifikasi kegagalan
5. **Remediasi**: Perbaiki bug atau sesuaikan ekspektasi
6. **Re-eksekusi**: Jalankan kembali pengujian yang terdampak
7. **Pelaporan**: Dokumentasikan hasil dalam laporan pengujian

### 8.2 Format Pelaporan Hasil Pengujian
```
ID Test Case | Deskripsi | Hasil | Keterangan
-------------|-----------|-------|------------
TC-CF-01    | URL valid | PASS  | -
TC-CF-05    | Domain salah | PASS  | -
TC-CF-13    | API error 400 | FAIL  | Pesan error tidak sesuai ekspektasi
```

### 8.3 Metrik Pengujian
| Metrik | Target |
|--------|--------|
| Total Test Case | 44 |
| Test Case Dilakukan | 44 |
| Pass | >= 42 (95%) |
| Fail | <= 2 (5%) |
| Coverage Statements | >= 80% |
| Coverage Branches | >= 80% |
| Coverage Functions | >= 80% |
| Coverage Lines | >= 80% |

---

## Lampiran

### A. Template Konfigurasi Vitest
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['components/**/*.{ts,tsx}', 'lib/**/*.ts'],
      exclude: ['node_modules/', '.next/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

### B. Template Setup Test
```typescript
// tests/setup.ts
import '@testing-library/jest-dom/vitest';

class StorageMock {
  private store: Record<string, string> = {};
  getItem(key: string) { return this.store[key] || null; }
  setItem(key: string, value: string) { this.store[key] = value.toString(); }
  removeItem(key: string) { delete this.store[key]; }
  clear() { this.store = {}; }
}

Object.defineProperty(window, 'localStorage', { value: new StorageMock() });
Object.defineProperty(window, 'sessionStorage', { value: new StorageMock() });
```

### C. Template Mock untuk Next.js Navigation
```typescript
// tests/mocks/next-navigation.ts
const mockPush = vi.fn();
const mockUsePathname = vi.fn();
const mockUseSearchParams = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => mockUsePathname(),
  useSearchParams: () => mockUseSearchParams(),
}));
```

---

*Dokumen ini disusun oleh tim pengembang dan menjadi acuan untuk kegiatan pengujian unit aplikasi konverter YouTube ke MP3.*

*Tanggal Pembuatan: 15 Juni 2026*
*Versi: 1.0*
