import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import iknBackground from "./assets/ikn.png";
import Reports from "./components/Reports";

const politicians = [
  { name: "Bambang Suryono", role: "Anggota DPR RI", region: "Jawa Tengah", promises: 128, kept: 34, broken: 42, pending: 24 },
  { name: "Rina Wulandari", role: "Anggota DPR RI", region: "Jawa Barat", promises: 96, kept: 41, broken: 31, pending: 28 },
  { name: "Dedi Kusnandar", role: "Anggota DPR RI", region: "Jawa Timur", promises: 142, kept: 38, broken: 45, pending: 17 },
  { name: "Lila Permata", role: "Anggota DPR RI", region: "Sumatra Utara", promises: 110, kept: 29, broken: 50, pending: 21 },
  { name: "Teguh Prasetyo", role: "Anggota DPR RI", region: "Yogyakarta", promises: 87, kept: 46, broken: 28, pending: 26 },
  { name: "Nadia Rahma", role: "Anggota DPR RI", region: "Kalimantan Selatan", promises: 101, kept: 33, broken: 44, pending: 23 },
];

const brokenPromises = [...politicians]
  .sort((a, b) => b.broken - a.broken)
  .slice(0, 5)
  .map(p => [p.name, p.region, `${p.broken}%`]);

const mockPromisesData = {
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

function getPoliticianPromises(politicianName, region) {
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
        { title: `Peresmian Sumur Bor oleh ${politicianName}`, date: "20 Maret 2022", type: "image" }
      ]
    },
    {
      id: 2,
      status: "Broken",
      title: `Pengadaan Ambulans Desa Gratis`,
      date: "10 April 2022",
      category: "Kesehatan",
      description: `Menyediakan satu unit mobil ambulans desa siaga untuk mempermudah akses rujukan darurat bagi warga miskin.`,
      statusDetail: "Realisasi anggaran dialihkan untuk penanganan darurat bencana alam, sehingga program pengadaan unit ambulans dibatalkan.",
      sources: [
        { text: "Laporan Pertanggungjawaban Realisasi APBD", url: "#" }
      ],
      evidence: []
    },
    {
      id: 3,
      status: "Pending",
      title: `Digitalisasi UMKM & Pasar Tradisional`,
      date: "05 Mei 2022",
      category: "Ekonomi & UMKM",
      description: `Memberikan pelatihan e-commerce dan menyediakan sistem pembayaran non-tunai (QRIS) bagi pedagang pasar di ${region}.`,
      statusDetail: "Fase sosialisasi telah berjalan di 3 pasar induk, namun implementasi mesin pembayaran elektronik masih tertunda karena infrastruktur jaringan setempat.",
      sources: [
        { text: `Disperindag - Laporan Pendampingan Digital UMKM ${region}`, url: "#" }
      ],
      evidence: []
    },
    {
      id: 4,
      status: "Kept",
      title: `Revitalisasi Balai Latihan Kerja (BLK)`,
      date: "20 Februari 2022",
      category: "Pendidikan & Ketenagakerjaan",
      description: `Memperbarui peralatan praktik di BLK kabupaten agar sesuai dengan kebutuhan industri otomotif dan manufaktur saat ini.`,
      statusDetail: "Peralatan las standar industri dan mesin CNC baru telah dipasang di BLK utama, dan kurikulum pelatihan telah diperbarui.",
      sources: [
        { text: "Disnakertrans - Laporan Kemitraan Industri BLK", url: "#" }
      ],
      evidence: []
    },
    {
      id: 5,
      status: "Broken",
      title: `Pemberian Laptop Gratis untuk Siswa Berprestasi`,
      date: "12 Januari 2022",
      category: "Pendidikan",
      description: `Membagikan laptop gratis untuk menunjang pembelajaran daring bagi seluruh siswa berprestasi dari keluarga tidak mampu.`,
      statusDetail: "Pengadaan dibatalkan setelah proses tender dinilai tidak transparan dan terjadi sengketa hukum dengan pihak ketiga.",
      sources: [
        { text: "Laporan Lembaga Kebijakan Pengadaan Barang/Jasa Pemerintah", url: "#" }
      ],
      evidence: []
    }
  ];
}

const pageCards = {
  politicians: [
    { title: "Politician Profiles", text: "Review verified records, party alignment, and promise fulfillment for each public figure." },
    { title: "Regional Coverage", text: "Filter progress by region, party, and promise category to compare performance quickly." },
    { title: "Accountability Notes", text: "See which leaders have the strongest follow-through and who needs closer scrutiny." },
  ],
  promises: [
    { title: "Promise Tracking", text: "Monitor commitments by issue area and measure how many are kept, broken, or still in progress." },
    { title: "Progress Status", text: "Use clear indicators to compare campaign promises across the whole public agenda." },
    { title: "Evidence Log", text: "Support each promise with updates, citations, and verified milestone reports." },
  ],
  insights: [
    { title: "Trend Analysis", text: "Spot patterns in promise fulfillment, public trust, and legislative responsiveness over time." },
    { title: "Citizen Signals", text: "Understand where citizens are most engaged and where reporting activity is increasing." },
    { title: "Impact Highlights", text: "Summarize how promise progress changes public perception and accountability." },
  ],
  reports: [
    { title: "Anonymous Reports", text: "Collect verified concerns and public feedback from citizens without exposing identities." },
    { title: "Case Review", text: "Review submitted cases, response status, and the latest follow-up activity." },
    { title: "Transparency Hub", text: "Publish updates on investigations, evidence collection, and final outcomes." },
  ],
  about: [
    { title: "Our Mission", text: "Manifesto helps citizens track whether politicians keep the promises they make during campaigns." },
    { title: "How We Work", text: "We combine public records, community reporting, and transparency reviews into one simple system." },
    { title: "Why It Matters", text: "Clear promise tracking builds trust, accountability, and stronger public participation." },
  ],
};

function slugifyPoliticianName(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const politicianBySlug = Object.fromEntries(
  politicians.map((politician) => [slugifyPoliticianName(politician.name), politician])
);

function getPoliticianFromPath(pathname) {
  if (!pathname || !pathname.startsWith("/politicians/")) return null;
  const slug = pathname.split("/")[2] || "";
  return politicianBySlug[slug] || null;
}

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  switch (name) {
    case "shield":
      return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>;
    case "help":
      return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 1 1 4.9 2.3c-.8.6-1.5 1.1-1.5 2.7" /><path d="M12 17h.01" /></svg>;
    case "file":
      return <svg {...common}><path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" /><path d="M14 2v5h5" /><path d="M9 13h6" /><path d="M9 17h6" /></svg>;
    case "users":
      return <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
    case "trend":
      return <svg {...common}><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>;
    case "map":
      return <svg {...common}><path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3Z" /><path d="M9 3v15" /><path d="M15 6v15" /></svg>;
    case "grid":
      return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
    case "list":
      return <svg {...common}><path d="M8 6h13" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M3 6h.01" /><path d="M3 12h.01" /><path d="M3 18h.01" /></svg>;
    case "alert":
      return <svg {...common}><path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>;
    case "badge":
      return <svg {...common}><path d="M12 2l2.4 5 5.5.8-4 3.9.9 5.5-4.8-2.6-4.8 2.6.9-5.5-4-3.9 5.5-.8L12 2Z" /></svg>;
    case "arrow":
      return <svg {...common}><path d="M7 17 17 7" /><path d="M9 7h8v8" /></svg>;
    case "dots":
      return <svg {...common}><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></svg>;
    case "avatar":
      return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
    case "arrow-left":
      return <svg {...common}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>;
    default:
      return null;
  }
}

function Metric({ icon, value, label }) {
  return (
    <div className="metric">
      <div className="metricIcon"><Icon name={icon} size={14} /></div>
      <div className="metricValue">{value}</div>
      <div className="metricLabel">{label}</div>
    </div>
  );
}

function FilterPill({ icon, label, mobileLabel }) {
  return (
    <button className="filterPill" type="button">
      <span className="pillIcon"><Icon name={icon} size={13} /></span>
      <span className="desktopLabel">{label}</span>
      {mobileLabel && <span className="mobileLabel">{mobileLabel}</span>}
      <span className="chevron">⌄</span>
    </button>
  );
}

