export type Language = "en" | "id";

export const translations = {
  en: {
    header: {
      home: "Home",
      faq: "FAQ",
      privacy: "Privacy Policy",
      convert: "Convert",
      convertNow: "Convert Now",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      switchToIndonesian: "Switch to Indonesian",
      switchToEnglish: "Switch to English",
    },
    home: {
      eyebrow: "Fast, free, and easy",
      titlePrefix: "Convert YouTube videos to ",
      titleHighlight: "MP3 instantly",
      description:
        "A faster, cleaner, and more reliable YouTube to MP3 downloader with a modern conversion flow, premium audio output, and no registration.",
      stats: [
        {
          value: "0",
          label: "Registration Required",
          description: "Use it directly without creating an account or logging in.",
          icon: "person_off",
        },
        {
          value: "320kbps",
          label: "Max Audio Quality",
          description: "Premium audio quality up to 320kbps.",
          icon: "graphic_eq",
        },
        {
          value: "24/7",
          label: "Converter Access",
          description: "Access the service anytime without time restrictions.",
          icon: "schedule",
        },
      ],
      features: [
        {
          icon: "bolt",
          title: "Fast Conversion",
          description:
            "Convert YouTube videos into clean MP3 audio in seconds with a streamlined conversion pipeline.",
          metric: "Seconds",
        },
        {
          icon: "graphic_eq",
          title: "High Quality Audio",
          description:
            "Preserve crisp sound quality with downloads up to 320kbps for music, podcasts, and lectures.",
          metric: "320kbps",
        },
        {
          icon: "shield",
          title: "Secure Workflow",
          description:
            "No account, no clutter, and no unnecessary data collection during the conversion process.",
          metric: "Private",
        },
        {
          icon: "devices",
          title: "Mobile Friendly",
          description:
            "A responsive interface designed for desktop, tablet, iOS, and Android users.",
          metric: "All Devices",
        },
      ],
      howItWorks: "How it works",
      stepsTitle: "Three simple steps to your MP3",
      stepsDescription:
        "Paste, process, download. The whole workflow is built to feel fast, focused, and modern.",
      steps: [
        { icon: "link", title: "Paste Link", description: "Copy any YouTube video URL and paste it into the converter." },
        {
          icon: "auto_awesome",
          title: "Processing",
          description: "Our converter extracts and prepares the audio version of your video.",
        },
        {
          icon: "download",
          title: "Download MP3",
          description: "Save the converted audio file directly to your device.",
        },
      ],
      faqTitle: "Frequently Asked Questions",
    },
    converterForm: {
      placeholder: "Paste YouTube link here...",
      submit: "Convert",
      converting: "Converting",
      invalidUrl: "Enter a valid YouTube URL.",
      conversionFailed: "Conversion failed.",
      terms: "By using our service you accept our Terms of Service.",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "Is this service free to use?",
          answer:
            "Yes, our YouTube to MP3 converter is 100% free to use. There are no hidden fees, subscriptions, or limits on the number of conversions you can perform.",
        },
        {
          question: "How it works?",
          answer:
            "Simply copy the YouTube video URL, paste it into the search box at the top of the page, and click the Convert button. Once the conversion is complete, a download link will appear.",
        },
        {
          question: "Are there any limitations on video length?",
          answer:
            "To ensure fast conversion times for all users, we currently limit conversions to videos that are up to 2 hours in length.",
        },
      ],
    },
    footer: {
      privacy: "Privacy Policy",
      terms: "Terms",
      contact: "Contact",
      copyright: "© 2026 Created By Trisno Sanjaya",
    },
    download: {
      pageTitle: "Conversion Complete",
      description: "Your MP3 file is ready. Click below to save it to your device.",
      duration: "Duration",
      quality: "Quality",
      size: "Size",
      download: "Download MP3",
      convertAnother: "Convert Another",
      loading: "Loading conversion result",
    },
    privacy: {
      title: "Privacy Policy",
      updated: "Last Updated: October 26, 2024",
      sections: [
        {
          title: "1. Information Collection",
          paragraphs: [
            "At YT-MP3, we prioritize your privacy and aim to collect only the absolute minimum amount of information required to provide our video conversion services. When you use our platform, we may collect non-personally identifiable information such as browser type, device type, and standard server log information.",
            "We do not require account creation, and therefore we do not collect personal identifiers such as your name, email address, or phone number during normal operation.",
          ],
        },
        {
          title: "2. Usage of Service",
          paragraphs: [
            "The URLs you submit for conversion are processed entirely on our servers. We do not store a permanent record of the specific videos you convert linked to your IP address. The conversion process is designed to be transient.",
          ],
          bullets: [
            "Converted files are temporarily cached on our servers for a short duration to allow you to download them.",
            "These cached files are automatically and permanently deleted from our servers shortly after the conversion is complete or a set time limit expires.",
            "We do not share your conversion history with any third parties.",
          ],
        },
        {
          title: "3. Data Security",
          paragraphs: [
            "We implement industry-standard security measures to protect the integrity of our platform and any transient data passing through it. This includes the use of secure HTTPS protocols to encrypt data transmitted between your browser and our servers.",
            "While no service can guarantee absolute security, our infrastructure is designed to limit exposure and ensure that the conversion process remains sandboxed and secure.",
          ],
        },
        {
          title: "4. Cookies and Tracking",
          paragraphs: [
            "We use essential cookies strictly necessary for the technical operation of the website, such as managing your current session and load balancing.",
            "We may use basic analytics tools to understand aggregated traffic patterns, but these tools are configured to anonymize IP addresses and do not track individual user journeys across other websites.",
          ],
        },
      ],
    },
    notFound: {
      title: "404",
      description: "Oops! The page you're looking for doesn't exist.",
      back: "Go back Home",
    },
  },
  id: {
    header: {
      home: "Beranda",
      faq: "FAQ",
      privacy: "Kebijakan Privasi",
      convert: "Konversi",
      convertNow: "Konversi Sekarang",
      openMenu: "Buka menu",
      closeMenu: "Tutup menu",
      switchToIndonesian: "Ubah ke Bahasa Indonesia",
      switchToEnglish: "Beralih ke Bahasa Inggris",
    },
    home: {
      eyebrow: "Cepat, gratis, dan mudah",
      titlePrefix: "Ubah video YouTube menjadi ",
      titleHighlight: "MP3 secara instan",
      description:
        "Downloader YouTube ke MP3 yang lebih cepat, bersih, dan andal dengan alur konversi modern, kualitas audio premium, dan tanpa pendaftaran.",
stats: [
         {
           value: "0",
           label: "Tidak Diperlukan Daftar",
           description: "Gunakan langsung tanpa akun atau login.",
           icon: "person_off",
         },
         {
           value: "320kbps",
           label: "Kualitas Audio Maks",
           description: "Kualitas audio premium hingga 320kbps.",
           icon: "graphic_eq",
         },
         {
           value: "24/7",
           label: "Akses Konverter",
           description: "Akses layanan kapan saja tanpa batas waktu.",
           icon: "schedule",
         },
       ],
      features: [
        {
          icon: "bolt",
          title: "Konversi Cepat",
          description:
            "Ubah video YouTube menjadi audio MP3 bersih dalam hitungan detik dengan alur konversi yang efisien.",
          metric: "Detik",
        },
        {
          icon: "graphic_eq",
          title: "Kualitas Audio Tinggi",
          description:
            "Pertahankan suara jernih dengan unduhan hingga 320kbps untuk musik, podcast, dan materi pembelajaran.",
          metric: "320kbps",
        },
        {
          icon: "shield",
          title: "Alur Aman",
          description:
            "Tanpa akun, tanpa kerumitan, dan tanpa pengumpulan data yang tidak diperlukan saat proses konversi.",
          metric: "Pribadi",
        },
        {
          icon: "devices",
          title: "Ramah Mobile",
          description: "Tampilan responsif yang dirancang untuk desktop, tablet, iOS, dan Android.",
          metric: "Semua Perangkat",
        },
      ],
      howItWorks: "Cara kerja",
      stepsTitle: "Tiga langkah mudah untuk MP3 Anda",
      stepsDescription:
        "Tempel, proses, unduh. Seluruh alur dibuat agar terasa cepat, fokus, dan modern.",
      steps: [
        { icon: "link", title: "Tempel Tautan", description: "Salin URL video YouTube lalu tempelkan ke konverter." },
        {
          icon: "auto_awesome",
          title: "Memproses",
          description: "Konverter mengekstrak dan menyiapkan versi audio dari video Anda.",
        },
        {
          icon: "download",
          title: "Unduh MP3",
          description: "Simpan file audio yang sudah dikonversi langsung ke perangkat Anda.",
        },
      ],
      faqTitle: "Pertanyaan yang Sering Diajukan",
    },
    converterForm: {
      placeholder: "Tempel tautan YouTube di sini...",
      submit: "Konversi",
      converting: "Mengonversi",
      invalidUrl: "Masukkan URL YouTube yang valid.",
      conversionFailed: "Konversi gagal.",
      terms: "Dengan menggunakan layanan kami, Anda menyetujui Ketentuan Layanan kami.",
    },
    faq: {
      title: "Pertanyaan yang Sering Diajukan",
      items: [
        {
          question: "Apakah layanan ini gratis?",
          answer:
            "Ya, konverter YouTube ke MP3 kami 100% gratis digunakan. Tidak ada biaya tersembunyi, langganan, atau batasan jumlah konversi yang dapat Anda lakukan.",
        },
        {
          question: "Bagaimana cara kerjanya?",
          answer:
            "Salin URL video YouTube, tempelkan ke kotak pencarian di bagian atas halaman, lalu klik tombol Konversi. Setelah konversi selesai, tautan unduhan akan muncul.",
        },
        {
          question: "Apakah ada batasan durasi video?",
          answer:
            "Untuk memastikan waktu konversi tetap cepat bagi semua pengguna, kami saat ini membatasi konversi pada video dengan durasi hingga 2 jam.",
        },
      ],
    },
    footer: {
      privacy: "Kebijakan Privasi",
      terms: "Ketentuan",
      contact: "Kontak",
      copyright: "© 2026 Dibuat Oleh Trisno Sanjaya",
    },
    download: {
      pageTitle: "Konversi Selesai",
      description: "File MP3 Anda sudah siap. Klik di bawah untuk menyimpannya ke perangkat.",
      duration: "Durasi",
      quality: "Kualitas",
      size: "Ukuran",
      download: "Unduh MP3",
      convertAnother: "Konversi Lainnya",
      loading: "Memuat hasil konversi",
    },
    privacy: {
      title: "Kebijakan Privasi",
      updated: "Terakhir Diperbarui: 26 Oktober 2024",
      sections: [
        {
          title: "1. Pengumpulan Informasi",
          paragraphs: [
            "Di YT-MP3, kami mengutamakan privasi Anda dan hanya mengumpulkan informasi minimum yang diperlukan untuk menyediakan layanan konversi video. Saat menggunakan platform kami, kami dapat mengumpulkan informasi non-pribadi seperti jenis browser, jenis perangkat, dan log server standar.",
            "Kami tidak memerlukan pembuatan akun, sehingga kami tidak mengumpulkan identitas pribadi seperti nama, alamat email, atau nomor telepon selama penggunaan normal.",
          ],
        },
        {
          title: "2. Penggunaan Layanan",
          paragraphs: [
            "URL yang Anda kirimkan untuk dikonversi diproses sepenuhnya di server kami. Kami tidak menyimpan catatan permanen video spesifik yang Anda konversi yang terhubung dengan alamat IP Anda. Proses konversi dirancang bersifat sementara.",
          ],
          bullets: [
            "File yang dikonversi disimpan sementara di server kami dalam waktu singkat agar Anda dapat mengunduhnya.",
            "File cache tersebut dihapus secara otomatis dan permanen dari server kami setelah konversi selesai atau setelah batas waktu tertentu.",
            "Kami tidak membagikan riwayat konversi Anda kepada pihak ketiga mana pun.",
          ],
        },
        {
          title: "3. Keamanan Data",
          paragraphs: [
            "Kami menerapkan langkah keamanan standar industri untuk melindungi integritas platform dan data sementara yang melewatinya. Ini termasuk penggunaan protokol HTTPS aman untuk mengenkripsi data yang dikirim antara browser Anda dan server kami.",
            "Meskipun tidak ada layanan yang dapat menjamin keamanan mutlak, infrastruktur kami dirancang untuk membatasi paparan data dan memastikan proses konversi tetap terisolasi serta aman.",
          ],
        },
        {
          title: "4. Cookie dan Pelacakan",
          paragraphs: [
            "Kami menggunakan cookie penting yang benar-benar diperlukan untuk operasional teknis situs, seperti mengelola sesi Anda saat ini dan penyeimbangan beban.",
            "Kami dapat menggunakan alat analitik dasar untuk memahami pola lalu lintas secara agregat, tetapi alat tersebut dikonfigurasi untuk menganonimkan alamat IP dan tidak melacak perjalanan pengguna secara individual di situs lain.",
          ],
        },
      ],
    },
    notFound: {
      title: "404",
      description: "Ups! Halaman yang Anda cari tidak ditemukan.",
      back: "Kembali ke Beranda",
    },
  },
};
