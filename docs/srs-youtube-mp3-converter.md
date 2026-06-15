# Spesifikasi Kebutuhan Perangkat Lunak (SRS)
## Aplikasi Konverter YouTube ke MP3

| **Dokumen** | Spesifikasi Kebutuhan Perangkat Lunak |
|------------|---------------------------------------|
| **Nama Aplikasi** | YouTube to MP3 Web Converter |
| **Versi** | 1.0 |
| **Tanggal** | 15 Juni 2026 |
| **Teknologi** | Next.js, React, Tailwind CSS |

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
   - 1.1 [Tujuan](#11-tujuan)
   - 1.2 [Ruang Lingkup](#12-ruang-lingkup)
   - 1.3 [Definisi, Akronim, dan Singkatan](#13-definisi-akronim-dan-singkatan)
   - 1.4 [Referensi](#14-referensi)
   - 1.5 [Ringkasan Dokumen](#15-ringkasan-dokumen)
2. [Deskripsi Umum](#2-deskripsi-umum)
   - 2.1 [Perspektif Produk](#21-perspektif-produk)
   - 2.2 [Fitur Produk](#22-fitur-produk)
   - 2.3 [Karakteristik Pengguna](#23-karakteristik-pengguna)
   - 2.4 [Batasan Umum](#24-batasan-umum)
   - 2.5 [Asumsi dan Ketergantungan](#25-asumsi-dan-ketergantungan)
   - 2.6 [Kebutuhan Awal](#26-kebutuhan-awal)
3. [Kebutuhan Fungsional](#3-kebutuhan-fungsional)
   - 3.1 [Validasi URL YouTube](#31-validasi-url-youtube)
   - 3.2 [Pemilihan Kualitas Audio](#32-pemilihan-kualitas-audio)
   - 3.3 [Ekstraksi Audio](#33-ekstraksi-audio)
   - 3.4 [Download File](#34-download-file)
   - 3.5 [Penanganan Error](#35-penanganan-error)
4. [Kebutuhan Non-Fungsional](#4-kebutuhan-non-fungsional)
   - 4.1 [Performa](#41-performa)
   - 4.2 [Keamanan](#42-keamanan)
   - 4.3 [Keandalan](#43-keandalan)
   - 4.4 [Ketersediaan](#44-ketersediaan)
   - 4.5 [Kemudahan Penggunaan](#45-kemudahan-penggunaan)
   - 4.6 [Kompatibilitas](#46-kompatibilitas)
5. [Kebutuhan Antarmuka Eksternal](#5-kebutuhan-antarmuka-eksternal)
   - 5.1 [Antarmuka Pengguna](#51-antarmuka-pengguna)
   - 5.2 [Antarmuka Perangkat Keras](#52-antarmuka-perangkat-keras)
   - 5.3 [Antarmuka Perangkat Lunak](#53-antarmuka-perangkat-lunak)
   - 5.4 [Antarmuka Komunikasi](#54-antarmuka-komunikasi)
6. [Fitur Sistem](#6-fitur-sistem)
   - 6.1 [Modul Validasi URL](#61-modul-validasi-url)
   - 6.2 [Modul Ekstraksi Audio](#62-modul-ekstraksi-audio)
   - 6.3 [Modul Download](#63-modul-download)
   - 6.4 [Modul UI/UX](#64-modul-uiux)
7. [Kebutuhan Deployment](#7-kebutuhan-deployment)
8. [Kendala dan Pertimbangan](#8-kendala-dan-pertimbangan)

---

## 1. Pendahuluan

### 1.1 Tujuan

Dokumen ini menyajikan Spesifikasi Kebutuhan Perangkat Lunak (SRS) untuk aplikasi web **YouTube to MP3 Converter**. Aplikasi ini memungkinkan pengguna untuk mengonversi video YouTube menjadi file audio dalam format MP3 melalui antarmuka web yang ramah pengguna. Dokumen ini ditujukan untuk pengembang, desainer, manajer proyek, dan pemangku kepentingan lainnya.

### 1.2 Ruang Lingkup

Aplikasi ini mencakup:
- Konversi video YouTube ke format audio MP3
- Pilihan kualitas audio (128 kbps, 192 kbps, 256 kbps, 320 kbps)
- Validasi URL YouTube sebelum proses konversi
- Antarmuka pengguna yang responsif menggunakan Tailwind CSS
- Proses download file MP3 yang telah dikonversi

Aplikasi ini **tidak** mencakup:
- Download video dalam format lain selain audio MP3
- Penyimpanan permanen file pengguna di server
- Integrasi dengan platform selain YouTube

### 1.3 Definisi, Akronim, dan Singkatan

| **Istilah** | **Definisi** |
|-------------|--------------|
| SRS | Software Requirements Specification |
| MP3 | MPEG Audio Layer III, format kompresi audio lossy |
| API | Application Programming Interface |
| URL | Uniform Resource Locator |
| Kbps | Kilobit per detik, satuan ukuran bitrate audio |
| Tailwind CSS | Framework CSS utility-first |
| SSR | Server-Side Rendering |
| SSG | Static Site Generation |

### 1.4 Referensi

- Dokumentasi Next.js: https://nextjs.org/docs
- Dokumentasi React: https://react.dev
- Dokumentasi Tailwind CSS: https://tailwindcss.com/docs
- Spesifikasi IEEE 830-1998 untuk SRS

### 1.5 Ringkasan Dokumen

Dokumen ini mengorganisir kebutuhan perangkat lunak menjadi enam bagian utama: Pendahuluan, Deskripsi Umum, Kebutuhan Fungsional, Kebutuhan Non-Fungsional, Kebutuhan Antarmuka Eksternal, dan Fitur Sistem, diikuti dengan pertimbangan deployment.

---

## 2. Deskripsi Umum

### 2.1 Perspektif Produk

Aplikasi ini merupakan sistem web mandiri yang dibangun dengan arsitektur modern berbasis React. Aplikasi berjalan sebagai Single Page Application (SPA) dengan bantuan Next.js untuk optimasi performa dan kemudahan deployment. Aplikasi ini tidak memerlukan instalasi di sisi klien dan dapat diakses melalui browser web modern.

### 2.2 Fitur Produk

1. **Validasi URL YouTube** - Memverifikasi bahwa URL yang dimasukkan adalah URL YouTube yang valid sebelum memproses konversi.
2. **Pemilihan Kualitas Audio** - Menyediakan opsi bitrate audio (128, 192, 256, 320 kbps) sesuai preferensi pengguna.
3. **Ekstraksi Audio** - Memproses video YouTube dan mengekstrak stream audio dalam format MP3.
4. **Download File** - Menyediakan tautan download untuk file MP3 yang telah dikonversi.
5. **Antarmuka Responsif** - UI yang beradaptasi dengan berbagai ukuran layar menggunakan Tailwind CSS.
6. **Penanganan Error** - Menampilkan pesan error yang informatif kepada pengguna.

### 2.3 Karakteristik Pengguna

| **Kategori** | **Deskripsi** |
|-------------|---------------|
| Pengguna Umum | Individu yang ingin mengonversi video YouTube ke MP3 untuk didengarkan offline |
| Kemampuan Teknis | Dasar hingga menengah, mampu menggunakan browser web dan menyalin URL |
| Frekuensi Penggunaan | Sesekali hingga rutin tergantung kebutuhan |

### 2.4 Batasan Umum

- Aplikasi hanya mendukung URL dari domain youtube.com dan youtu.be
- Kualitas audio dibatasi pada pilihan bitrate yang tersedia
- Waktu konversi bergantung pada durasi video dan kualitas yang dipilih
- Aplikasi bergantung pada layanan eksternal untuk ekstraksi audio

### 2.5 Asumsi dan Ketergantungan

1. Pengguna memiliki koneksi internet yang stabil untuk mengakses YouTube dan mengunduh file MP3.
2. Layanan eksternal untuk ekstraksi audio tersedia dan dapat diakses.
3. Browser pengguna mendukung JavaScript ES6+ dan fitur modern seperti Fetch API dan Blob.
4. Server deployment memiliki resource yang memadai untuk menangani proses konversi.

### 2.6 Kebutuhan Awal

- Server Node.js dengan minimum 1 CPU core dan 512MB RAM
- Browser modern (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Koneksi internet minimum 1 Mbps untuk streaming dan download

---

## 3. Kebutuhan Fungsional

### 3.1 Validasi URL YouTube

**ID:** FR-01  
**Prioritas:** Tinggi  
**Deskripsi:** Sistem harus memvalidasi URL yang dimasukkan oleh pengguna untuk memastikan URL tersebut valid dan berasal dari domain YouTube.

**Kriteria Penerimaan:**
- Menerima URL dalam format `https://www.youtube.com/watch?v=...`, `https://youtu.be/...`, dan variasi lain yang valid
- Menolak URL yang tidak memiliki format YouTube yang valid
- Menampilkan pesan error yang jelas jika URL tidak valid
- Melakukan validasi real-time saat pengguna memasukkan atau menempelkan URL
- Mendukung URL dengan parameter tambahan (timestamp, playlist, dll.)

### 3.2 Pemilihan Kualitas Audio

**ID:** FR-02  
**Prioritas:** Tinggi  
**Deskripsi:** Sistem harus menyediakan pilihan kualitas audio kepada pengguna sebelum memulai konversi.

**Kriteria Penerimaan:**
- Menampilkan opsi kualitas: 128 kbps, 192 kbps, 256 kbps, 320 kbps
- Default kualitas adalah 192 kbps
- Pengguna dapat mengubah kualitas sebelum memulai konversi
- Menampilkan estimasi ukuran file berdasarkan durasi video dan kualitas yang dipilih

### 3.3 Ekstraksi Audio

**ID:** FR-03  
**Prioritas:** Tinggi  
**Deskripsi:** Sistem harus mengekstrak stream audio dari video YouTube dan mengonversinya menjadi format MP3 sesuai kualitas yang dipilih.

**Kriteria Penerimaan:**
- Mengambil metadata video (judul, durasi, thumbnail) sebelum ekstraksi
- Menampilkan informasi video yang sedang diproses
- Melakukan konversi audio ke format MP3 dengan bitrate sesuai pilihan pengguna
- Menampilkan progress bar selama proses konversi
- Memberikan estimasi waktu selesai konversi

### 3.4 Download File

**ID:** FR-04  
**Prioritas:** Tinggi  
**Deskripsi:** Sistem harus menyediakan tautan download untuk file MP3 yang telah selesai dikonversi.

**Kriteria Penerimaan:**
- Menampilkan tombol download setelah konversi selesai
- Nama file mengikuti judul video dengan ekstensi `.mp3`
- Memungkinkan download langsung melalui browser
- Membersihkan file sementara di server setelah download selesai atau setelah waktu timeout

### 3.5 Penanganan Error

**ID:** FR-05  
**Prioritas:** Tinggi  
**Deskripsi:** Sistem harus menangani berbagai skenario error dan menampilkan pesan yang informatif kepada pengguna.

**Kriteria Penerimaan:**
- Menangani URL video yang tidak tersedia atau telah dihapus
- Menangani video dengan batas usia atau pembatasan regional
- Menangani kegagalan server internal
- Menampilkan pesan error dalam Bahasa Indonesia yang mudah dipahami
- Menyediakan opsi untuk mencoba kembali setelah error

---

## 4. Kebutuhan Non-Fungsional

### 4.1 Performa

| **ID** | **Kebutuhan** |
|--------|---------------|
| NF-01 | Waktu respons halaman tidak lebih dari 2 detik pada koneksi 4G |
| NF-02 | Waktu konversi audio maksimal 2x durasi video |
| NF-03 | Ukuran bundle JavaScript tidak lebih dari 500KB (gzipped) |
| NF-04 | Waktu validasi URL maksimal 500ms |
| NF-05 | Page Speed Score minimal 90 untuk mobile dan desktop |

### 4.2 Keamanan

| **ID** | **Kebutuhan** |
|--------|---------------|
| NF-06 | Semua komunikasi harus menggunakan HTTPS |
| NF-07 | Input pengguna harus di-sanitize untuk mencegah injeksi |
| NF-08 | File yang di-upload tidak boleh dieksekusi di server |
| NF-09 | Rate limiting untuk mencegah abuse |
| NF-10 | Tidak menyimpan data pribadi pengguna secara permanen |

### 4.3 Keandalan

| **ID** | **Kebutuhan** |
|--------|---------------|
| NF-11 | Uptime layanan minimal 99% |
| NF-12 | Sistem harus recover secara otomatis dari kegagalan sementara |
| NF-13 | Konversi yang gagal tidak boleh menyebabkan crash aplikasi |
| NF-14 | Data sesi pengguna tidak hilang saat refresh halaman |

### 4.4 Ketersediaan

| **ID** | **Kebutuhan** |
|--------|---------------|
| NF-15 | Aplikasi dapat diakses 24/7 |
| NF-16 | Mendukung hingga 100 concurrent users |
| NF-17 | Fallback mechanism jika layanan eksternal tidak tersedia |

### 4.5 Kemudahan Penggunaan

| **ID** | **Kebutuhan** |
|--------|---------------|
| NF-18 | Pengguna dapat menyelesaikan konversi dalam maksimal 3 langkah |
| NF-19 | Semua teks dalam antarmuka menggunakan Bahasa Indonesia |
| NF-20 | Panduan penggunaan tersedia tanpa perlu bantuan eksternal |
| NF-21 | Waktu pembelajaran penggunaan maksimal 30 detik |

### 4.6 Kompatibilitas

| **ID** | **Kebutuhan** |
|--------|---------------|
| NF-22 | Mendukung Chrome, Firefox, Safari, Edge versi terbaru |
| NF-23 | Responsif pada viewport 320px hingga 2560px |
| NF-24 | Kompatibel dengan layanan deployment Vercel, Netlify, dan Railway |

---

## 5. Kebutuhan Antarmuka Eksternal

### 5.1 Antarmuka Pengguna

Aplikasi menggunakan antarmuka web yang dibangun dengan React dan Tailwind CSS. Antarmuka harus memenuhi kriteria berikut:

**Halaman Utama:**
- Header dengan nama aplikasi
- Input field untuk URL YouTube
- Dropdown atau radio button untuk pemilihan kualitas
- Tombol "Konversi" untuk memulai proses
- Area progress bar selama konversi
- Area hasil dengan tombol download

**Responsivitas:**
- Layout optimal untuk mobile (320px - 768px)
- Layout optimal untuk tablet (768px - 1024px)
- Layout optimal untuk desktop (1024px+)

**Komponen UI:**
- Menggunakan komponen Tailwind CSS untuk konsistensi
- Mendukung dark mode
- Animasi transisi halus untuk interaksi

### 5.2 Antarmeka Perangkat Keras

- Tidak ada persyaratan perangkat keras khusus di sisi klien
- Minimal 512MB RAM dan processor yang mendukung JavaScript modern
- Layar minimum 320px lebar untuk mobile

### 5.3 Antarmuka Perangkat Lunak

- **Browser:** Semua browser modern yang mendukung ES6+, Fetch API, dan Blob
- **OS:** Windows, macOS, Linux, iOS, Android
- **Server Runtime:** Node.js 18+
- **Framework:** Next.js 14+ dengan App Router

### 5.4 Antarmuka Komunikasi

- **Protokol:** HTTPS untuk semua komunikasi
- **API Endpoint:** REST API untuk validasi URL, ekstraksi audio, dan download
- **Format Data:** JSON untuk request dan response
- **Streaming:** Chunked transfer encoding untuk file besar

---

## 6. Fitur Sistem

### 6.1 Modul Validasi URL

**Fungsi:**
- Menerima input URL dari pengguna
- Memvalidasi format URL menggunakan regex
- Mengidentifikasi ID video dari berbagai format URL YouTube
- Menampilkan feedback visual (success/error state)

**Input:**
- String URL dari pengguna

**Output:**
- Boolean (valid/invalid)
- Pesan error jika tidak valid
- Video ID jika valid

### 6.2 Modul Ekstraksi Audio

**Fungsi:**
- Mengambil informasi video dari YouTube menggunakan layanan eksternal
- Mengekstrak stream audio dari video
- Mengkonversi audio ke format MP3 dengan bitrate sesuai pilihan
- Menyimpan file sementara di server

**Input:**
- Video ID
- Bitrate yang dipilih

**Output:**
- File MP3
- Metadata video (judul, durasi)

**Proses:**
1. Validasi URL dan ekstrak video ID
2. Fetch metadata video dari layanan eksternal
3. Download stream audio dari YouTube
4. Konversi ke MP3 menggunakan FFmpeg atau library sejenis
5. Simpan file sementara dengan nama berdasarkan judul video

### 6.3 Modul Download

**Fungsi:**
- Menyediakan tautan download yang aman
- Handle streaming file ke browser
- Membersihkan file sementara setelah download

**Input:**
- File MP3 yang telah dikonversi
- Nama file

**Output:**
- Response HTTP dengan header Content-Disposition
- Stream file MP3 ke browser

### 6.4 Modul UI/UX

**Fungsi:**
- Menampilkan antarmuka yang responsif
- Menampilkan state loading, success, dan error
- Menampilkan progress bar selama konversi
- Handle input dan interaksi pengguna

**Komponen:**
- Header component
- URL Input component dengan validasi real-time
- Quality Selector component
- Convert Button dengan loading state
- Progress Bar component
- Result/Download Card component
- Error Message component

---

## 7. Kebutuhan Deployment

### 7.1 Platform Deployment

Aplikasi dapat di-deploy pada platform berikut:
- **Vercel** (direkomendasikan untuk Next.js)
- **Netlify**
- **Railway**
- **Docker container** untuk self-hosted

### 7.2 Konfigurasi Environment

```
NEXT_PUBLIC_API_URL=<URL_API_BACKEND>
API_SECRET_KEY=<RAHASIA>
MAX_FILE_SIZE_MB=<UKURAN_MAKSIMAL>
DEFAULT_QUALITY=<KUALITAS_DEFAULT>
RATE_LIMIT_MAX=<MAKSIMAL_REQUEST>
```

### 7.3 Build dan Optimization

- Menggunakan `next build` untuk production build
- Mengaktifkan Image Optimization dari Next.js
- Menggunakan CDN untuk asset statis
- Mengaktifkan compression (gzip/brotli)

### 7.4 Monitoring

- Error tracking menggunakan Sentry atau sejenisnya
- Analytics untuk penggunaan fitur
- Performance monitoring untuk waktu konversi

---

## 8. Kendala dan Pertimbangan

### 8.1 Batasan Layanan Eksternal

Aplikasi ini bergantung pada layanan eksternal untuk ekstraksi audio dari YouTube. Perubahan kebijakan YouTube atau keterbatasan API dapat mempengaruhi fungsionalitas aplikasi. Solusi yang direkomendasikan:

- Menggunakan multiple fallback services
- Memantau perubahan kebijakan YouTube secara berkala
- Memiliki contingency plan jika layanan utama tidak tersedia

### 8.2 Aspek Legal

- Pengguna bertanggung jawab atas konten yang mereka konversi
- Aplikasi harus menampilkan disclaimer tentang penggunaan yang sesuai
- Perlu mematuhi DMCA dan regulasi hak cipta yang berlaku

### 8.3 Skalabilitas

- Arsitektur harus mendukung horizontal scaling
- File sementara harus disimpan di sistem penyimpanan terpisah (bukan di sistem file lokal)
- Queue system untuk menangani banyak request secara bersamaan

---

## Persetujuan

| **Nama** | **Peran** | **Tanggal** | **Tanda Tangan** |
|---------|----------|------------|-----------------|
| | Pengembang | | |
| | Manajer Proyek | | |
| | Pemangku Kepentingan | | |

---

*Dokumen ini merupakan dokumen hidup dan akan diperbarui seiring perkembangan proyek.*
