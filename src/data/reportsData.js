export const anonymousReports = [
  {
    id: 1,
    date: "12 November 2024",
    category: "Pertanian & Pangan",
    status: "Verified",
    description: "Janji pembagian bibit padi unggul belum terealisasi hingga sekarang. Petani lokal masih menggunakan bibit lama.",
    relatedPolitician: "Bambang Suryono",
    submittedDate: "10 November 2024",
    verificationDate: "12 November 2024",
    fullDescription: "Warga dari Boyolali melaporkan bahwa program kartu tani untuk distribusi bibit padi unggul belum berjalan sesuai rencana. Seharusnya bibit sudah didistribusikan ke 50 kelompok tani, namun hingga bulan November 2024 baru 15 kelompok yang menerima."
  },
  {
    id: 2,
    date: "08 November 2024",
    category: "Infrastruktur",
    status: "Pending",
    description: "Pemeliharaan jalan di kabupaten masih terbengkalai. Lubang besar di jalan utama mengganggu lalu lintas.",
    relatedPolitician: "Dedi Kusnandar",
    submittedDate: "05 November 2024",
    verificationDate: null,
    fullDescription: "Laporan dari warga Surabaya tentang kondisi jalan Jl. Raya Utama yang penuh lubang dan belum diperbaiki selama 4 bulan terakhir."
  },
  {
    id: 3,
    date: "06 November 2024",
    category: "Kesehatan",
    status: "Verified",
    description: "Vaksin anak di Puskesmas mengalami ketersediaan terbatas. Jadwal imunisasi terpaksa ditunda.",
    relatedPolitician: "Rina Wulandari",
    submittedDate: "03 November 2024",
    verificationDate: "06 November 2024",
    fullDescription: "Laporan dari orang tua anak balita di Bandung mengenai keterbatasan vaksin di Puskesmas setempat yang menyebabkan jadwal imunisasi harus ditunda berkali-kali."
  },
  {
    id: 4,
    date: "01 November 2024",
    category: "Pendidikan",
    status: "Rejected",
    description: "Usulan pembangunan perpustakaan desa ditolak tanpa penjelasan yang jelas kepada masyarakat.",
    relatedPolitician: "Teguh Prasetyo",
    submittedDate: "28 Oktober 2024",
    verificationDate: "01 November 2024",
    fullDescription: "Laporan ini ditolak karena berdasarkan verifikasi, usulan pembangunan perpustakaan sudah dalam tahap perencanaan detail dan bukan janji yang belum direalisasi.",
    rejectionReason: "Data tidak sesuai dengan status janji aktual"
  },
  {
    id: 5,
    date: "28 Oktober 2024",
    category: "Lingkungan Hidup",
    status: "Pending",
    description: "Sampah plastik di sungai masih menumpuk. Program pembersihan belum dimulai seperti yang dijanjikan.",
    relatedPolitician: "Lila Permata",
    submittedDate: "25 Oktober 2024",
    verificationDate: null,
    fullDescription: "Laporan dari komunitas lingkungan di Medan tentang tumpukan sampah plastik di sungai utama yang seharusnya sudah dibersihkan dalam program bersih sungai."
  },
  {
    id: 6,
    date: "22 Oktober 2024",
    category: "Ekonomi & UMKM",
    status: "Verified",
    description: "Bantuan modal UMKM untuk penjahit hanya mencapai 30% dari jumlah pendaftar yang memenuhi syarat.",
    relatedPolitician: "Nadia Rahma",
    submittedDate: "18 Oktober 2024",
    verificationDate: "22 Oktober 2024",
    fullDescription: "Laporan dari asosiasi UMKM penjahitan di Banjarmasin menunjukkan bahwa program bantuan modal hanya berhasil menjangkau 45 dari 150 pengrajin yang mendaftar."
  }
];

