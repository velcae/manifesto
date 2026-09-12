export const politicians = [
  { name: "Bambang Suryono", role: "Anggota DPR RI", region: "Jawa Tengah", promises: 128, kept: 34, broken: 42, pending: 24 },
  { name: "Rina Wulandari", role: "Anggota DPR RI", region: "Jawa Barat", promises: 96, kept: 41, broken: 31, pending: 28 },
  { name: "Dedi Kusnandar", role: "Anggota DPR RI", region: "Jawa Timur", promises: 142, kept: 38, broken: 45, pending: 17 },
  { name: "Lila Permata", role: "Anggota DPR RI", region: "Sumatra Utara", promises: 110, kept: 29, broken: 50, pending: 21 },
  { name: "Teguh Prasetyo", role: "Anggota DPR RI", region: "Yogyakarta", promises: 87, kept: 46, broken: 28, pending: 26 },
  { name: "Nadia Rahma", role: "Anggota DPR RI", region: "Kalimantan Selatan", promises: 101, kept: 33, broken: 44, pending: 23 },
];

export const mockPromisesData = {
  "Bambang Suryono": [
    {
      id: 1,
      status: "Kept",
      title: "Program Kartu Tani untuk Subsidi Pupuk",
      date: "15 Maret 2022",
      category: "Pertanian & Pangan",
      description: "Menyediakan kartu tani khusus untuk mendistribusikan pupuk bersubsidi secara merata dan mencegah kelangkaan di tingkat petani lokal.",
      statusDetail: "Program telah diluncurkan secara penuh di Jawa Tengah. Distribusi pupuk kini menggunakan sistem verifikasi digital Kartu Tani dengan realisasi mencapai 92%.",
      sources: [
        { text: "Jatengprov.go.id - Peluncuran Kartu Tani Jawa Tengah", url: "#" },
        { text: "Laporan Evaluasi Pupuk Bersubsidi Kuartal II", url: "#" }
      ],
      evidence: [
        { title: "Dokumentasi Pembagian Kartu Tani di Boyolali", date: "18 Maret 2022", type: "image" }
      ]
    },
    {
      id: 2,
      status: "Broken",
      title: "Pembangunan 5 Waduk Baru dalam 3 Tahun",
      date: "10 April 2022",
      category: "Infrastruktur",
      description: "Membangun lima waduk baru di wilayah rawan kekeringan di Jawa Tengah untuk irigasi persawahan.",
      statusDetail: "Proyek dihentikan sementara karena kendala pembebasan lahan dan relokasi anggaran untuk kebutuhan mendesak pasca-pandemi.",
      sources: [
        { text: "Kementerian PUPR - Update Proyek Irigasi Regional", url: "#" }
      ],
      evidence: []
    },
    {
      id: 3,
      status: "Pending",
      title: "Rehabilitasi 10.000 Hektar Hutan Lindung",
      date: "05 Mei 2022",
      category: "Lingkungan Hidup",
      description: "Merehabilitasi kawasan hutan gundul di lereng gunung untuk mencegah tanah longsor dan menjaga kelestarian sumber daya air.",
      statusDetail: "Reboisasi tahap pertama baru berjalan seluas 2.500 hektar di kawasan lereng Merapi dan Merbabu. Target 10.000 hektar ditunda hingga 2027.",
      sources: [
        { text: "Perhutani Divre Jateng - Rencana Kerja Reboisasi", url: "#" }
      ],
      evidence: []
    },
    {
      id: 4,
      status: "Kept",
      title: "Peningkatan Anggaran Puskesmas Pembantu",
      date: "20 Februari 2022",
      category: "Kesehatan",
      description: "Meningkatkan alokasi dana operasional dan fasilitas medis untuk seluruh Puskesmas Pembantu (Pustu) di tingkat desa.",
      statusDetail: "Anggaran operasional Pustu dinaikkan sebesar 15% melalui APBD, membiayai pengadaan obat dasar dan alat cek darah portable.",
      sources: [
        { text: "Dinas Kesehatan Jawa Tengah - Rilis Alokasi APBD", url: "#" }
      ],
      evidence: []
    },
    {
      id: 5,
      status: "Broken",
      title: "Bantuan Modal UMKM Tanpa Bunga",
      date: "12 Januari 2022",
      category: "Ekonomi & UMKM",
      description: "Menyediakan program pinjaman modal lunak tanpa bunga bagi para pelaku usaha mikro, kecil, dan menengah.",
      statusDetail: "Program dibatalkan karena tidak disetujui dalam rapat anggaran komisi APBD yang menilai risiko kredit macet terlalu tinggi.",
      sources: [
        { text: "Rapat Dengar Pendapat Komisi XI DPRD", url: "#" }
      ],
      evidence: []
    }
  ],
  "Rina Wulandari": [
    {
      id: 1,
      status: "Kept",
      title: "Pembangunan Sekolah Menengah Baru di Pedesaan",
      date: "15 Maret 2022",
      category: "Pendidikan",
      description: "Mendirikan gedung sekolah menengah baru di kecamatan terpencil untuk memudahkan akses pendidikan anak-anak desa.",
      statusDetail: "Tiga unit sekolah baru (USB) telah resmi dibangun dan digunakan di Sukabumi dan Cianjur.",
      sources: [
        { text: "Disdik Jabar - Peresmian USB Wilayah Selatan", url: "#" }
      ],
      evidence: []
    },
    {
      id: 2,
      status: "Broken",
      title: "Pengurangan Kemacetan Jalur Puncak",
      date: "10 April 2022",
      category: "Transportasi",
      description: "Menerapkan sistem transportasi terpadu untuk mengatasi kemacetan parah di kawasan wisata Puncak.",
      statusDetail: "Volume kendaraan terus meningkat dan belum ada solusi infrastruktur jangka panjang yang terealisasi hingga saat ini.",
      sources: [
        { text: "Kemenhub - Kajian Arus Lalu Lintas Puncak", url: "#" }
      ],
      evidence: []
    },
    {
      id: 3,
      status: "Pending",
      title: "Penyediaan Sanitasi Bersih di 50 Desa",
      date: "05 Mei 2022",
      category: "Kesehatan & Sanitasi",
      description: "Membangun fasilitas MCK umum dan jaringan air bersih di 50 desa dengan sanitasi terburuk.",
      statusDetail: "Baru selesai di 18 desa. Pembangunan terhambat ketersediaan sumber air tanah di beberapa lokasi.",
      sources: [
        { text: "Sanitasi Pedesaan Jabar - Laporan Progress Kerja", url: "#" }
      ],
      evidence: []
    },
    {
      id: 4,
      status: "Kept",
      title: "Pemberdayaan Ekonomi Kreatif Pemuda",
      date: "20 Februari 2022",
      category: "Ekonomi Kreatif",
      description: "Menyelenggarakan pelatihan keterampilan digital dan inkubator bisnis untuk wirausahawan muda.",
      statusDetail: "Program Jabar Digital Campaigner telah melatih lebih dari 1.200 pemuda di bidang pemasaran digital.",
      sources: [
        { text: "Jabar Digital Service - Evaluasi Pelatihan Kreatif", url: "#" }
      ],
      evidence: []
    },
    {
      id: 5,
      status: "Broken",
      title: "Pengadaan Internet Gratis di Seluruh Kantor Desa",
      date: "12 Januari 2022",
      category: "Teknologi & Informasi",
      description: "Memasang jaringan Wi-Fi publik gratis di area sekitar kantor desa untuk mendukung literasi digital warga.",
      statusDetail: "Banyak desa yang jaringannya mati setelah beberapa bulan karena tidak ada anggaran pemeliharaan dari pemerintah daerah.",
      sources: [
        { text: "Kemenkominfo - Laporan Audit Akses Internet Desa", url: "#" }
      ],
      evidence: []
    }
  ]
};

export function slugifyPoliticianName(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getPoliticianBySlug(slug) {
  return politicians.find(p => slugifyPoliticianName(p.name) === slug);
}

export function getPoliticianPromises(politicianName, region) {
  if (mockPromisesData[politicianName]) {
    return mockPromisesData[politicianName];
  }
  
  return [
    {
      id: 1,
      status: "Kept",
      title: `Program Air Bersih Mandiri ${region}`,
      date: "15 Maret 2022",
      category: "Infrastruktur",
      description: `Membangun sumur bor dan jaringan pipa air bersih ke rumah-rumah warga di kawasan rawan kekeringan di wilayah ${region}.`,
      statusDetail: `Program selesai dikerjakan dengan pembangunan 12 titik sumur artesis baru yang mengaliri lebih dari 800 kepala keluarga di ${region}.`,
      sources: [
        { text: `Dinas PU Daerah - Laporan Penyelesaian Infrastruktur Air ${region}`, url: "#" },
        { text: "Berita Daerah - Warga Nikmati Air Bersih", url: "#" }
      ],
      evidence: [
        { title: `Peresmian Sumur Bor oleh nama politician`, date: "20 Maret 2022", type: "image" }
      ]
    }
  ];
}
