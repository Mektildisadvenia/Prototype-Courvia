import type {
  ActivityHistoryItem,
  CertificateRecord,
  Course,
  CourseEvaluationRecord,
  UserAccount,
  Webinar,
} from '../types/courvia';

export const SEEDED_STUDENT_USER: UserAccount = {
  id: 'mektildis-mhs-05',
  fullName: 'Mektildis Advenia Sanusi',
  email: 'mektildis.sanusi@mahasiswa.ac.id',
  roleLabel: 'Mahasiswa Semester 5',
  institution: 'Universitas Merdeka',
};

export const WEBINARS: Webinar[] = [
  {
    id: 1,
    title: 'Menyusun Portofolio Magang & Kerja untuk Mahasiswa',
    category: 'CAREER',
    instructor: 'Nadia Pramesti',
    instructorRole: 'Lead Talent Partner · Instruktur Courvia',
    description:
      'Pelajari cara merangkum proyek kuliah, organisasi, dan sertifikat kegiatan menjadi portofolio yang siap dilirik rekruter',
    date: '28 Nov 2026',
    time: '19:00 WIB',
    duration: '90 Menit',
    priceLabel: 'Gratis',
    isFree: true,
    points: 20,
    participants: 142,
    status: 'UPCOMING',
    accent: 'powder',
    agenda: [
      'Menentukan proyek dan bukti kegiatan yang paling relevan dengan posisi magang',
      'Menyusun studi kasus singkat agar pencapaian mudah dibaca dalam 60 detik',
      'Sesi tanya jawab langsung dan review struktur CV mahasiswa',
    ],
    outcomes: [
      'Kerangka portofolio siap pakai untuk lamaran magang dan kerja',
      'Sertifikat kehadiran tersimpan otomatis di akun Courvia',
      'Penambahan +20 Poin Kegiatan di Riwayat Kegiatan',
    ],
  },
  {
    id: 2,
    title: 'Build Your First Modern Website with Clean Structure',
    category: 'PROGRAMMING',
    instructor: 'Dimas Saputra',
    instructorRole: 'Senior Frontend Engineer · Instruktur Courvia',
    description:
      'Sesi praktik langsung membangun struktur halaman web responsif dengan HTML semantik dan komponen modern yang rapi',
    date: '02 Des 2026',
    time: '19:30 WIB',
    duration: '120 Menit',
    priceLabel: 'Rp 25.000',
    isFree: false,
    points: 25,
    participants: 98,
    status: 'UPCOMING',
    accent: 'truffle',
    agenda: [
      'Arsitektur komponen halaman web yang mudah dirawat',
      'Menata tipografi, jarak, dan responsivitas di layar mobile',
      'Simulasi deploy proyek agar bisa langsung dicantumkan di portofolio',
    ],
    outcomes: [
      'Pemahaman struktur frontend modern dari nol',
      'Sertifikat kehadiran tersimpan otomatis di akun Courvia',
      'Penambahan +25 Poin Kegiatan di Riwayat Kegiatan',
    ],
  },
  {
    id: 3,
    title: 'UI/UX Design: Dari Riset Pengguna ke Antarmuka Mobile',
    category: 'DESIGN',
    instructor: 'Rara Kusuma',
    instructorRole: 'Principal Product Designer · Instruktur Courvia',
    description:
      'Bongkar langkah merancang aplikasi mobile yang nyaman dipakai sehari-hari, mulai dari wawancara pengguna hingga wireframe',
    date: '05 Des 2026',
    time: '10:00 WIB',
    duration: '90 Menit',
    priceLabel: 'Rp 30.000',
    isFree: false,
    points: 25,
    participants: 115,
    status: 'UPCOMING',
    accent: 'coral',
    agenda: [
      'Mengubah temuan wawancara mahasiswa menjadi peluang solusi produk',
      'Menyusun alur navigasi mobile yang ringkas dan nyaman untuk ibu jari',
      'Menjaga konsistensi tipografi dan kontras warna di layar kecil',
    ],
    outcomes: [
      'Pola pikir desain berbasis kebutuhan nyata pengguna',
      'Sertifikat kehadiran tersimpan otomatis di akun Courvia',
      'Penambahan +25 Poin Kegiatan di Riwayat Kegiatan',
    ],
  },
  {
    id: 4,
    title: 'Strategi Komunikasi Akademik & Presentasi Riset Skripsi',
    category: 'CAREER',
    instructor: 'Dr Bagus Prakoso',
    instructorRole: 'Academic Mentor · Instruktur Courvia',
    description:
      'Teknik menyusun alur presentasi riset dan menjawab pertanyaan penguji secara terstruktur sebelum memasuki tahap skripsi',
    date: '10 Nov 2026',
    time: '19:00 WIB',
    duration: '90 Menit',
    priceLabel: 'Gratis',
    isFree: true,
    points: 20,
    participants: 210,
    status: 'COMPLETED',
    accent: 'powder',
    agenda: [
      'Merumuskan latar belakang dan masalah riset dalam 3 menit pertama',
      'Menyajikan data wawancara dan temuan penelitian secara meyakinkan',
      'Latihan menghadapi pertanyaan kritis saat seminar proposal',
    ],
    outcomes: [
      'Struktur slide presentasi proposal dan skripsi',
      'Sertifikat kehadiran tersimpan otomatis di akun Courvia',
      'Penambahan +20 Poin Kegiatan di Riwayat Kegiatan',
    ],
  },
];

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Web Development Fundamentals',
    category: 'PROGRAMMING',
    instructor: 'Dimas Saputra',
    instructorRole: 'Senior Frontend Engineer · Instruktur Courvia',
    level: 'Beginner',
    scheduleLabel: 'Fleksibel · Akses Mandiri',
    duration: '90 Menit',
    priceLabel: 'Rp 49.000',
    isFree: false,
    points: 35,
    description:
      'Materi terstruktur membahas fondasi HTML semantik, layout CSS modern, hingga logika JavaScript beserta evaluasi akhir',
    lessons: [
      {
        id: '1-1',
        title: 'Struktur Semantik & Fondasi Web',
        type: 'VIDEO',
        duration: '20 min',
        summary:
          'Memahami bagaimana browser membaca struktur dokumen HTML semantik agar halaman mudah diakses dan dirawat',
        keyPoints: [
          'Peran elemen header, main, section, article, dan footer dalam struktur dokumen',
          'Hierarki heading yang konsisten untuk keterbacaan pengguna',
          'Menghubungkan aset gaya dan skrip secara rapi',
        ],
      },
      {
        id: '1-2',
        title: 'Tata Letak Responsif & Tipografi',
        type: 'MATERI',
        duration: '25 min',
        summary:
          'Mengatur grid, jarak antar elemen, dan skala huruf agar tampilan tetap konsisten di layar ponsel',
        keyPoints: [
          'Prinsip flexbox untuk tata letak yang adaptif di perangkat mobile',
          'Menjaga kontras teks dan ukuran target sentuh minimal 44px',
          'Konsistensi radius, border tipis, dan spasi antar bagian',
        ],
      },
      {
        id: '1-3',
        title: 'Interaktivitas & State Management Dasar',
        type: 'VIDEO',
        duration: '25 min',
        summary:
          'Mengelola interaksi pengguna, validasi input formulir, serta pembaruan tampilan secara real-time di aplikasi',
        keyPoints: [
          'Memisahkan data state dan komponen tampilan agar kode mudah dikembangkan',
          'Menangani aksi klik, filter katalog, dan penyimpanan progres belajar',
          'Memberi umpan balik visual langsung setelah pengguna menyelesaikan aksi',
        ],
      },
      {
        id: '1-4',
        title: 'Persiapan Evaluasi Kompetensi',
        type: 'MATERI',
        duration: '20 min',
        summary:
          'Rangkuman konsep inti pengembangan web sebelum mengikuti evaluasi akhir untuk meraih sertifikat kelulusan Courvia',
        keyPoints: [
          'Batas kelulusan evaluasi akhir adalah 70 dari 100',
          'Sertifikat kelulusan langsung tersimpan otomatis di akun setelah lulus',
          'Poin kegiatan langsung tercatat pada halaman Riwayat Kegiatan',
        ],
      },
    ],
    questions: [
      {
        id: 'c1-q1',
        question: 'Mengapa penggunaan tag HTML semantik seperti <main> dan <article> sangat dianjurkan?',
        options: [
          'Agar ukuran file CSS menjadi dua kali lebih besar',
          'Memperjelas struktur dokumen bagi browser, aksesibilitas, dan pemeliharaan kode',
          'Supaya warna latar halaman berubah otomatis tanpa CSS',
          'Karena browser tidak bisa merender elemen <div>',
        ],
        answerIndex: 1,
      },
      {
        id: 'c1-q2',
        question: 'Berapa ukuran minimal area sentuh (touch target) tombol yang direkomendasikan di aplikasi mobile?',
        options: ['16 x 16 px', '24 x 24 px', '44 x 44 px', '120 x 120 px'],
        answerIndex: 2,
      },
      {
        id: 'c1-q3',
        question: 'Apa manfaat memisahkan state data dari komponen tampilan antarmuka?',
        options: [
          'Agar tampilan tidak dapat berinteraksi dengan pengguna',
          'Memudahkan pelacakan perubahan data dan pemeliharaan alur aplikasi',
          'Menghilangkan kebutuhan pengujian aplikasi',
          'Membuat aplikasi hanya berjalan di satu ukuran layar',
        ],
        answerIndex: 1,
      },
      {
        id: 'c1-q4',
        question: 'Apa syarat utama untuk mendapatkan sertifikat kelulusan course di Courvia?',
        options: [
          'Hanya membuka halaman katalog course',
          'Menghubungi instruktur secara manual lewat email',
          'Lulus evaluasi akhir dengan nilai mencapai batas minimal kelulusan',
          'Mengunduh file PDF kosong dari galeri',
        ],
        answerIndex: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'UI/UX Design Essentials',
    category: 'DESIGN',
    instructor: 'Rara Kusuma',
    instructorRole: 'Principal Product Designer · Instruktur Courvia',
    level: 'Beginner',
    scheduleLabel: 'Fleksibel · Akses Mandiri',
    duration: '85 Menit',
    priceLabel: 'Rp 49.000',
    isFree: false,
    points: 35,
    description:
      'Pelajari proses perancangan produk digital mulai dari riset pengguna, penyusunan persona, wireframe, hingga sistem desain',
    lessons: [
      {
        id: '2-1',
        title: 'Memahami Masalah Pengguna Lewat Riset',
        type: 'VIDEO',
        duration: '20 min',
        summary:
          'Cara menggali kebiasaan dan keluhan nyata mahasiswa melalui wawancara terstruktur sebelum menentukan fitur',
        keyPoints: [
          'Membedakan asumsi tim dengan keluhan yang benar-benar dialami responden',
          'Menyusun pertanyaan terbuka seputar alur kerja pengguna saat ini',
          'Merangkum temuan wawancara ke dalam tabel pola masalah',
        ],
      },
      {
        id: '2-2',
        title: 'Menyusun Persona & Customer Journey',
        type: 'MATERI',
        duration: '20 min',
        summary:
          'Memetakan langkah, pikiran, emosi, dan titik hambatan pengguna untuk menemukan peluang solusi paling berdampak',
        keyPoints: [
          'Menetapkan persona utama berbasis data wawancara nyata',
          'Mengidentifikasi titik emosi terendah di dalam customer journey',
          'Menghubungkan keluhan langsung ke prioritas MVP',
        ],
      },
      {
        id: '2-3',
        title: 'Wireframe & Ergonomi Mobile',
        type: 'VIDEO',
        duration: '25 min',
        summary:
          'Merancang sketsa tata letak layar mobile yang nyaman dioperasikan satu tangan dengan navigasi tab bawah',
        keyPoints: [
          'Menempatkan aksi utama dan navigasi di area jangkauan ibu jari',
          'Menghindari informasi yang tersembunyi atau menumpuk di satu layar',
          'Memastikan keterbacaan teks pada layar 375px sampai 430px',
        ],
      },
      {
        id: '2-4',
        title: 'Konsistensi Design System',
        type: 'MATERI',
        duration: '20 min',
        summary:
          'Menjaga keselarasan palet warna, tipografi, dan komponen antar halaman agar aplikasi terasa utuh',
        keyPoints: [
          'Menggunakan palet warna 60-30-10 secara disiplin',
          'Menyelaraskan gaya tampilan mobile dan web tanpa mengubah identitas merek',
          'Siap menghadapi evaluasi akhir untuk mengklaim sertifikat kompetensi',
        ],
      },
    ],
    questions: [
      {
        id: 'c2-q1',
        question: 'Apa tujuan utama melakukan wawancara pengguna di tahap awal perancangan produk?',
        options: [
          'Memilih warna tombol yang paling mencolok',
          'Memastikan masalah yang ingin diselesaikan benar-benar dialami pengguna',
          'Menambah jumlah halaman di aplikasi sebanyak mungkin',
          'Menghindari pembuatan dokumentasi produk',
        ],
        answerIndex: 1,
      },
      {
        id: 'c2-q2',
        question: 'Bagian mana pada layar ponsel yang paling ideal untuk meletakkan navigasi utama?',
        options: [
          'Sudut kiri paling atas',
          'Bagian bawah layar yang mudah dijangkau ibu jari',
          'Di dalam menu tersembunyi yang memerlukan tiga kali geser',
          'Di bagian footer setelah seluruh konten selesai digulir',
        ],
        answerIndex: 1,
      },
      {
        id: 'c2-q3',
        question: 'Apa fungsi Customer Journey Map dalam pengembangan MVP?',
        options: [
          'Menggantikan seluruh kode frontend',
          'Menemukan titik hambatan emosi terendah yang menjadi prioritas solusi',
          'Menghitung biaya server bulanan',
          'Membuat sertifikat tanpa evaluasi',
        ],
        answerIndex: 1,
      },
      {
        id: 'c2-q4',
        question: 'Mengapa sebuah MVP harus fokus pada fitur terpenting terlebih dahulu?',
        options: [
          'Agar tim bisa menguji apakah masalah utama pengguna benar-benar terselesaikan',
          'Supaya aplikasi tidak memiliki pengguna',
          'Karena fitur tambahan dilarang selamanya',
          'Agar pengguna mencatat progres secara manual',
        ],
        answerIndex: 0,
      },
    ],
  },
  {
    id: 3,
    title: 'Digital Business & Product Strategy',
    category: 'BUSINESS',
    instructor: 'Reza Mahendra',
    instructorRole: 'Product Lead · Instruktur Courvia',
    level: 'Intermediate',
    scheduleLabel: 'Fleksibel · Akses Mandiri',
    duration: '80 Menit',
    priceLabel: 'Rp 59.000',
    isFree: false,
    points: 40,
    description:
      'Kuasai cara merumuskan value proposition, model pendapatan produk digital, dan metrik keberhasilan MVP',
    lessons: [
      {
        id: '3-1',
        title: 'Memetakan Celah Pasar & Kompetitor',
        type: 'VIDEO',
        duration: '20 min',
        summary:
          'Menilai cara tradisional dan kompetitor langsung yang dipakai pengguna untuk menemukan celah nilai yang belum terisi',
        keyPoints: [
          'Menganalisis kelebihan dan kelemahan alternatif yang sudah dipakai pengguna',
          'Merumuskan value proposition yang spesifik bagi persona target',
          'Menghindari fitur yang tidak menjawab keluhan inti',
        ],
      },
      {
        id: '3-2',
        title: 'Revenue-Owning Product Model',
        type: 'MATERI',
        duration: '20 min',
        summary:
          'Memahami bagaimana produk digital menghasilkan pemasukan langsung melalui layanan utama di dalam aplikasi',
        keyPoints: [
          'Skema biaya kegiatan webinar dan course',
          'Biaya evaluasi kompetensi dan sertifikasi terstandar',
          'Menjaga keseimbangan nilai bagi pengguna dan keberlanjutan bisnis',
        ],
      },
      {
        id: '3-3',
        title: 'Prioritas MVP & Traceability Matrix',
        type: 'MATERI',
        duration: '20 min',
        summary:
          'Menyusun prioritas fitur berdasarkan nilai dampak dan usaha pengerjaan serta menelusurinya ke hasil riset',
        keyPoints: [
          'Membedakan fitur kerjakan dulu, taruhan besar, pengisi, dan tunda',
          'Menjaga ruang lingkup MVP tetap ramping dan terukur',
          'Menghubungkan setiap user story ke bukti wawancara',
        ],
      },
      {
        id: '3-4',
        title: 'Success Metrics 3 Bulan Pertama',
        type: 'VIDEO',
        duration: '20 min',
        summary:
          'Menetapkan indikator keberhasilan produk mulai dari aktivasi pengguna hingga pemanfaatan halaman riwayat',
        keyPoints: [
          'Mengukur rasio penyelesaian kegiatan dibanding total pendaftar',
          'Memastikan sertifikat tersimpan otomatis tanpa unduh manual',
          'Mengukur kebiasaan pengguna mengecek riwayat kegiatan di aplikasi',
        ],
      },
    ],
    questions: [
      {
        id: 'c3-q1',
        question: 'Apa ciri utama dari sebuah Revenue-Owning Product?',
        options: [
          'Produk tidak memiliki layanan untuk pengguna',
          'Pemasukan datang langsung dari layanan di dalam aplikasi itu sendiri',
          'Seluruh fitur hanya berupa brosur statis',
          'Pendapatan hanya berasal dari catatan manual',
        ],
        answerIndex: 1,
      },
      {
        id: 'c3-q2',
        question: 'Apa fungsi Traceability Matrix dalam dokumen PRD?',
        options: [
          'Menghapus seluruh user story',
          'Memastikan setiap user story di MVP dapat ditelusuri mundur ke hasil wawancara',
          'Menentukan font yang dipakai pada footer',
          'Mengganti jadwal webinar',
        ],
        answerIndex: 1,
      },
      {
        id: 'c3-q3',
        question: 'Mengapa fitur bernilai tinggi dan ber-usaha kecil diprioritaskan pada kuadran "Kerjakan Dulu"?',
        options: [
          'Memberikan dampak paling besar bagi masalah utama pengguna dalam waktu singkat',
          'Karena paling sulit dikerjakan oleh tim',
          'Agar pengguna bingung saat membuka aplikasi',
          'Supaya sertifikat tidak perlu disimpan',
        ],
        answerIndex: 0,
      },
      {
        id: 'c3-q4',
        question: 'Metrik apa yang menunjukkan pengguna benar-benar memakai aplikasi untuk mengecek jumlah kegiatannya?',
        options: [
          'Jumlah file yang disimpan di Google Drive',
          'Persentase pengguna aktif yang membuka halaman riwayat kegiatan',
          'Jumlah warna pada logo',
          'Banyaknya catatan kertas pribadi',
        ],
        answerIndex: 1,
      },
    ],
  },
  {
    id: 4,
    title: 'Data Analysis untuk Riset & Karier',
    category: 'DATA',
    instructor: 'Sinta Wijaya',
    instructorRole: 'Data Analyst · Instruktur Courvia',
    level: 'Beginner',
    scheduleLabel: 'Fleksibel · Akses Mandiri',
    duration: '75 Menit',
    priceLabel: 'Gratis',
    isFree: true,
    points: 30,
    description:
      'Pelajari cara mengumpulkan, membersihkan, dan menyajikan data riset mahasiswa agar menghasilkan kesimpulan yang akurat',
    lessons: [
      {
        id: '4-1',
        title: 'Dasar Pengumpulan Data Riset',
        type: 'VIDEO',
        duration: '18 min',
        summary:
          'Mengenal perbedaan data kualitatif wawancara dan data kuantitatif survei dalam riset akademik maupun produk',
        keyPoints: [
          'Menentukan variabel dan sumber data yang tepercaya',
          'Mencatat temuan secara konsisten agar mudah dianalisis ulang',
          'Menghindari bias saat merangkum hasil responden',
        ],
      },
      {
        id: '4-2',
        title: 'Data Cleaning & Validasi Konsistensi',
        type: 'MATERI',
        duration: '20 min',
        summary:
          'Membersihkan duplikasi entri dan menyamakan format tanggal maupun skor sebelum data dihitung',
        keyPoints: [
          'Mengatasi data ganda dan format tanggal yang tidak seragam',
          'Memastikan jumlah total poin cocok dengan bukti kegiatan',
          'Standarisasi kategori agar mudah difilter',
        ],
      },
      {
        id: '4-3',
        title: 'Menghitung Ringkasan & Pola Utama',
        type: 'VIDEO',
        duration: '19 min',
        summary:
          'Mengubah kumpulan catatan mentah menjadi ringkasan rata-rata, rasio kelulusan, dan total capaian yang jelas',
        keyPoints: [
          'Membaca rasio penyelesaian kegiatan secara objektif',
          'Menyajikan angka dengan format tabular agar mudah dibandingkan',
          'Menarik kesimpulan berbasis bukti data',
        ],
      },
      {
        id: '4-4',
        title: 'Visualisasi Insight yang Mudah Dibaca',
        type: 'MATERI',
        duration: '18 min',
        summary:
          'Menyampaikan temuan analisis data dalam bentuk kartu ringkasan dan tabel yang ringkas bagi pembaca',
        keyPoints: [
          'Memilih metrik yang benar-benar menjawab pertanyaan riset',
          'Menghindari angka hiasan yang tidak punya konteks',
          'Menyiapkan diri menghadapi evaluasi akhir course',
        ],
      },
    ],
    questions: [
      {
        id: 'c4-q1',
        question: 'Apa tujuan tahap Data Cleaning sebelum melakukan perhitungan ringkasan data?',
        options: [
          'Menghapus seluruh data responden yang valid',
          'Membersihkan duplikasi, kesalahan penulisan, dan ketidakkonsistenan format',
          'Menambah kolom kosong sebanyak mungkin',
          'Mengubah data angka menjadi gambar buram',
        ],
        answerIndex: 1,
      },
      {
        id: 'c4-q2',
        question: 'Mengapa pencatatan data otomatis dalam satu sistem lebih andal dibanding catatan manual terpisah?',
        options: [
          'Mengurangi risiko salah hitung, data ganda, dan bukti kegiatan yang hilang',
          'Membuat mahasiswa harus membuka banyak folder',
          'Menghilangkan informasi tanggal kegiatan',
          'Menyulitkan pengecekan total poin',
        ],
        answerIndex: 0,
      },
      {
        id: 'c4-q3',
        question: 'Apa contoh data kualitatif yang diperoleh dari riset pengguna?',
        options: [
          'Kutipan keluhan responden saat diwawancara',
          'Ukuran layar ponsel dalam piksel',
          'Nomor port server',
          'Durasi animasi dalam milidetik',
        ],
        answerIndex: 0,
      },
      {
        id: 'c4-q4',
        question: 'Prinsip utama dalam menyajikan metrik pada halaman ringkasan adalah:',
        options: [
          'Menampilkan angka tanpa satuan atau penjelasan konteks',
          'Menyajikan angka penting secara jelas, konsisten, dan relevan dengan tujuan pengguna',
          'Menyembunyikan riwayat kegiatan yang sudah selesai',
          'Menggunakan teks berulang yang tidak bisa diklik',
        ],
        answerIndex: 1,
      },
    ],
  },
];