export const caseReviews = [
  {
    id: 1,
    title: "Kasus Pengurangan Anggaran Program Kartu Tani",
    politician: "Bambang Suryono",
    submittedDate: "15 September 2024",
    status: "In Review",
    lastFollowUpDate: "08 November 2024",
    lastFollowUpActivity: "Tim verifikasi melakukan kunjungan lapangan ke 3 kelompok tani Boyolali",
    description: "Investigasi terkait pengurangan alokasi anggaran untuk program kartu tani dari Rp 50 miliar menjadi Rp 30 miliar.",
    evidenceCount: 5,
    updates: [
      { date: "15 September 2024", activity: "Kasus dibuka berdasarkan laporan dari Dinas Pertanian" },
      { date: "20 September 2024", activity: "Wawancara dengan kepala Dinas Pertanian Jawa Tengah" },
      { date: "10 Oktober 2024", activity: "Review dokumen APBD alternatif dari tahun sebelumnya" },
      { date: "08 November 2024", activity: "Kunjungan lapangan ke kelompok tani penerima manfaat" }
    ]
  },
  {
    id: 2,
    title: "Kasus Keterlambatan Pembangunan Sekolah Menengah",
    politician: "Rina Wulandari",
    submittedDate: "10 August 2024",
    status: "Closed",
    lastFollowUpDate: "15 October 2024",
    lastFollowUpActivity: "Peresmian gedung sekolah menengah di Cianjur selesai tepat waktu",
    description: "Investigasi terkait keterlambatan pembangunan dua unit sekolah menengah yang seharusnya selesai bulan Juni 2024.",
    evidenceCount: 8,
    updates: [
      { date: "10 August 2024", activity: "Laporan keterlambatan diterima dari Dinas Pendidikan" },
      { date: "25 August 2024", activity: "Wawancara dengan kontraktor pembangunan" },
      { date: "05 September 2024", activity: "Identifikasi penyebab keterlambatan: cuaca ekstrem dan kendala material" },
      { date: "15 October 2024", activity: "Kedua gedung sekolah resmi digunakan untuk proses belajar mengajar" }
    ]
  },
  {
    id: 3,
    title: "Kasus Alokasi Dana Kesehatan Puskesmas Tidak Merata",
    politician: "Teguh Prasetyo",
    submittedDate: "05 July 2024",
    status: "In Review",
    lastFollowUpDate: "01 November 2024",
    lastFollowUpActivity: "Audit keuangan Puskesmas di 5 kecamatan wilayah Yogyakarta",
    description: "Investigasi terkait distribusi dana kesehatan Puskesmas yang tidak merata antar wilayah di Yogyakarta.",
    evidenceCount: 12,
    updates: [
      { date: "05 July 2024", activity: "Laporan awal diterima dari organisasi tenaga kesehatan" },
      { date: "20 July 2024", activity: "Pengumpulan data distribusi anggaran Puskesmas selama 3 tahun" },
      { date: "15 August 2024", activity: "Analisis perbandingan dana per kapita per Puskesmas" },
      { date: "01 November 2024", activity: "Audit lapangan di fasilitas kesehatan terpilih" }
    ]
  },
  {
    id: 4,
    title: "Kasus Program Sanitasi Bersih 50 Desa",
    politician: "Rina Wulandari",
    submittedDate: "20 June 2024",
    status: "In Review",
    lastFollowUpDate: "25 October 2024",
    lastFollowUpActivity: "Evaluasi kualitas sanitasi di 18 desa yang telah dibangun",
    description: "Review kemajuan program penyediaan sanitasi bersih di 50 desa dengan fokus pada sustainability pemeliharaan.",
    evidenceCount: 6,
    updates: [
      { date: "20 June 2024", activity: "Kasus dibuka untuk monitoring kemajuan program" },
      { date: "15 July 2024", activity: "Survey awal di 25 desa untuk memverifikasi kondisi fasilitas" },
      { date: "10 September 2024", activity: "Wawancara dengan kepala desa dan masyarakat lokal" },
      { date: "25 October 2024", activity: "Evaluasi kualitas air dan fungsi fasilitas MCK yang dibangun" }
    ]
  },
  {
    id: 5,
    title: "Kasus Internet Gratis Kantor Desa Tidak Berfungsi",
    politician: "Rina Wulandari",
    submittedDate: "12 May 2024",
    status: "Closed",
    lastFollowUpDate: "30 August 2024",
    lastFollowUpActivity: "Program internet desa di-revitalisasi dengan pembiayaan khusus dari pemerintah pusat",
    description: "Investigasi terkait jaringan Wi-Fi publik desa yang rusak dan tidak terawat setelah beberapa bulan instalasi.",
    evidenceCount: 7,
    updates: [
      { date: "12 May 2024", activity: "Laporan kerusakan jaringan Wi-Fi dari berbagai desa" },
      { date: "28 May 2024", activity: "Verifikasi lapangan ke 10 desa dengan koneksi mati" },
      { date: "15 June 2024", activity: "Rapat dengan penyedia layanan internet dan Pemerintah Daerah" },
      { date: "30 August 2024", activity: "Program revitalisasi selesai dengan jaminan pemeliharaan berkelanjutan" }
    ]
  }
];