function TypingHeadline() {
  const fullText = "Promises made.\nPromises tracked.";
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const phaseRef = React.useRef("typing");
  const indexRef = React.useRef(0);

  useEffect(() => {
    let timer = null;

    const tick = () => {
      if (phaseRef.current === "typing") {
        if (indexRef.current < fullText.length) {
          indexRef.current += 1;
          setTypedText(fullText.slice(0, indexRef.current));
          setIsTyping(true);
          timer = setTimeout(tick, 150);
          return;
        }

        phaseRef.current = "idle";
        setIsTyping(false);
        timer = setTimeout(() => {
          phaseRef.current = "erasing";
          tick();
        }, 6000);
        return;
      }

      if (phaseRef.current === "erasing") {
        if (indexRef.current > 0) {
          indexRef.current -= 1;
          setTypedText(fullText.slice(0, indexRef.current));
          setIsTyping(true);
          timer = setTimeout(tick, 75);
          return;
        }

        phaseRef.current = "typing";
        indexRef.current = 0;
        setTypedText("");
        setIsTyping(true);
        timer = setTimeout(tick, 100);
      }
    };

    timer = setTimeout(tick, 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 className="heroTitle">
      <span className="typingText">{typedText}{isTyping ? <span className="typingCursor" aria-hidden="true" /> : null}</span>
    </h1>
  );
}


function PoliticianCard({ item, onSelect }) {
  const slugifyPoliticianName = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <Link
      to={`/politicians/${slugifyPoliticianName(item.name)}`}
      className="card cardClickable"
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="cardTop">
        <div className="avatarBox"><Icon name="avatar" size={18} /></div>
        <div>
          <div className="name">{item.name}</div>
          <div className="subText">{item.role}</div>
          <div className="subText">{item.region}</div>
        </div>
      </div>

      <div className="promises">{item.promises} promises</div>
      <div className="progress">
        <div className="progressKept" style={{ width: `${item.kept}%` }} />
        <div className="progressBroken" style={{ width: `${item.broken}%` }} />
        <div className="progressPending" style={{ width: `${item.pending}%` }} />
      </div>
      <div className="statsRow">
        <div><div className="statKept">{item.kept}%</div><div className="statLabel">Kept</div></div>
        <div><div className="statBroken">{item.broken}%</div><div className="statLabel">Broken</div></div>
        <div><div className="statPending">{item.pending}%</div><div className="statLabel">Pending</div></div>
      </div>
    </Link>
  );
}

function PoliticianDetailPage({ politician, selectedPromiseId, onSelectPromise, onBack }) {
  const [localActiveTab, setLocalActiveTab] = useState("Overview");
  const promises = getPoliticianPromises(politician.name, politician.region);
  const currentPromise = promises.find((promise) => promise.id === selectedPromiseId) || promises[0];
  const keptCount = Math.round((politician.promises * politician.kept) / 100);
  const brokenCount = Math.round((politician.promises * politician.broken) / 100);
  const pendingCount = Math.round((politician.promises * politician.pending) / 100);

  const navTabs = ["Overview", "Promises", "Breakdown", "Statements", "Timeline", "Votes", "Profile"];

  return (
    <div className="profileContainer">
      <button className="backLink" type="button" onClick={onBack}>
        <Icon name="arrow-left" size={14} />
        <span>Back to all politicians</span>
      </button>

      {/* Profile Header and Metrics Row */}
      <div className="profileHeaderMetricsRow">
        {/* Profile Header */}
        <div className="profileHeaderBox">
          <div className="profileAvatar">
            {politician.name.charAt(0)}
          </div>
          <div className="profileInfo">
            <div className="profileName">
              <h2>{politician.name}</h2>
              <span className="profileBadge"><Icon name="shield" size={12} /></span>
            </div>
            <div className="profileRole">{politician.role}</div>
            <div className="profileRegion">{politician.region} • Independent</div>
          </div>
        </div>

        {/* Metrics Box with Progress Visualization */}
        <div className="metricsBox">
          <div className="metricsRow">
            <div className="metricSmall">
              <div className="metricSmallValue">{politician.promises}</div>
              <div className="metricSmallLabel">Total</div>
            </div>
            <div className="metricSmall">
              <div className="metricSmallValue">{politician.kept}%</div>
              <div className="metricSmallLabel">Kept</div>
            </div>
            <div className="metricSmall">
              <div className="metricSmallValue">{politician.broken}%</div>
              <div className="metricSmallLabel">Broken</div>
            </div>
            <div className="metricSmall">
              <div className="metricSmallValue">{politician.pending}%</div>
              <div className="metricSmallLabel">Pending</div>
            </div>
          </div>
          <div className="progressBarInline">
            <div className="progressBarFill">
              <div className="progressKept" style={{ width: `${politician.kept}%` }} />
              <div className="progressBroken" style={{ width: `${politician.broken}%` }} />
              <div className="progressPending" style={{ width: `${politician.pending}%` }} />
            </div>
            <div className="progressLegend">
              <span className="legendItem">
                <span className="legendColor progressKept" />
                Kept
              </span>
              <span className="legendItem">
                <span className="legendColor progressBroken" />
                Broken
              </span>
              <span className="legendItem">
                <span className="legendColor progressPending" />
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="navTabs">
        {navTabs.map((tab) => (
          <button
            key={tab}
            className={`navTab ${localActiveTab === tab ? "active" : ""}`}
            onClick={() => setLocalActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tabContent">
        {localActiveTab === "Overview" && (
          <div>

            <div className="layoutGrid">
              <div className="layoutLeft">
                {/* Promises List */}
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div className="sectionLabel">Promises</div>
                  <div className="promiseList" style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {promises.map((promise) => (
                      <button
                        key={promise.id}
                        className={`promiseItem ${currentPromise?.id === promise.id ? "activePromise" : ""}`}
                        onClick={() => onSelectPromise(promise.id)}
                        type="button"
                      >
                        <div className={`statusDot status${promise.status}`} />
                        <div className="promiseItemTitle">{promise.title}</div>
                        <div className="promiseItemMeta">{promise.date} • {promise.category}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Report Card */}
                <div className="reportCard">
                  <div className="reportCardTitle">
                    Know something we don't?
                  </div>
                  <button className="reportCardBtn" type="button">Submit Anonymous Report</button>
                </div>
              </div>

              {/* Promise Detail */}
              <div className="layoutRight">
                {currentPromise ? (
                  <article className="promiseDetailCard">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "10px" }}>
                      <div className={`statusPill status${currentPromise.status}`}>{currentPromise.status}</div>
                      <div style={{ fontSize: "11px", color: "#6b665f" }}>{currentPromise.date}</div>
                    </div>

                    <h3 className="promiseDetailTitle">{currentPromise.title}</h3>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 14px", color: "#665f57", fontSize: "11px", borderBottom: "1px solid #ece6dc", paddingBottom: "10px", marginBottom: "10px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <Icon name="file" size={12} />
                        Promise made on: {currentPromise.date}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <Icon name="badge" size={12} />
                        Category: {currentPromise.category}
                      </span>
                    </div>

                    <div className="promiseSection">
                      <div className="promiseSectionTitle">Promise Description</div>
                      <p>{currentPromise.description}</p>
                    </div>

                    <div className="promiseSection">
                      <div className="promiseSectionTitle">Status</div>
                      <p>{currentPromise.statusDetail}</p>
                    </div>

                    <div className="promiseSection">
                      <div className="promiseSectionTitle">Sources</div>
                      <ul className="sourceList">
                        {currentPromise.sources.map((source) => (
                          <li key={source.text}>
                            <a href={source.url} target="_blank" rel="noreferrer">{source.text}</a>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="promiseSection">
                      <div className="promiseSectionTitle">Evidence</div>
                      {currentPromise.evidence.length > 0 ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px" }}>
                          {currentPromise.evidence.map((evidence) => (
                            <div key={evidence.title} style={{ border: "1px solid #e5ddd2", borderRadius: "12px", background: "#fcfbf8", padding: "10px" }}>
                              <div style={{ width: "100%", height: "110px", borderRadius: "10px", background: "linear-gradient(135deg, #efe7da, #f8f4ee)", display: "grid", placeItems: "center", color: "#948b80", marginBottom: "8px" }}>
                                <Icon name="file" size={18} />
                              </div>
                              <div style={{ fontSize: "12px", fontWeight: 700, color: "#1d1915" }}>{evidence.title}</div>
                              <div style={{ marginTop: "2px", fontSize: "10px", color: "#6d6760" }}>{evidence.date}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ color: "#6b665f", fontSize: "12px", background: "#fcfbf8", border: "1px dashed #e1d9ce", borderRadius: "12px", padding: "12px" }}>
                          No supporting evidence attached yet.
                        </div>
                      )}
                    </div>
                  </article>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {localActiveTab === "Promises" && (
          <div style={{ padding: "20px", background: "#fff", borderRadius: "12px", border: "1px solid var(--line2)" }}>
            <h3>Promises</h3>
            <p>This section will display detailed promise analytics and tracking.</p>
          </div>
        )}

        {localActiveTab === "Breakdown" && (
          <div style={{ padding: "20px", background: "#fff", borderRadius: "12px", border: "1px solid var(--line2)" }}>
            <h3>Breakdown</h3>
            <p>This section will display promise category breakdown and statistics.</p>
          </div>
        )}

        {localActiveTab === "Statements" && (
          <div style={{ padding: "20px", background: "#fff", borderRadius: "12px", border: "1px solid var(--line2)" }}>
            <h3>Statements</h3>
            <p>This section will display politician statements and press releases.</p>
          </div>
        )}

        {localActiveTab === "Timeline" && (
          <div style={{ padding: "20px", background: "#fff", borderRadius: "12px", border: "1px solid var(--line2)" }}>
            <h3>Timeline</h3>
            <p>This section will display a timeline of promise updates.</p>
          </div>
        )}

        {localActiveTab === "Votes" && (
          <div style={{ padding: "20px", background: "#fff", borderRadius: "12px", border: "1px solid var(--line2)" }}>
            <h3>Votes</h3>
            <p>This section will display voting records related to promises.</p>
          </div>
        )}

        {localActiveTab === "Profile" && (
          <div style={{ padding: "20px", background: "#fff", borderRadius: "12px", border: "1px solid var(--line2)" }}>
            <h3>Profile</h3>
            <p>This section will display detailed politician profile information.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ManifestoMockup() {
  const location = useLocation();
  const [activePage, setActivePage] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedPolitician, setSelectedPolitician] = useState(null);
  const [selectedPromiseId, setSelectedPromiseId] = useState(null);
  const [politicianPath, setPoliticianPath] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "/politicians";
  });

  // Initialize selectedPolitician from URL on mount
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname.startsWith("/politicians/")) {
      const slug = pathname.split("/")[2];
      if (slug && slug !== "") {
        const politician = politicianBySlug[slug] || null;
        if (politician) {
          setSelectedPolitician(politician);
          setActivePage("politicians");
        }
      }
    }
  }, [location.pathname]);

  // Sync activePage with route on mount/location change
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/dashboard") {
      setActivePage("dashboard");
    } else if (location.pathname === "/politicians") {
      setActivePage("politicians");
    } else if (location.pathname === "/promises") {
      setActivePage("promises");
    } else if (location.pathname === "/insights") {
      setActivePage("insights");
    } else if (location.pathname === "/reports") {
      setActivePage("reports");
    } else if (location.pathname === "/about") {
      setActivePage("about");
    }
  }, [location.pathname]);

  const currentCards = pageCards[activePage] || [];
  const currentDetailPromises = selectedPolitician
    ? getPoliticianPromises(selectedPolitician.name, selectedPolitician.region)
    : [];

  // Get all promises across all politicians
  const allPromises = React.useMemo(() => {
    return politicians.flatMap((p) => {
      const promises = getPoliticianPromises(p.name, p.region);
      return promises.map((promise) => ({
        ...promise,
        politician: p,
      }));
    });
  }, []);

  const uniqueCategories = React.useMemo(() => {
    return Array.from(new Set(allPromises.map((p) => p.category)));
  }, [allPromises]);

  const uniquePoliticians = React.useMemo(() => {
    return politicians.map((p) => p.name);
  }, []);

  const [promiseStatusFilter, setPromiseStatusFilter] = useState("All");
  const [promiseCategoryFilter, setPromiseCategoryFilter] = useState("All");
  const [promisePoliticianFilter, setPromisePoliticianFilter] = useState("All");

  const filteredPromises = React.useMemo(() => {
    return allPromises.filter((promise) => {
      const matchStatus = promiseStatusFilter === "All" || promise.status.toLowerCase() === promiseStatusFilter.toLowerCase();
      const matchCategory = promiseCategoryFilter === "All" || promise.category === promiseCategoryFilter;
      const matchPolitician = promisePoliticianFilter === "All" || promise.politician.name === promisePoliticianFilter;
      return matchStatus && matchCategory && matchPolitician;
    });
  }, [allPromises, promiseStatusFilter, promiseCategoryFilter, promisePoliticianFilter]);

  const openPromiseDetail = (politicianName, promiseId) => {
    const politicianObj = politicians.find((p) => p.name === politicianName);
    if (politicianObj) {
      setSelectedPromiseId(promiseId);
      openPoliticianPage(politicianObj);
    }
  };

  const openPoliticianPage = (politician) => {
    const slug = slugifyPoliticianName(politician.name);
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", `/politicians/${slug}`);
      setPoliticianPath(`/politicians/${slug}`);
    }
    setActivePage("politicians");
    setSelectedPolitician(politician);
  };

  const goBackToPoliticians = () => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/politicians");
      setPoliticianPath("/politicians");
    }
    setSelectedPolitician(null);
  };

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handlePopState = () => setPoliticianPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  React.useEffect(() => {
    if (!politicianPath.startsWith("/politicians")) return;
    setActivePage("politicians");
    const politician = getPoliticianFromPath(politicianPath);
    setSelectedPolitician(politician);
  }, [politicianPath]);

  React.useEffect(() => {
    if (!selectedPolitician) {
      setSelectedPromiseId(null);
      return;
    }

    const promises = getPoliticianPromises(selectedPolitician.name, selectedPolitician.region);
    setSelectedPromiseId((current) => current ?? promises[0]?.id ?? null);
  }, [selectedPolitician]);

  return (
    <div className="page">
      <style>{`
        @font-face {
          font-family: 'Anthropic Sans';
          src: url('https://assets-proxy.anthropic.com/claude-ai/v2/assets/v1/cc27851ad-CFxw3nG7.woff2') format('woff2');
          font-weight: 300 800;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Anthropic Serif';
          src: url('https://assets-proxy.anthropic.com/claude-ai/v2/assets/v1/c66fc489e-C-BHYa_K.woff2') format('woff2');
          font-weight: 300 800;
          font-style: normal;
          font-display: swap;
        }
        :root {
          --bg: #f7f5f0;
          --line: #ded7cd;
          --line2: #d9d2c7;
          --text: #1f1b17;
          --muted: #6a645d;
          --accent: #d35c29;
          --sand: #efe9df;
          --sand2: #e6dccd;
        }
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; min-height: 100%; }
        body {
          font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          overflow-y: auto;
        }
        a { color: inherit; text-decoration: none; }
        button { font: inherit; cursor: pointer; }
        .page {
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,.25), rgba(247,245,240,.15));
        }
        .scaledApp {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          width: 100%;
          min-height: auto;
        }
        .container {
          width: min(1450px, calc(100% - 44px));
          margin: 0 auto;
        }
        .topbar {
          flex: 0 0 auto;
          border-bottom: 1px solid var(--line);
          background: rgba(250, 248, 244, 0.96);
          backdrop-filter: blur(10px);
        }
        .topbarInner {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-height: 52px;
          padding: 3px 0;
        }
        .logo {
          position: relative;
          z-index: 2;
          flex: 0 0 auto;
          font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.06em;
          line-height: 1;
          color: #171411;
        }
        .nav {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          font-size: 12px;
          line-height: 1.1;
          color: #26221e;
          z-index: 1;
        }
        .nav a, .nav button {
          position: relative;
          padding-bottom: 6px;
          opacity: 0.98;
          font-weight: 600;
          letter-spacing: -0.02em;
          text-transform: capitalize;
        }
        .nav button.active, .nav a.active { color: var(--accent); }
        .nav button.active::after, .nav a.active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          border-radius: 999px;
          background: var(--accent);
        }
        .topActions {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          flex: 0 0 auto;
          margin-left: auto;
        }
        .helpBtn, .reportBtn, .sortBtn, .filterPill, .loadMoreBtn, .viewListBtn {
          border: 1px solid var(--line2);
          background: #fff;
          border-radius: 12px;
        }
        .helpBtn {
          border: 0;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #3d3833;
          padding: 4px 2px;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }
        .reportBtn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-color: #d68a69;
          background: #fff;
          box-shadow: 0 1px 0 rgba(0,0,0,.03);
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }
        .reportBadge {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          background: var(--accent);
          color: #fff;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
        }
        .hero {
          position: relative;
          flex: 0 0 auto;
          border-bottom: 1px solid #dfd8ce;
          overflow: hidden;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.25), rgba(247,245,240,0.08));
          margin-bottom: 4px;
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: url("${iknBackground}");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          opacity: 0.10;
          filter: saturate(0.9) contrast(1.02) blur(0.2px);
          transform: scale(1.02);
        }
        .heroGrid {
          display: grid;
          grid-template-columns: 1.08fr .92fr;
          gap: 18px;
          padding: 36px 0 32px;
          min-height: 280px;
          align-items: stretch;
        }
        .heroLeft {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          min-height: auto;
          gap: 12px;
        }
        .heroLeft h1 {
          margin: 0;
          font-size: 48px;
          line-height: .96;
          letter-spacing: -.07em;
          font-weight: 800;
          color: #161311;
          max-width: 620px;
        }
        .heroTitle {
          display: block;
          width: fit-content;
          min-height: 2.2em;
          height: 2.2em;
          flex: 0 0 auto;
          overflow: hidden;
          line-height: 1;
          white-space: nowrap;
        }
        .typingText {
          display: inline-block;
          min-height: 2.0em;
          line-height: 1;
          white-space: pre-line;
          vertical-align: top;
        }
        .typingCursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          margin-left: 2px;
          background: rgba(22, 19, 17, 0.45);
          vertical-align: text-bottom;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .heroLeft p {
          max-width: 550px;
          margin: 0;
          min-height: auto;
          font-size: 13px;
          line-height: 1.4;
          color: #4f4a44;
        }
        .searchBar {
          margin-top: 12px;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px;
          border: 1px solid var(--line2);
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 10px 20px rgba(0,0,0,.02);
          max-width: 730px;
        }
        .searchInput {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          color: #8b837a;
          font-size: 12px;
          min-width: 0;
          line-height: 1.2;
        }
        .searchBtn {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          background: var(--accent);
          color: white;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }
        .heroRight {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: stretch;
          padding-top: 4px;
        }
        .metrics {
          display: flex;
          align-items: stretch;
          gap: 10px;
          padding: 2px;
        }
        .metric {
          flex: 1;
          text-align: center;
          padding: 12px;
          border: 1px solid #e4ddd4;
          border-radius: 12px;
          background: rgba(255,255,255,0.72);
          box-shadow: 0 8px 18px rgba(0,0,0,0.04);
          min-height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .metricIcon {
          width: 40px;
          height: 40px;
          margin: 0 auto 6px;
          border-radius: 999px;
          background: var(--sand);
          color: #5e5b57;
          display: grid;
          place-items: center;
        }
        .metricValue {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -.05em;
          color: #1c1a17;
          line-height: 1;
        }
        .metricLabel {
          margin-top: 4px;
          font-size: 11px;
          color: #66625b;
          line-height: 1.3;
        }
        .divider { width: 1px; background: #d8d1c7; margin: 6px 0; }
        .heroIllustration { display: none; }
        .filterRow {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-top: 4px;
          padding-bottom: 8px;
        }
        .filters {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
        }
        .filterPill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          color: #3a3732;
          min-width: 160px;
          font-size: 11px;
          line-height: 1;
        }
        .pillIcon { color: #5f5b55; display: inline-flex; flex: 0 0 auto; }
        .chevron { margin-left: auto; color: #5f5b55; font-size: 12px; }
        .sortBlock {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 0 0 280px;
          width: 280px;
          max-width: 280px;
          justify-content: flex-start;
          padding: 2px 0;
          min-width: 0;
        }
        .sortBtn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex: 1 1 auto;
          min-width: 0;
          width: 100%;
          max-width: 236px;
          padding: 6px 8px;
          color: #3a3732;
          font-size: 10px;
          white-space: nowrap;
          height: 30px;
          justify-content: space-between;
        }
        .sortBtn span { color: #23201d; }
        .viewToggle {
          display: flex;
          align-items: center;
          flex: 0 0 auto;
          padding: 3px;
          border: 1px solid var(--line2);
          background: #fff;
          border-radius: 10px;
          height: 30px;
        }
        .viewToggle button {
          border: none;
          background: transparent;
          width: 24px;
          height: 24px;
          border-radius: 7px;
          color: #6f6961;
          display: grid;
          place-items: center;
        }
        .viewToggle .activeView {
          border: 1px solid var(--accent);
          background: #fff7f3;
          color: var(--accent);
        }
        .contentGrid {
          flex: 1 1 auto;
          display: grid;
          grid-template-columns: minmax(0,1fr) 280px;
          gap: 12px;
          padding-top: 4px;
          padding-bottom: 12px;
          min-height: 0;
        }
        .contentGrid > section, .contentGrid > aside { min-height: 0; overflow-y: auto; }
        .contentGrid h2 {
          margin: 0 0 6px;
          font-size: 16px;
          line-height: 1.1;
          letter-spacing: -.05em;
          font-weight: 700;
          font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif;
        }
        .politicianGrid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 6px; }
        .card {
          display: block;
          background: #fff;
          border: 1px solid #ddd5ca;
          border-radius: 12px;
          padding: 8px 10px 8px;
          box-shadow: 0 1px 0 rgba(0,0,0,.03);
        }
        .cardTop { display: flex; gap: 8px; align-items: flex-start; }
        .avatarBox {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--sand);
          color: #8a847d;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
        }
        .name { font-size: 13px; line-height: 1; letter-spacing: -.04em; font-weight: 700; color: #1d1915; margin-top: 1px; }
        .subText { margin-top: 1px; color: #67615a; font-size: 10px; }
        .promises { margin-top: 6px; font-size: 10px; color: #49443f; }
        .progress { margin-top: 4px; height: 6px; background: var(--sand2); border-radius: 999px; overflow: hidden; display: flex; }
        .progressKept { background: #68A040; }
        .progressBroken { background: #C85030; }
        .progressPending { background: #B0A080; }
        .statsRow { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 2px; margin-top: 6px; text-align: center; }
        .statKept, .statBroken, .statPending { font-size: 10px; font-weight: 700; }
        .statKept { color: #68A040; }
        .statBroken { color: #C85030; }
        .statPending { color: #B0A080; }
        .statLabel { color: #6d6760; font-size: 9px; margin-top: 0px; }
        .loadMoreWrap { display: flex; justify-content: center; margin-top: 4px; }
        .loadMoreBtn { padding: 6px 12px; color: #3f3a35; font-size: 11px; }
        .sidebarCard {
          box-sizing: border-box;
          width: 100%;
          height: auto;
          min-height: 0;
          align-self: start;
          background: #fff;
          border: 1px solid #ddd5ca;
          border-radius: 12px;
          padding: 8px 10px;
          box-shadow: 0 1px 0 rgba(0,0,0,.03);
          display: flex;
          flex-direction: column;
        }
        .sidebarHeader { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .sidebarTitle { display: flex; align-items: center; gap: 6px; }
        .sidebarTitle h3 {
          margin: 0;
          font-size: 14px;
          line-height: 1.1;
          letter-spacing: -.04em;
          font-weight: 700;
          font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif;
        }
        .trending { font-size: 10px; color: #7a746d; }
        .brokenList { display: flex; flex-direction: column; flex: 0 0 auto; min-height: 0; }
        .brokenItem { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-top: 1px solid #ebe5db; }
        .brokenItem:first-child { border-top: none; padding-top: 4px; }
        .brokenLeft { display: flex; align-items: center; gap: 6px; min-width: 0; }
        .rank { width: 12px; text-align: center; color: #716b64; font-size: 10px; flex: 0 0 auto; }
        .brokenRight { text-align: right; flex: 0 0 auto; }
        .brokenPct { font-size: 14px; color: var(--accent); line-height: 1; font-weight: 800; }
        .brokenLabel { margin-top: 0px; font-size: 9px; color: #726d67; }
        .viewListBtn {
          width: 100%;
          box-sizing: border-box;
          margin-top: 6px;
          padding: 6px 10px;
          color: var(--accent);
          background: #fcfbf8;
          font-size: 11px;
          white-space: nowrap;
        }
        .pageShell { padding: 16px 0 12px; overflow-y: auto; max-height: calc(100vh - 120px); }
        .pageIntro { display: grid; gap: 4px; margin-bottom: 12px; }
        .eyebrow { text-transform: uppercase; letter-spacing: .18em; font-size: 10px; color: #8a847d; }
        .pageTitle { margin: 0; font-size: 28px; line-height: 1; letter-spacing: -.05em; font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif; }
        .pageText { max-width: 720px; color: #4f4a44; font-size: 12px; line-height: 1.4; }
        .pageCards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
        .cardClickable { transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease; }
        .cardClickable:hover { border-color: rgba(211, 92, 41, 0.55); box-shadow: 0 10px 24px rgba(0,0,0,.05); transform: translateY(-1px); }
        .politiciansPage { padding-bottom: 18px; }
        .politicianLayoutWrap {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          gap: 10px;
          align-items: start;
        }
        .politicianListOnly {
          display: block;
        }
        .politicianListOnly .politicianIndexPanel {
          width: 100%;
        }
        .politicianIndexPanel {
          background: transparent;
          min-height: 0;
        }
        .politicianIndexPanel h2 {
          margin: 0 0 8px;
          font-size: 16px;
          line-height: 1.1;
          letter-spacing: -.05em;
          font-weight: 700;
          font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif;
        }
        .politicianGridCompact { grid-template-columns: 1fr; }
        .politicianLayout {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
          gap: 10px;
          min-height: 0;
        }
        .politicianLeftPanel, .politicianRightPanel {
          background: #fff;
          border: 1px solid #ddd5ca;
          border-radius: 12px;
          box-shadow: 0 1px 0 rgba(0,0,0,.03);
          padding: 12px;
          min-height: 0;
        }
        .backLink {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 0;
          background: transparent;
          color: #605b55;
          font-size: 11px;
          font-weight: 600;
          padding: 8px 0;
          margin-bottom: 0px;
          margin-top: 0px;
          line-height: 1;
          height: auto;
        }
        .profileHeader {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .profileAvatar {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: var(--sand);
          display: grid;
          place-items: center;
          color: #8a847d;
          flex: 0 0 auto;
        }
        .profileCopy h2 {
          margin: 0;
          font-size: 20px;
          line-height: 1;
          letter-spacing: -.05em;
          font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif;
        }
        .profileNameRow {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .profileBadge {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: #f5e6dc;
          color: var(--accent);
          display: inline-grid;
          place-items: center;
        }
        .profileRole { margin-top: 3px; color: #4f4a44; font-size: 12px; }
        .profileMeta { margin-top: 2px; color: #6c665f; font-size: 11px; }
        .detailStats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .detailProgress { margin-top: 10px; }
        .detailProgressLabels {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-top: 6px;
          color: #6b665f;
          font-size: 10px;
        }
        .detailProgressLabels span { display: inline-flex; align-items: center; gap: 5px; }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          display: inline-block;
        }
        .dotKept { background: #68A040; }
        .dotBroken { background: #C85030; }
        .dotPending { background: #B0A080; }
        .sectionLabel {
          margin-top: 12px;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: .16em;
          font-size: 9px;
          font-weight: 700;
          font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif;
          color: #8a847d;
        }
        .promiseList {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
          overflow-y: auto;
          padding-right: 4px;
        }
        .promiseItem {
          width: 100%;
          border: 1px solid #e3dbd1;
          background: #fcfbf8;
          border-radius: 12px;
          padding: 9px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          text-align: left;
        }
        .promiseItem.activePromise {
          border-color: rgba(211, 92, 41, 0.55);
          background: #fff7f3;
        }
        .promiseItemBody { flex: 1 1 auto; min-width: 0; }
        .promiseItemTitle { font-size: 12px; line-height: 1.2; font-weight: 700; font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif; color: #1d1915; }
        .promiseItemMeta { margin-top: 2px; font-size: 10px; font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #6d6760; }
        .statusPill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 4px 8px;
          font-size: 10px;
          font-weight: 700;
          font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          letter-spacing: .01em;
          flex: 0 0 auto;
        }
        .statusKept { background: rgba(104, 160, 64, 0.15); color: #68A040; }
        .statusBroken { background: rgba(200, 80, 48, 0.15); color: #C85030; }
        .statusPending { background: rgba(176, 160, 128, 0.15); color: #B0A080; }
        .statusDot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          flex: 0 0 auto;
        }
        .statusDot.statusKept { background: #68A040; }
        .statusDot.statusBroken { background: #C85030; }
        .statusDot.statusPending { background: #B0A080; }
        .promiseDetailCard {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .promiseDetailTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .promiseDetailDate { font-size: 11px; font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #6b665f; }
        .promiseDetailTitle {
          margin: 8px 0 6px;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -.03em;
          font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif;
        }
        .promiseDetailMetaRow {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 14px;
          color: #665f57;
          font-size: 11px;
          font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          border-bottom: 1px solid #ece6dc;
          padding-bottom: 10px;
        }
        .promiseDetailMetaRow span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .promiseSection { padding-top: 10px; }
        .promiseSectionTitle {
          margin-bottom: 4px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif;
          color: #322d28;
          text-transform: uppercase;
          letter-spacing: .12em;
        }
        .promiseSection p {
          margin: 0;
          color: #4f4a44;
          font-size: 12px;
          font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.55;
        }
        .sourceList {
          margin: 0;
          padding-left: 18px;
          color: #4f4a44;
          font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .sourceList li { margin: 0 0 6px; }
        .sourceList a {
          color: #1f1b17;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-size: 12px;
          font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .evidenceGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .evidenceCard {
          border: 1px solid #e5ddd2;
          border-radius: 12px;
          background: #fcfbf8;
          padding: 10px;
        }
        .evidenceThumb {
          width: 100%;
          height: 110px;
          border-radius: 10px;
          background: linear-gradient(135deg, #efe7da, #f8f4ee);
          display: grid;
          place-items: center;
          color: #948b80;
          margin-bottom: 8px;
        }
        .evidenceTitle { font-size: 12px; font-weight: 700; font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif; color: #1d1915; }
        .evidenceMeta { margin-top: 2px; font-size: 10px; font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #6d6760; }
        .emptyEvidence { color: #6b665f; font-size: 12px; background: #fcfbf8; border: 1px dashed #e1d9ce; border-radius: 12px; padding: 12px; }
        .emptyDetailCard {
          height: 100%;
          border: 1px dashed #dfd7cc;
          border-radius: 12px;
          background: #fcfbf8;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .emptyDetailCard h3 {
          margin: 4px 0 6px;
          font-size: 18px;
          line-height: 1.1;
          letter-spacing: -.04em;
          font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif;
        }
        .emptyDetailCard p {
          margin: 0;
          color: #5d5851;
          font-size: 12px;
          line-height: 1.5;
        }
        .profileContainer { width: 100%; margin: 0; padding: 16px 0; flex: 1 1 auto; overflow-y: auto; max-height: calc(100vh - 120px); }
        .profileHeaderMetricsRow { display: flex; gap: 12px; margin: 2px 0 8px 0; }
        .profileHeaderBox { display: flex; align-items: center; gap: 12px; padding: 16px; background: #fff; border: 1px solid var(--line2); border-radius: 12px; box-shadow: 0 1px 0 rgba(0,0,0,.03); flex: 1; }
        .metricsBox { display: flex; flex-direction: column; gap: 12px; padding: 12px; background: #fff; border: 1px solid var(--line2); border-radius: 12px; box-shadow: 0 1px 0 rgba(0,0,0,.03); flex: 1; }
        .metricsRow { display: flex; gap: 8px; justify-content: space-around; }
        .progressBarInline { display: flex; flex-direction: column; gap: 6px; padding-top: 8px; border-top: 1px solid var(--line2); }
        .metricsCompact { display: flex; gap: 8px; }
        .metricSmall { display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f9f8f5; border: 1px solid #ede6db; border-radius: 8px; padding: 8px 12px; min-width: 70px; }
        .metricSmallValue { font-size: 16px; font-weight: 700; font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif; color: #1d1915; line-height: 1; }
        .metricSmallLabel { font-size: 9px; font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #67615a; margin-top: 4px; text-align: center; }
        .profileName { display: flex; align-items: center; gap: 6px; margin-bottom: 2px; }
        .profileName h2 { margin: 0; font-size: 14px; font-weight: 700; font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif; color: #1d1915; letter-spacing: -0.02em; }
        .profileInfo { flex: 1; font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .profileRole { font-size: 10px; font-weight: 600; font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1d1915; margin-bottom: 2px; }
        .profileRegion { font-size: 9px; font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #67615a; }
        .profileAvatar { width: 48px; height: 48px; border-radius: 8px; background: var(--sand); color: #8a847d; display: grid; place-items: center; flex: 0 0 auto; font-size: 20px; font-weight: 700; }
        .navTabs { display: flex; gap: 0; border-bottom: 1px solid var(--line); overflow-x: auto; margin-bottom: 8px; }
        .navTab { padding: 12px 20px; font-size: 14px; font-weight: 600; font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: transparent; border: none; cursor: pointer; color: var(--muted); border-bottom: 2px solid transparent; transition: all 0.2s; white-space: nowrap; }
        .navTab.active { color: var(--text); border-bottom-color: var(--accent); }
        .navTab:hover { background: rgba(0,0,0,.02); }
        .tabContent { padding: 8px 0; }
        .layoutGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; padding: 0 0 12px; height: calc(100vh - 300px); min-height: 400px; }
        .layoutLeft { display: flex; flex-direction: column; gap: 10px; }
        .layoutRight { display: flex; flex-direction: column; overflow-y: auto; max-height: calc(100vh - 300px); }
        .progressBar { padding: 10px; background: #fff; border: 1px solid var(--line2); border-radius: 12px; box-shadow: 0 1px 0 rgba(0,0,0,.03); margin-bottom: 10px; }
        .progressBarFill { height: 6px; background: var(--sand2); border-radius: 999px; overflow: hidden; display: flex; }
        .progressKept { background: #68A040; }
        .progressBroken { background: #C85030; }
        .progressPending { background: #B0A080; }
        .progressLegend { margin-top: 8px; display: flex; gap: 12px; font-size: 11px; }
        .legendItem { display: flex; align-items: center; gap: 4px; }
        .legendColor { display: inline-block; width: 8px; height: 8px; border-radius: 50%; }
        .reportCard { display: none; background: #fff; border: 1px solid var(--line2); border-radius: 12px; padding: 12px; box-shadow: 0 1px 0 rgba(0,0,0,.03); text-align: center; margin-top: auto; font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .reportCardTitle { font-size: 14px; font-weight: 700; font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif; margin-bottom: 12px; color: var(--text); }
        .reportCardBtn { background: var(--accent); color: white; border: none; border-radius: 8px; padding: 12px 24px; font-size: 14px; font-weight: 700; font-family: 'Anthropic Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; cursor: pointer; width: 100%; transition: background 0.2s; }
        .reportCardBtn:hover { background: #b84920; }
        .pageCard { background: #fff; border: 1px solid #ddd5ca; border-radius: 12px; padding: 10px; box-shadow: 0 1px 0 rgba(0,0,0,.03); }
        .pageCard h3 { margin: 0 0 4px; font-size: 13px; line-height: 1.15; letter-spacing: -.03em; }
        .pageCard p { margin: 0; color: #555049; font-size: 11px; line-height: 1.4; }
        .filterSelect {
          border: 1px solid var(--line2);
          background: #fff;
          border-radius: 12px;
          padding: 6px 10px;
          color: #3a3732;
          font-size: 11px;
          line-height: 1;
          height: 30px;
          min-width: 160px;
          cursor: pointer;
          font-family: inherit;
        }
        .filterSelect:focus {
          outline: none;
          border-color: var(--accent);
        }
        .promiseGridCard {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #ddd5ca;
          border-radius: 12px;
          padding: 14px;
          box-shadow: 0 1px 0 rgba(0,0,0,.03);
          cursor: pointer;
          transition: border-color .18s ease, box-shadow .18s ease, transform .18s ease;
          text-align: left;
        }
        .promiseGridCard:hover {
          border-color: rgba(211, 92, 41, 0.55);
          box-shadow: 0 10px 24px rgba(0,0,0,.05);
          transform: translateY(-1px);
        }
        .promiseGridCardTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .promiseCardTitle {
          font-size: 13px;
          font-weight: 700;
          font-family: 'Anthropic Serif', Georgia, 'Times New Roman', serif;
          color: #1d1915;
          line-height: 1.25;
        }
        .promiseCardPolitician {
          font-size: 11px;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 4px;
        }
        .promiseCardMeta {
          font-size: 10px;
          color: #6d6760;
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #f4efe6;
          padding-top: 8px;
        }
        @media (min-width: 1200px) {
          html, body, #root {
            height: 100vh;
            overflow: hidden;
          }
          .page {
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
          }
          .scaledApp {
            display: flex;
            flex-direction: column;
            min-height: auto;
          }
          .topbar {
            flex: 0 0 auto;
          }
          .hero {
            flex: 0 0 auto;
          }
          .container.filterRow {
            flex: 0 0 auto;
          }
          .contentGrid {
            flex: 1 1 auto;
            min-height: 0;
          }
          .contentGrid > section {
            overflow-y: auto;
            scrollbar-width: thin;
            padding-right: 6px;
          }
          .contentGrid > aside {
            overflow-y: auto;
            scrollbar-width: thin;
          }
        }
        @media (max-width: 1200px) {
          body { overflow: auto; }
          .page { height: auto; min-height: 100vh; overflow: visible; }
          .nav { display: flex; }
          .heroGrid, .contentGrid, .politicianLayoutWrap, .politicianLayout { grid-template-columns: 1fr; }
          .layoutGrid { grid-template-columns: 1fr; }
          .filters { grid-template-columns: 1fr; width: 100%; }
          .filterRow { flex-direction: column; align-items: stretch; }
          .sortBlock { justify-content: space-between; }
          .politicianGrid, .politicianGridCompact { grid-template-columns: repeat(2,minmax(0,1fr)); }
        }
        .heroMetricsMobile { display: none; }
        @media (max-width: 768px) {
          .page { height: auto; min-height: 100vh; min-height: 100dvh; overflow-x: hidden; }
          .container { width: min(100% - 24px, 1450px); }
          .topbarInner { height: auto; padding: 12px 0; flex-wrap: wrap; }
          .logo { font-size: 28px; }
          .topActions { width: 100%; justify-content: space-between; flex-wrap: wrap; }
          .heroGrid { padding: 12px 0 8px; min-height: auto; gap: 4px; }
          .heroTitle { white-space: normal; height: 66px; min-height: 66px; font-size: 28px; line-height: 1.15; margin: 0 0 4px; }
          .typingText { white-space: pre-line; word-break: break-word; min-height: 66px; line-height: 1.15; }
          .heroLeft h1 { font-size: 28px; }
          .heroLeft p { font-size: 12px; margin-top: 4px; }
          .heroRight { display: none; }
          .heroMetricsMobile { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-top: 2px; }
          .heroMetricsMobile .metric { min-height: 62px; padding: 6px 6px; }
          .heroMetricsMobile .metricIcon { width: 28px; height: 28px; margin-bottom: 4px; }
          .heroMetricsMobile .metricValue { font-size: 18px; }
          .heroMetricsMobile .metricLabel { font-size: 9px; line-height: 1.2; }
          .searchBar { flex-direction: row; align-items: center; gap: 6px; padding: 4px; }
          .searchBtn { width: auto; }
          .contentGrid { display: flex; flex-direction: column; gap: 16px; }
          .contentGrid > aside { order: -1; }
          .contentGrid > section { order: 0; }
          .politicianGrid { grid-template-columns: 1fr; gap: 10px; }
          .sidebarCard { margin-top: 8px; }
          .filterRow { flex-direction: column; align-items: stretch; gap: 10px; }
          .filters { grid-template-columns: 1fr; }
          .filters[style] { display: grid !important; grid-template-columns: 1fr !important; }
          .filterPill { min-width: 0; width: 100%; justify-content: flex-start; min-height: 36px; }
          .sortBlock { flex: 0 0 auto; width: 100%; max-width: 100%; justify-content: space-between; }
          .sortBtn { max-width: 100%; min-height: auto; min-width: auto; }
          .viewToggle button { min-height: 24px; min-width: 24px; }
          .navTab, .promiseItem, .backLink { min-height: auto; min-width: auto; }
          .pageCards { grid-template-columns: 1fr; gap: 10px; }
          .pageTitle { font-size: 22px; }
          .profileContainer { padding: 12px 0; max-height: none; overflow: visible; }
          .profileHeaderMetricsRow { flex-direction: column; gap: 8px; }
          .profileHeaderBox { padding: 12px; }
          .metricsBox { padding: 10px; }
          .metricsRow { flex-wrap: wrap; gap: 6px; }
          .metricSmall { min-width: 60px; padding: 6px 8px; }
          .navTabs { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .navTabs::-webkit-scrollbar { display: none; }
          .navTab { padding: 10px 14px; font-size: 13px; }
          .layoutGrid { grid-template-columns: 1fr; height: auto; min-height: auto; }
          .layoutLeft { gap: 8px; }
          .layoutRight { max-height: none; }
          .politicianLayoutWrap { grid-template-columns: 1fr; }
          .politicianLayout { grid-template-columns: 1fr; }
          .politicianGridCompact { grid-template-columns: 1fr !important; }
          .promiseDetailTitle { font-size: 16px; }
          .promisesPageGrid { grid-template-columns: 1fr !important; }
          .evidenceGrid { grid-template-columns: 1fr; }
          .brokenItem { gap: 8px; padding: 8px 0; }
          .brokenLeft { min-width: 0; flex: 1; }
          .brokenLeft .name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .detailStats { grid-template-columns: 1fr; }
          .reportCard { display: block; margin-top: 12px; }
          .aboutSection { padding: 20px !important; margin-bottom: 16px !important; }
          .aboutMissionTitle { font-size: 24px !important; }
          .aboutSectionTitle { font-size: 20px !important; }
          .aboutWhyGrid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 480px) {
          .container { width: calc(100% - 16px); }
          .heroGrid { padding: 8px 0 4px; }
          .heroLeft h1 { font-size: 28px; letter-spacing: -0.05em; }
          .heroLeft p { font-size: 11px; margin-top: 2px; }
          .heroMetricsMobile { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
          .heroMetricsMobile .metric { min-height: 72px; flex-direction: column; text-align: center; display: flex; align-items: center; justify-content: center; padding: 8px 4px; }
          .heroMetricsMobile .metricIcon { width: 24px; height: 24px; margin: 0 auto 4px; flex-shrink: 0; }
          .heroMetricsMobile .metricValue { font-size: 16px; }
          .heroMetricsMobile .metricLabel { font-size: 8px; line-height: 1.1; }
          .progressLegend { flex-wrap: wrap; gap: 8px; }
          .aboutSection { padding: 16px !important; }
          .aboutMissionTitle { font-size: 20px !important; }
          .card { padding: 8px; border-radius: 10px; }
          .cardTop { gap: 6px; }
          .avatarBox { width: 30px; height: 30px; border-radius: 6px; }
          .name { font-size: 12px; }
          .statsRow { gap: 0; margin-top: 4px; }
          .profileHeaderBox { gap: 8px; }
          .profileAvatar { width: 40px; height: 40px; font-size: 16px; }
          .profileName h2 { font-size: 13px; }
          .navTab { padding: 8px 10px; font-size: 12px; }
          .metricSmallValue { font-size: 14px; }
          .metricSmallLabel { font-size: 8px; }
          .promiseItem { padding: 7px 8px; gap: 6px; }
          .promiseItemTitle { font-size: 11px; }
          .promiseItemMeta { font-size: 9px; }
          .promiseDetailCard { padding: 12px; }
          .promiseDetailTitle { font-size: 14px; }
          .promiseSectionTitle { font-size: 10px; }
          .promiseSection p { font-size: 11px; }
          .sourceList a { font-size: 11px; }
          .backLink { font-size: 10px; padding: 6px 0; }
          .pageShell { max-height: none; overflow: visible; padding: 12px 0; }
          .pageTitle { font-size: 20px; }
          .pageCard { padding: 8px; }
          .pageCard h3 { font-size: 12px; }
          .pageCard p { font-size: 10px; }
          .filterSelect { min-width: 100%; font-size: 10px; }
          .promiseGridCard { padding: 10px; }
          .promiseCardTitle { font-size: 12px; }
          .promiseCardMeta { font-size: 9px; }
          .filterRow { flex-direction: row !important; align-items: center !important; justify-content: flex-start !important; gap: 8px !important; padding-bottom: 12px !important; overflow-x: auto !important; scrollbar-width: none !important; -webkit-overflow-scrolling: touch !important; width: 100% !important; }
          .filterRow::-webkit-scrollbar { display: none !important; }
          .filters { display: flex !important; flex-direction: row !important; gap: 8px !important; flex-shrink: 0 !important; }
          .filters[style] { display: flex !important; flex-direction: row !important; gap: 8px !important; flex-shrink: 0 !important; }
          .filterPill { min-width: auto !important; width: auto !important; font-size: 11px !important; padding: 6px 10px !important; min-height: 32px !important; height: 32px !important; white-space: nowrap !important; display: inline-flex !important; align-items: center !important; gap: 4px !important; flex-shrink: 0 !important; }
          .sortBlock { display: flex !important; flex-direction: row !important; align-items: center !important; gap: 8px !important; max-width: none !important; width: auto !important; flex-shrink: 0 !important; }
          .sortBtn { min-width: auto !important; width: auto !important; font-size: 11px !important; padding: 6px 10px !important; min-height: 32px !important; height: 32px !important; white-space: nowrap !important; display: inline-flex !important; align-items: center !important; gap: 4px !important; flex-shrink: 0 !important; }
          .viewToggle { display: none !important; }
          .desktopLabel, .sortLabelDesktop { display: none !important; }
          .mobileLabel, .sortLabelMobile { display: inline !important; }
        }
      `}</style>

      <div className="scaledApp">
        {activePage === 'dashboard' ? (
          <>
            <section className="hero">
              <div className="container heroGrid">
                <div className="heroLeft">
                  <TypingHeadline />
                  <p>Manifesto is a non-partisan platform tracking whether politicians keep their campaign promises.</p>
                  <div className="searchBar">
                    <div className="searchInput"><Icon name="search" size={14} /><span>Search for a politician by name...</span></div>
                    <button className="searchBtn" type="button">Search</button>
                  </div>
                  <div className="heroMetricsMobile">
                    <Metric icon="file" value="664" label="Promises tracked" />
                    <Metric icon="users" value="6" label="Politicians tracked" />
                    <Metric icon="trend" value="1,520" label="Citizens engaged" />
                  </div>
                </div>
                <div className="heroRight">
                  <div className="metrics">
                    <Metric icon="file" value="664" label="Promises tracked" />
                    <div className="divider" />
                    <Metric icon="users" value="6" label="Politicians tracked" />
                    <div className="divider" />
                    <Metric icon="trend" value="1,520" label="Citizens engaged" />
                  </div>
                </div>
              </div>
            </section>

            <section className="container filterRow">
              <div className="filters">
                <FilterPill icon="map" label="All Regions" mobileLabel="Region" />
                <FilterPill icon="users" label="All Parties" mobileLabel="Parties" />
                <FilterPill icon="list" label="All Promise Categories" mobileLabel="Categories" />
              </div>
              <div className="sortBlock">
                <button className="sortBtn" type="button">
                  <span className="sortLabelDesktop">Sort by: <span>Overall Progress</span></span>
                  <span className="sortLabelMobile">Sort</span>
                  <span className="chevron">⌄</span>
                </button>
                <div className="viewToggle">
                  <button className="activeView" type="button"><Icon name="grid" size={14} /></button>
                  <button type="button"><Icon name="list" size={14} /></button>
                </div>
              </div>
            </section>

            <main className="container contentGrid">
              <section>
                <h2>All Politicians</h2>
                <div className="politicianGrid">{politicians.map((item) => <PoliticianCard key={item.name} item={item} onSelect={openPoliticianPage} />)}</div>
              </section>
              <aside>
                <div className="sidebarCard">
                  <div className="sidebarHeader"><div className="sidebarTitle"><Icon name="alert" size={14} /><h3>Most Broken Promises</h3></div></div>
                  <div className="brokenList">{brokenPromises.map(([name, region, pct], index) => <div key={name} className="brokenItem"><div className="brokenLeft"><div className="rank">{index + 1}</div><div className="avatarBox" style={{ width: 32, height: 32, borderRadius: 8 }}><Icon name="avatar" size={16} /></div><div><div className="name" style={{ fontSize: 13 }}>{name}</div><div className="subText">{region}</div></div></div><div className="brokenRight"><div className="brokenPct">{pct}</div><div className="brokenLabel">broken</div></div></div>)}</div>
                </div>
              </aside>
            </main>
          </>
        ) : activePage === 'politicians' ? (
          <main className="container pageShell politiciansPage">
            {selectedPolitician ? (
              <PoliticianDetailPage
                politician={selectedPolitician}
                selectedPromiseId={selectedPromiseId}
                onSelectPromise={setSelectedPromiseId}
                onBack={goBackToPoliticians}
              />
            ) : (
              <>
                <div className="pageIntro">
                  <h2 className="pageTitle">Politicians</h2>
                </div>

                <section className="politicianIndexPanel">
                  <div className="politicianGrid politicianGridCompact">
                    {politicians.map((item) => (
                      <PoliticianCard key={item.name} item={item} onSelect={openPoliticianPage} />
                    ))}
                  </div>
                </section>
              </>
            )}
          </main>
        ) : activePage === 'reports' ? (
          <Reports />
        ) : activePage === 'about' ? (
          <main className="container pageShell">
            <div className="pageIntro">
              <h2 className="pageTitle">About</h2>
            </div>

            {/* Section 1: Our Mission - Hero */}
            <section className="aboutSection" style={{ background: "#fff", border: "1px solid #ddd5ca", borderRadius: "12px", padding: "32px", marginBottom: "24px", boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}>
              <div style={{ maxWidth: "680px" }}>
                <h2 className="aboutMissionTitle" style={{ margin: "0 0 16px 0", fontSize: "32px", fontWeight: 700, fontFamily: "'Anthropic Serif', Georgia, serif", color: "#1c1a17", lineHeight: 1.1, letterSpacing: "-.05em" }}>
                  Our Mission
                </h2>
                <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#4f4a44", lineHeight: 1.6, fontFamily: "'Anthropic Sans', system-ui, sans-serif" }}>
                  Manifesto is a non-partisan civic platform dedicated to tracking whether Indonesian politicians keep the promises they make during campaigns. We believe that transparent, verifiable promise tracking strengthens democracy and holds elected officials accountable to their constituents.
                </p>
                <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#4f4a44", lineHeight: 1.6, fontFamily: "'Anthropic Sans', system-ui, sans-serif" }}>
                  By combining public records, community reports, and systematic verification, we create a single source of truth for political accountability. Citizens deserve to know who keeps their word.
                </p>
              </div>

              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginTop: "28px" }}>
                <div style={{ background: "#fcfbf8", border: "1px solid #eee6dc", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--accent)", marginBottom: "4px" }}>6</div>
                  <div style={{ fontSize: "10px", color: "#6d6760", fontWeight: 600, lineHeight: 1.3 }}>Tracked Politicians</div>
                </div>
                <div style={{ background: "#fcfbf8", border: "1px solid #eee6dc", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "#68A040", marginBottom: "4px" }}>700+</div>
                  <div style={{ fontSize: "10px", color: "#6d6760", fontWeight: 600, lineHeight: 1.3 }}>Total Campaign Promises</div>
                </div>
                <div style={{ background: "#fcfbf8", border: "1px solid #eee6dc", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "#d35c29", marginBottom: "4px" }}>54%</div>
                  <div style={{ fontSize: "10px", color: "#6d6760", fontWeight: 600, lineHeight: 1.3 }}>Fulfillment Rate (Kept)</div>
                </div>
                <div style={{ background: "#fcfbf8", border: "1px solid #eee6dc", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", fontWeight: 800, color: "#1c1a17", marginBottom: "4px" }}>1800+</div>
                  <div style={{ fontSize: "10px", color: "#6d6760", fontWeight: 600, lineHeight: 1.3 }}>Community Reports</div>
                </div>
              </div>
            </section>

            {/* Section 2: How We Work */}
            <section className="aboutSection" style={{ background: "#fff", border: "1px solid #ddd5ca", borderRadius: "12px", padding: "32px", marginBottom: "24px", boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}>
              <h2 className="aboutSectionTitle" style={{ margin: "0 0 24px 0", fontSize: "24px", fontWeight: 700, fontFamily: "'Anthropic Serif', Georgia, serif", color: "#1c1a17", letterSpacing: "-.05em" }}>
                How We Work
              </h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                  <div style={{ width: "40px", height: "40px", background: "var(--sand)", borderRadius: "8px", display: "grid", placeItems: "center", fontSize: "18px", fontWeight: 700, color: "var(--accent)" }}>
                    1
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "13px", fontWeight: 700, fontFamily: "'Anthropic Serif', Georgia, serif", color: "#1c1a17" }}>
                      Collect Promises
                    </h3>
                    <p style={{ margin: 0, fontSize: "11px", color: "#6a645d", lineHeight: 1.4 }}>
                      We gather campaign promises from public records, official statements, and verified sources.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                  <div style={{ width: "40px", height: "40px", background: "var(--sand)", borderRadius: "8px", display: "grid", placeItems: "center", fontSize: "18px", fontWeight: 700, color: "var(--accent)" }}>
                    2
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "13px", fontWeight: 700, fontFamily: "'Anthropic Serif', Georgia, serif", color: "#1c1a17" }}>
                      Verify Progress
                    </h3>
                    <p style={{ margin: 0, fontSize: "11px", color: "#6a645d", lineHeight: 1.4 }}>
                      We track implementation using government data, news reports, and citizen submissions.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                  <div style={{ width: "40px", height: "40px", background: "var(--sand)", borderRadius: "8px", display: "grid", placeItems: "center", fontSize: "18px", fontWeight: 700, color: "var(--accent)" }}>
                    3
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "13px", fontWeight: 700, fontFamily: "'Anthropic Serif', Georgia, serif", color: "#1c1a17" }}>
                      Evaluate Status
                    </h3>
                    <p style={{ margin: 0, fontSize: "11px", color: "#6a645d", lineHeight: 1.4 }}>
                      We assign clear statuses: Kept, Broken, Pending, or In Review based on evidence.
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                  <div style={{ width: "40px", height: "40px", background: "var(--sand)", borderRadius: "8px", display: "grid", placeItems: "center", fontSize: "18px", fontWeight: 700, color: "var(--accent)" }}>
                    4
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 6px 0", fontSize: "13px", fontWeight: 700, fontFamily: "'Anthropic Serif', Georgia, serif", color: "#1c1a17" }}>
                      Report Findings
                    </h3>
                    <p style={{ margin: 0, fontSize: "11px", color: "#6a645d", lineHeight: 1.4 }}>
                      We publish accessible reports and welcome community feedback for continuous improvement.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Why It Matters */}
            <section className="aboutSection" style={{ background: "#fff", border: "1px solid #ddd5ca", borderRadius: "12px", padding: "32px", marginBottom: "24px", boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}>
              <h2 className="aboutSectionTitle" style={{ margin: "0 0 24px 0", fontSize: "24px", fontWeight: 700, fontFamily: "'Anthropic Serif', Georgia, serif", color: "#1c1a17", letterSpacing: "-.05em" }}>
                Why It Matters
              </h2>
              
              <div className="aboutWhyGrid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: 700, color: "#1c1a17" }}>
                    ✓ Strengthen Accountability
                  </h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#6a645d", lineHeight: 1.5 }}>
                    When politicians know their promises are tracked and verified, they're more likely to prioritize and deliver on their commitments.
                  </p>
                </div>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: 700, color: "#1c1a17" }}>
                    ✓ Empower Citizens
                  </h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#6a645d", lineHeight: 1.5 }}>
                    Citizens deserve transparent, factual information about whether their representatives keep their word. This knowledge enables informed voting.
                  </p>
                </div>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: 700, color: "#1c1a17" }}>
                    ✓ Reduce Misinformation
                  </h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#6a645d", lineHeight: 1.5 }}>
                    By publishing verifiable evidence and supporting documentation, we counter false narratives with facts.
                  </p>
                </div>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: 700, color: "#1c1a17" }}>
                    ✓ Build Democratic Trust
                  </h3>
                  <p style={{ margin: 0, fontSize: "12px", color: "#6a645d", lineHeight: 1.5 }}>
                    Systematic accountability strengthens public confidence in democratic institutions and political processes.
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div style={{ background: "var(--sand)", border: "1px solid #e6dccd", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
                <p style={{ margin: "0 0 12px 0", fontSize: "13px", fontWeight: 700, color: "#1c1a17", fontFamily: "'Anthropic Serif', Georgia, serif" }}>
                  Join the movement for political accountability
                </p>
                <p style={{ margin: 0, fontSize: "12px", color: "#6a645d", lineHeight: 1.5 }}>
                  Have a tip about a promise? Submit an anonymous report to help us track fulfillment more accurately.
                </p>
              </div>
            </section>
          </main>
        ) : (
          <main className="container pageShell">
            <div className="pageIntro">
              <h2 className="pageTitle">{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h2>
            </div>
            
            {activePage === "promises" ? (
              <>

                {/* Filter bar */}
                <section className="filterRow" style={{ padding: 0, marginBottom: "16px" }}>
                  <div className="filters" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <select
                      className="filterSelect"
                      value={promiseStatusFilter}
                      onChange={(e) => setPromiseStatusFilter(e.target.value)}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Kept">Kept</option>
                      <option value="Broken">Broken</option>
                      <option value="Pending">Pending</option>
                    </select>

                    <select
                      className="filterSelect"
                      value={promiseCategoryFilter}
                      onChange={(e) => setPromiseCategoryFilter(e.target.value)}
                    >
                      <option value="All">All Categories</option>
                      {uniqueCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>

                    <select
                      className="filterSelect"
                      value={promisePoliticianFilter}
                      onChange={(e) => setPromisePoliticianFilter(e.target.value)}
                    >
                      <option value="All">All Politicians</option>
                      {uniquePoliticians.map(name => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>
                </section>

                {/* Grid list of promises */}
                <div className="promisesPageGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "12px", marginTop: "16px", paddingBottom: "24px" }}>
                  {filteredPromises.map((promise) => (
                    <div
                      key={`${promise.politician.name}-${promise.id}`}
                      className="promiseGridCard"
                      onClick={() => openPromiseDetail(promise.politician.name, promise.id)}
                    >
                      <div className="promiseGridCardTop">
                        <span className={`statusPill status${promise.status}`}>{promise.status}</span>
                        <span style={{ fontSize: "10px", color: "#6d6760" }}>{promise.date}</span>
                      </div>
                      <h3 className="promiseCardTitle" style={{ margin: "4px 0 8px 0" }}>{promise.title}</h3>
                      <div className="promiseCardPolitician">{promise.politician.name}</div>
                      <div style={{ fontSize: "11px", color: "#665f57", marginBottom: "8px", lineHeight: 1.4 }}>
                        {promise.description.length > 120 ? `${promise.description.substring(0, 120)}...` : promise.description}
                      </div>
                      <div className="promiseCardMeta">
                        <span>{promise.category}</span>
                        <span>{promise.politician.region}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : activePage === "insights" ? (
              <>
                <div className="insightsGrid" style={{ display: "flex", flexDirection: "column", gap: "24px", paddingBottom: "24px" }}>
                  {/* Section 1: Trend Analysis */}
                  <section style={{ background: "#fff", border: "1px solid #ddd5ca", borderRadius: "12px", padding: "16px", boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}>
                    <div style={{ fontFamily: "'Anthropic Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 700, color: "#1c1a17", marginBottom: "4px" }}>Trend Analysis</div>
                    <div style={{ fontSize: "11px", color: "#6a645d", marginBottom: "16px" }}>Fulfillment rate of campaign promises over the years (2022 - 2026)</div>
                    
                    {/* SVG Chart */}
                    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
                      <svg viewBox="0 0 500 220" style={{ width: "100%", height: "auto", overflow: "visible" }}>
                        {/* Horizontal Grid lines */}
                        <line x1="50" y1="20" x2="450" y2="20" stroke="#f0eae1" strokeDasharray="3 3" />
                        <text x="40" y="24" fontSize="9" fill="#8a847d" textAnchor="end">100%</text>

                        <line x1="50" y1="65" x2="450" y2="65" stroke="#f0eae1" strokeDasharray="3 3" />
                        <text x="40" y="69" fontSize="9" fill="#8a847d" textAnchor="end">75%</text>

                        <line x1="50" y1="110" x2="450" y2="110" stroke="#f0eae1" strokeDasharray="3 3" />
                        <text x="40" y="114" fontSize="9" fill="#8a847d" textAnchor="end">50%</text>

                        <line x1="50" y1="155" x2="450" y2="155" stroke="#f0eae1" strokeDasharray="3 3" />
                        <text x="40" y="159" fontSize="9" fill="#8a847d" textAnchor="end">25%</text>

                        <line x1="50" y1="200" x2="450" y2="200" stroke="#ded7cd" />

                        {/* X-axis labels */}
                        <text x="50" y="215" fontSize="10" fill="#6a645d" textAnchor="middle">2022</text>
                        <text x="150" y="215" fontSize="10" fill="#6a645d" textAnchor="middle">2023</text>
                        <text x="250" y="215" fontSize="10" fill="#6a645d" textAnchor="middle">2024</text>
                        <text x="350" y="215" fontSize="10" fill="#6a645d" textAnchor="middle">2025</text>
                        <text x="450" y="215" fontSize="10" fill="#6a645d" textAnchor="middle">2026</text>

                        {/* Chart Line - Kept (Green #68A040) */}
                        <path
                          d="M 50 164 L 150 137 L 250 124 L 350 113 L 450 102"
                          fill="none"
                          stroke="#68A040"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="50" cy="164" r="4" fill="#68A040" />
                        <circle cx="150" cy="137" r="4" fill="#68A040" />
                        <circle cx="250" cy="124" r="4" fill="#68A040" />
                        <circle cx="350" cy="113" r="4" fill="#68A040" />
                        <circle cx="450" cy="102" r="4" fill="#68A040" />

                        {/* Chart Line - Broken (Red #C85030) */}
                        <path
                          d="M 50 182 L 150 167 L 250 149 L 350 137 L 450 131"
                          fill="none"
                          stroke="#C85030"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="50" cy="182" r="4" fill="#C85030" />
                        <circle cx="150" cy="167" r="4" fill="#C85030" />
                        <circle cx="250" cy="149" r="4" fill="#C85030" />
                        <circle cx="350" cy="137" r="4" fill="#C85030" />
                        <circle cx="450" cy="131" r="4" fill="#C85030" />

                        {/* Chart Line - Pending (Beige #B0A080) */}
                        <path
                          d="M 50 74 L 150 115 L 250 146 L 350 169 L 450 185"
                          fill="none"
                          stroke="#B0A080"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="50" cy="74" r="4" fill="#B0A080" />
                        <circle cx="150" cy="115" r="4" fill="#B0A080" />
                        <circle cx="250" cy="146" r="4" fill="#B0A080" />
                        <circle cx="350" cy="169" r="4" fill="#B0A080" />
                        <circle cx="450" cy="185" r="4" fill="#B0A080" />
                      </svg>
                    </div>

                    {/* Chart Legend */}
                    <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "12px", flexWrap: "wrap" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px" }}>
                        <span style={{ display: "inline-block", width: "12px", height: "4px", background: "#68A040", borderRadius: "2px" }} />
                        Kept (Fulfillment up to 54%)
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px" }}>
                        <span style={{ display: "inline-block", width: "12px", height: "4px", background: "#C85030", borderRadius: "2px" }} />
                        Broken (Fulfillment at 38%)
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px" }}>
                        <span style={{ display: "inline-block", width: "12px", height: "4px", background: "#B0A080", borderRadius: "2px" }} />
                        Pending (Remaining 8%)
                      </span>
                    </div>
                  </section>

                  {/* Section 2: Citizen Signals */}
                  <section style={{ background: "#fff", border: "1px solid #ddd5ca", borderRadius: "12px", padding: "16px", boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}>
                    <div style={{ fontFamily: "'Anthropic Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 700, color: "#1c1a17", marginBottom: "4px" }}>Citizen Signals</div>
                    <div style={{ fontSize: "11px", color: "#6a645d", marginBottom: "16px" }}>Public report activity, trust feedback volume, and active regions</div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                      {/* Left: Stats Column */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center" }}>
                        <div style={{ background: "#fcfbf8", border: "1px solid #eee6dc", borderRadius: "8px", padding: "10px" }}>
                          <div style={{ fontSize: "18px", fontWeight: 800, color: "var(--accent)" }}>1,842</div>
                          <div style={{ fontSize: "10px", color: "#6d6760", fontWeight: 600 }}>Total Anonymous Reports Submitted</div>
                        </div>
                        <div style={{ background: "#fcfbf8", border: "1px solid #eee6dc", borderRadius: "8px", padding: "10px" }}>
                          <div style={{ fontSize: "18px", fontWeight: 800, color: "#1c1a17" }}>92.4%</div>
                          <div style={{ fontSize: "10px", color: "#6d6760", fontWeight: 600 }}>Evidence Verification Rate</div>
                        </div>
                        <div style={{ background: "#fcfbf8", border: "1px solid #eee6dc", borderRadius: "8px", padding: "10px" }}>
                          <div style={{ fontSize: "12px", fontWeight: 700, color: "#1c1a17" }}>"Rehabilitasi Hutan Lindung"</div>
                          <div style={{ fontSize: "10px", color: "#6d6760" }}>Most Reported & Disputed Promise (142 updates)</div>
                        </div>
                      </div>

                      {/* Right: Bar Chart Column */}
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#6c665f", marginBottom: "8px" }}>Report Volume by Region</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {[
                            { name: "Jawa Tengah", percent: 34 },
                            { name: "Jawa Barat", percent: 28 },
                            { name: "Jawa Timur", percent: 20 },
                            { name: "Sumatra Utara", percent: 12 },
                            { name: "Yogyakarta", percent: 6 }
                          ].map(r => (
                            <div key={r.name} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ width: "80px", fontSize: "10px", color: "#6a645d", textAlign: "right", whiteSpace: "nowrap" }}>{r.name}</div>
                              <div style={{ flex: 1, height: "10px", background: "var(--sand)", borderRadius: "999px", overflow: "hidden" }}>
                                <div style={{ width: `${r.percent}%`, height: "100%", background: "var(--accent)", borderRadius: "999px" }} />
                              </div>
                              <div style={{ width: "30px", fontSize: "10px", fontWeight: 700, color: "#1f1b17" }}>{r.percent}%</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Section 3: Impact Highlights */}
                  <section style={{ background: "#fff", border: "1px solid #ddd5ca", borderRadius: "12px", padding: "16px", boxShadow: "0 1px 0 rgba(0,0,0,.03)" }}>
                    <div style={{ fontFamily: "'Anthropic Sans', system-ui, sans-serif", fontSize: "14px", fontWeight: 700, color: "#1c1a17", marginBottom: "4px" }}>Impact Highlights</div>
                    <div style={{ fontSize: "11px", color: "#6a645d", marginBottom: "16px" }}>Key accountability metrics and outstanding region comparisons</div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                      <div style={{ border: "1px solid #e5ddd2", borderRadius: "12px", background: "#fcfbf8", padding: "14px" }}>
                        <div style={{ fontSize: "20px", marginBottom: "6px" }}>🏆</div>
                        <div style={{ fontSize: "13px", fontWeight: 700, fontFamily: "'Anthropic Serif', Georgia, serif", color: "#1c1a17" }}>Rina Wulandari</div>
                        <div style={{ fontSize: "10px", color: "#6d6760", marginTop: "2px" }}>Highest Kept Promise Rate (41% Kept)</div>
                      </div>
                      <div style={{ border: "1px solid #e5ddd2", borderRadius: "12px", background: "#fcfbf8", padding: "14px" }}>
                        <div style={{ fontSize: "20px", marginBottom: "6px" }}>⚠️</div>
                        <div style={{ fontSize: "13px", fontWeight: 700, fontFamily: "'Anthropic Serif', Georgia, serif", color: "#C85030" }}>Infrastruktur</div>
                        <div style={{ fontSize: "10px", color: "#6d6760", marginTop: "2px" }}>Most Broken Promise Category (48% Broken)</div>
                      </div>
                      <div style={{ border: "1px solid #e5ddd2", borderRadius: "12px", background: "#fcfbf8", padding: "14px" }}>
                        <div style={{ fontSize: "20px", marginBottom: "6px" }}>⏳</div>
                        <div style={{ fontSize: "13px", fontWeight: 700, fontFamily: "'Anthropic Serif', Georgia, serif", color: "#B0A080" }}>Lingkungan Hidup</div>
                        <div style={{ fontSize: "10px", color: "#6d6760", marginTop: "2px" }}>Highest Delayed/Pending Category (44% Pending)</div>
                      </div>
                      <div style={{ border: "1px solid #e5ddd2", borderRadius: "12px", background: "#fcfbf8", padding: "14px" }}>
                        <div style={{ fontSize: "20px", marginBottom: "6px" }}>📍</div>
                        <div style={{ fontSize: "13px", fontWeight: 700, fontFamily: "'Anthropic Serif', Georgia, serif", color: "#68A040" }}>Yogyakarta</div>
                        <div style={{ fontSize: "10px", color: "#6d6760", marginTop: "2px" }}>Highest Regional Accountability Average (46% Kept)</div>
                      </div>
                    </div>
                  </section>
                </div>
              </>
            ) : (
              <div className="pageCards">
                {currentCards.map((card) => (
                  <article key={card.title} className="pageCard">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                ))}
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