export const INITIAL_STUDENT_EVALUATIONS: Record<number, CourseEvaluationRecord> = {
  1: {
    courseId: 1,
    score: 85,
    correctCount: 3,
    totalQuestions: 4,
    passed: true,
    completedAt: '2026-11-12T14:30:00.000Z',
  },
};

export const INITIAL_STUDENT_HISTORY: ActivityHistoryItem[] = [
  {
    id: 'hist-course-1',
    activityType: 'Course',
    activityId: 1,
    title: 'Web Development Fundamentals',
    category: 'PROGRAMMING',
    instructor: 'Dimas Saputra',
    completedAt: '2026-11-12T14:30:00.000Z',
    dateDisplay: '12 Nov 2026',
    pointsEarned: 35,
    statusLabel: 'Lulus Evaluasi · Nilai 85',
    score: 85,
    certificateId: 'cert-course-1',
  },
  {
    id: 'hist-webinar-4',
    activityType: 'Webinar',
    activityId: 4,
    title: 'Strategi Komunikasi Akademik & Presentasi Riset Skripsi',
    category: 'CAREER',
    instructor: 'Dr Bagus Prakoso',
    completedAt: '2026-11-10T20:30:00.000Z',
    dateDisplay: '10 Nov 2026',
    pointsEarned: 20,
    statusLabel: 'Hadir Penuh',
    certificateId: 'cert-webinar-4',
  },
];

export const INITIAL_STUDENT_CERTIFICATES: CertificateRecord[] = [
  {
    id: 'cert-course-1',
    certificateCode: 'CV-CRS-001-MEKT85',
    activityType: 'Course',
    activityId: 1,
    title: 'Web Development Fundamentals',
    category: 'PROGRAMMING',
    instructor: 'Dimas Saputra',
    recipientName: 'Mektildis Advenia Sanusi',
    issuedAt: '2026-11-12T14:30:00.000Z',
    dateDisplay: '12 November 2026',
    pointsEarned: 35,
    score: 85,
  },
  {
    id: 'cert-webinar-4',
    certificateCode: 'CV-WBN-004-MEKT20',
    activityType: 'Webinar',
    activityId: 4,
    title: 'Strategi Komunikasi Akademik & Presentasi Riset Skripsi',
    category: 'CAREER',
    instructor: 'Dr Bagus Prakoso',
    recipientName: 'Mektildis Advenia Sanusi',
    issuedAt: '2026-11-10T20:30:00.000Z',
    dateDisplay: '10 November 2026',
    pointsEarned: 20,
  },
];