export const transparencyUpdates = [
  {
    id: 1,
    title: "Investigasi Program Kartu Tani: Data Awal Kualitas Rendah",
    date: "08 November 2024",
    status: "Investigation",
    summary: "Tim investigasi menemukan bahwa 30% dari kartu tani yang dicetak memiliki data pribadi yang tidak akurat, yang dapat menghambat proses verifikasi penerima manfaat.",
    details: "Audit sampel terhadap 500 kartu tani menunjukkan error pada nama, NIK, atau alamat. Hal ini memerlukan pengecekan ulang dan kemungkinan pencetakan kartu ulang.",
    relatedCases: 1,
    investigatorName: "Tim Transparansi DPR"
  },
  {
    id: 2,
    title: "Bukti Terkumpul: Vaksin Tersedia di Puskesmas Setelah Realisasi Anggaran",
    date: "06 November 2024",
    status: "Evidence Collected",
    summary: "Berdasarkan bukti dokumentasi dan wawancara, ketersediaan vaksin anak di Puskesmas Bandung kembali normal setelah realisasi anggaran tambahan disetujui oleh DPRD setempat.",
    details: "Stok vaksin yang sempat langka kini tersedia kembali sejak Oktober 2024. Jadwal imunisasi sudah berjalan normal tanpa penundaan. Data Puskesmas menunjukkan peningkatan coverage imunisasi dari 78% menjadi 92%.",
    relatedCases: 3,
    investigatorName: "Tim Kesehatan Publik"
  },
  {
    id: 3,
    title: "Hasil Akhir: Jalan Utama Surabaya Resmi Diperbaiki",
    date: "01 November 2024",
    status: "Final Outcome",
    summary: "Perbaikan jalan Jl. Raya Utama Surabaya telah selesai dilaksanakan setelah mendapat perhatian melalui mekanisme laporan warga. Kondisi jalan kini aman untuk dilintasi.",
    details: "Pekerjaan perbaikan dimulai 15 Oktober 2024 dan selesai pada 30 Oktober 2024. Total biaya perbaikan Rp 2,4 miliar. Warga lokal mengapresiasi respon cepat dari pemerintah setempat.",
    relatedCases: 2,
    investigatorName: "Tim Infrastruktur"
  },
  {
    id: 4,
    title: "Evidence: Dokumentasi Bantuan Modal UMKM Penjahit Terealisasi 45 dari 150",
    date: "22 Oktober 2024",
    status: "Evidence Collected",
    summary: "Investigasi menemukan bukti nyata bahwa program bantuan modal UMKM untuk penjahit hanya mencapai 30% dari target awal. Alasan: keterbatasan anggaran dan kriteria seleksi yang ketat.",
    details: "Dari 150 penjahit yang mendaftar, hanya 45 yang lolos verifikasi aset dan kapasitas produksi. Bantuan modal rata-rata Rp 5 juta per penjahit sudah dicairkan dan digunakan untuk pembelian mesin jahit modern.",
    relatedCases: 6,
    investigatorName: "Tim Ekonomi Inklusif"
  },
  {
    id: 5,
    title: "Investigation: Sampah Sungai Medan Meningkat 40% Setelah Program Dimulai",
    date: "28 Oktober 2024",
    status: "Investigation",
    summary: "Temuan mengejutkan: alih-alih berkurang, volume sampah plastik di sungai Medan justru meningkat 40% setelah program pembersihan dimulai. Kemungkinan ada kesalahan dalam desain program.",
    details: "Program bekerja sama dengan kelompok lingkungan lokal, namun koordinasi dengan industri di hulu sungai tidak efektif. Sampah plastik dari pabrik masih mengalir deras ke sungai utama.",
    relatedCases: 5,
    investigatorName: "Tim Lingkungan Hidup"
  },
  {
    id: 6,
    title: "Hasil Akhir: Sekolah Menengah Cianjur Resmi Beroperasi Penuh",
    date: "15 Oktober 2024",
    status: "Final Outcome",
    summary: "Dua unit sekolah menengah di Cianjur yang sempat tertunda kini telah resmi digunakan untuk kegiatan pembelajaran dengan fasilitas lengkap dan guru berkualitas.",
    details: "Peresmian dilakukan pada 10 Oktober 2024 oleh Gubernur Jawa Barat. Sekolah sudah menerima 400 siswa dari berbagai daerah. Respons masyarakat sangat positif dengan antusiasme tinggi dari calon siswa.",
    relatedCases: 2,
    investigatorName: "Tim Pendidikan"
  }
];
