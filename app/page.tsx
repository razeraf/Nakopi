"use client";

import { useState, useEffect, type CSSProperties } from "react";

// ─── Color tokens ───────────────────────────────────────────────────────────
const colors = {
  primary: "#271310",
  onPrimary: "#ffffff",
  primaryContainer: "#3e2723",
  primaryFixed: "#ffdad4",
  primaryFixedDim: "#e3beb8",
  onPrimaryContainer: "#ae8d87",
  secondary: "#75584d",
  secondaryContainer: "#fed7ca",
  onSecondaryContainer: "#795c51",
  surface: "#fef9f2",
  surfaceContainer: "#f2ede6",
  surfaceContainerLow: "#f8f3ec",
  surfaceContainerHigh: "#ece7e1",
  surfaceTint: "#745853",
  onSurface: "#1d1c18",
  onSurfaceVariant: "#504442",
  outline: "#827472",
  outlineVariant: "#d3c3c0",
  tertiaryFixed: "#c5f093",
  onTertiaryFixed: "#0f2000",
  tertiary: "#0d1c00",
  tertiaryContainer: "#1b3300",
  onTertiaryContainer: "#79a04d",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const coffees = [
  {
    name: "Arabika",
    img: "https://raw.githubusercontent.com/razeraf/Nakopi/main/Arabika.jpg",
    link: "https://pesan.kopipurwokerto.com/",
    desc: "Menawarkan profil rasa yang kaya dengan aroma bunga dan buah-buahan. Memiliki tingkat keasaman yang menyegarkan namun tetap lembut di lidah.",
    description: "Menawarkan profil rasa yang kaya dengan aroma bunga dan buah-buahan. Memiliki tingkat keasaman yang menyegarkan namun tetap lembut di lidah.",
    origin: "Aromatic & Complex",
    tag: "Single Origin",
    offset: true,
  },
  {
    name: "Excelsa",
    img: "https://raw.githubusercontent.com/razeraf/Nakopi/main/Excelsa.jpg",
    link: "https://pesan.kopipurwokerto.com/",
    desc: "Varian langka dengan perpaduan rasa yang unik; kombinasi antara rasa buah yang tajam (tart) dengan kedalaman rasa kacang-kacangan yang smoky.",
    description: "Varian langka dengan perpaduan rasa yang unik; kombinasi antara rasa buah yang tajam (tart) dengan kedalaman rasa kacang-kacangan yang smoky.",
    origin: "Unique & Exotic",
    tag: "Aromatic",
    offset: false,
  },
  {
    name: "Robusta",
    img: "https://raw.githubusercontent.com/razeraf/Nakopi/main/Robusta.png",
    link: "https://pesan.kopipurwokerto.com/",
    desc: "Memiliki body yang tebal dengan sentuhan rasa cokelat hitam yang kuat dan tingkat keasaman yang sangat rendah. Cocok untuk Anda yang menyukai kopi dengan tendangan kafein tinggi.",
    description: "Memiliki body yang tebal dengan sentuhan rasa cokelat hitam yang kuat dan tingkat keasaman yang sangat rendah. Cocok untuk Anda yang menyukai kopi dengan tendangan kafein tinggi.",
    origin: "Bold & Earthy",
    tag: "Bold Roast",
    offset: true,
  },
  {
    name: "House Blend",
    img: "https://raw.githubusercontent.com/razeraf/Nakopi/main/belnd.jpg",
    link: "https://pesan.kopipurwokerto.com/",
    desc: "Racikan rahasia yang menyeimbangkan karakter sweetness Arabika dan strength Robusta. Sangat serbaguna, enak dinikmati sebagai kopi hitam maupun dengan susu.",
    description: "Racikan rahasia yang menyeimbangkan karakter sweetness Arabika dan strength Robusta. Sangat serbaguna, enak dinikmati sebagai kopi hitam maupun dengan susu.",
    origin: "Perfectly Balanced",
    tag: "Best Seller",
    offset: false,
  },
  {
    name: "Espresso",
    img: "https://raw.githubusercontent.com/razeraf/Nakopi/main/Espresso.png",
    link: "https://pesan.kopipurwokerto.com/",
    desc: "Ekstrak kopi murni yang intens dan praktis. Solusi tepat untuk stok di rumah; tinggal campur dengan susu, air, atau sirup favorit Anda untuk kualitas kafe setiap saat.",
    description: "Ekstrak kopi murni yang intens dan praktis. Solusi tepat untuk stok di rumah; tinggal campur dengan susu, air, atau sirup favorit Anda untuk kualitas kafe setiap saat.",
    origin: "Ready to Mix",
    tag: "Espresso",
    offset: true,
  },
];

const ethos = [
  {
    num: "01",
    title: "Jasa Roasting",
    tag: "ARTISANAL",
    img: "https://raw.githubusercontent.com/razeraf/Nakopi/main/roasting.webp",
    body: "Layanan sangrai biji kopi mentah (green bean) dengan pengaturan profil roasting yang disesuaikan, sehingga menghasilkan cita rasa, aroma, dan tingkat kematangan yang optimal sesuai kebutuhan.",
  },
  {
    num: "02",
    title: "Jasa Sangrai Kopi",
    tag: "CONSISTENT",
    img: "https://raw.githubusercontent.com/razeraf/Nakopi/main/sangrai.jpg",
    body: "Solusi roasting kopi yang mudah dijangkau dengan proses yang efisien, menjaga konsistensi kualitas agar setiap batch kopi tetap memiliki rasa yang stabil.",
  },
  {
    num: "03",
    title: "Jasa Giling Kopi",
    tag: "PRECISION",
    img: "https://raw.githubusercontent.com/razeraf/Nakopi/main/giling%20kopi.jpeg",
    body: "Layanan penggilingan biji kopi menjadi bubuk dengan berbagai tingkat kehalusan, mulai dari kasar hingga halus, menyesuaikan dengan metode seduh seperti tubruk, pour over, hingga espresso.",
  },
  {
    num: "04",
    title: "Kopi Dripbag dan Kopi Sachet",
    tag: "PRACTICAL",
    img: "https://raw.githubusercontent.com/razeraf/Nakopi/main/dripbag.png",
    body: "Produk kopi praktis siap seduh yang dirancang untuk kemudahan, tetap menjaga kualitas rasa sehingga bisa dinikmati kapan saja tanpa memerlukan alat seduh khusus.",
  },
  {
    num: "05",
    title: "Tempat Ngopi Enak Purwokerto",
    tag: "COZY SPACE",
    img: "https://raw.githubusercontent.com/razeraf/Nakopi/main/hdtempat.jpg",
    body: "Tempat yang nyaman untuk menikmati kopi dengan suasana santai, didukung pilihan menu kopi dan non-kopi yang beragam serta cocok untuk bersantai maupun bekerja.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Page() {
  const [activeNav, setActiveNav] = useState("home");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [activeEthos, setActiveEthos] = useState(ethos[0]);

  // ─── SCROLL SPY LOGIC ───
  useEffect(() => {
    const sections = ["home", "biji-kopi", "layanan", "nobi"];
    
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Biar ganti menu pas section sudah lewat dikit
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Carousel: hitung posisi relatif tiap item terhadap activeIndex
  const getItemStyle = (index: number): CSSProperties => {
    const total = coffees.length;
    let diff = index - activeIndex;
    // Wrap around agar selalu ambil jalur terdekat
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return {
        transform: "translate(-50%, -50%) translateX(0px) scale(1)",
        zIndex: 10,
        filter: "blur(0px)",
        opacity: 1,
        pointerEvents: "auto",
      };
    } else if (diff === -1) {
      return {
        transform: "translate(-50%, -50%) translateX(-420px) scale(0.78)",
        zIndex: 7,
        filter: "blur(3px)",
        opacity: 0.65,
        pointerEvents: "auto",
      };
    } else if (diff === 1) {
      return {
        transform: "translate(-50%, -50%) translateX(420px) scale(0.78)",
        zIndex: 7,
        filter: "blur(3px)",
        opacity: 0.65,
        pointerEvents: "auto",
      };
    } else if (diff === -2 || diff === total - 2) {
      return {
        transform: "translate(-50%, -50%) translateX(-600px) scale(0.56)",
        zIndex: 4,
        filter: "blur(7px)",
        opacity: 0.35,
        pointerEvents: "auto",
      };
    } else if (diff === 2 || diff === -(total - 2)) {
      return {
        transform: "translate(-50%, -50%) translateX(600px) scale(0.56)",
        zIndex: 4,
        filter: "blur(7px)",
        opacity: 0.35,
        pointerEvents: "auto",
      };
    } else {
      return {
        transform: "translate(-50%, -50%) translateX(0px) scale(0.3)",
        zIndex: 1,
        filter: "blur(12px)",
        opacity: 0,
        pointerEvents: "none",
      };
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + coffees.length) % coffees.length);
  };
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % coffees.length);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;0,800;1,400;1,700;1,800&family=Manrope:wght@300;400;500;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: ${colors.surface};
          font-family: 'Manrope', sans-serif;
          color: ${colors.onSurface};
        }

        .font-headline { font-family: 'Noto Serif', serif; }
        .font-body     { font-family: 'Manrope', sans-serif; }
        .font-label    { font-family: 'Manrope', sans-serif; }

        /* ── CAROUSEL ── */
        .carousel-section {
          position: relative;
          width: 100%;
          height: 750px;
          overflow: hidden;
          perspective: 1200px;
        }
        .carousel-item {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 500px;
          transition: transform 0.55s cubic-bezier(0.4,0,0.2,1),
                      filter 0.55s ease,
                      opacity 0.55s ease;
          cursor: pointer;
          user-select: none;
          text-align: center;
        }
        .carousel-img {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          display: block;
        }
        .carousel-info {
          margin-top: 20px;
          transition: opacity 0.35s ease;
        }
        .carousel-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 20;
          background: rgba(39,19,16,0.85);
          color: #fff;
          border: none;
          border-radius: 9999px;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.4rem;
          transition: background 0.2s, transform 0.2s;
          backdrop-filter: blur(6px);
        }
        .carousel-nav-btn:hover {
          background: rgba(39,19,16,1);
          transform: translateY(-50%) scale(1.08);
        }
        .carousel-nav-prev { left: 32px; }
        .carousel-nav-next { right: 32px; }
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          padding-bottom: 16px;
        }
        .carousel-dot {
          width: 8px; height: 8px;
          border-radius: 9999px;
          background: ${colors.outlineVariant};
          border: none;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
        }
        .carousel-dot.active {
          background: ${colors.primary};
          transform: scale(1.4);
        }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-size: 24px;
          line-height: 1;
          display: inline-block;
          vertical-align: middle;
          user-select: none;
        }

        /* Nav */
        .nav-wrapper {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 50;
          background: rgba(254,249,242,0.80);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .nav-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 60px;
          max-width: none;
          width: 100%;
          margin: 0;
        }
        .nav-logo {
          font-family: 'Noto Serif', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: ${colors.primary};
          letter-spacing: -0.02em;
        }
        .nav-links {
          display: flex;
          gap: 40px;
          font-family: 'Noto Serif', serif;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .nav-link {
          position: relative;
          text-decoration: none;
          color: #504442;
          padding: 5px 0;
          transition: color 0.3s;
        }
        .nav-link.active {
          color: #271310;
          font-weight: bold;
        }
        .nav-link.active::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: #271310;
        }
        html { scroll-behavior: smooth; }
        .nav-link {
          text-decoration: none;
          color: rgba(39,19,16,0.60);
          transition: color 0.3s;
        }
        .nav-link:hover { color: ${colors.primary}; }
        .nav-link.active {
          color: ${colors.primary};
          border-bottom: 2px solid ${colors.primary};
          padding-bottom: 4px;
        }
        .nav-actions { display: flex; align-items: center; gap: 24px; }
        .nav-btn-icon {
          background: none;
          border: none;
          cursor: pointer;
          color: ${colors.primary};
          font-size: 1.5rem;
        }
        .avatar {
          width: 40px; height: 40px;
          border-radius: 9999px;
          overflow: hidden;
          background: ${colors.surfaceContainer};
        }
        .avatar img { width: 100%; height: 100%; object-fit: cover; }

        /* Hero */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 0;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-bg img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            ${colors.surface} 0%,
            ${colors.surface} 2%,
            rgba(254, 249, 242, 0.7) 55%,
            transparent 90%
          );
        }
        .hero-inner {
          position: relative;
          z-index: 10;
          padding: 0 80px;
          max-width: none;
          width: 100%;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          align-items: center;
        }
        .hero-content {
          max-width: 600px;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px;
          background: ${colors.tertiaryFixed};
          color: ${colors.onTertiaryFixed};
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 9999px;
          margin-bottom: 32px;
        }
        .badge-dot {
          width: 8px; height: 8px;
          border-radius: 9999px;
          background: ${colors.tertiary};
        }
        .hero-headline {
          font-family: 'Noto Serif', serif;
          font-size: clamp(4rem, 9vw, 7.5rem);
          font-weight: 800;
          color: ${colors.primary};
          line-height: 0.85;
          letter-spacing: -0.04em;
          margin-bottom: 40px;
          font-style: italic;
          white-space: nowrap;
        }
        .hero-sub {
          font-size: 1.15rem;
          color: ${colors.onSurfaceVariant};
          max-width: 480px;
          margin-bottom: 48px;
          line-height: 1.6;
        }
        .hero-cta { display: flex; flex-wrap: wrap; gap: 24px; align-items: center; }
        .btn-primary {
          background: ${colors.primary};
          color: ${colors.onPrimary};
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          padding: 20px 40px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s;
          font-size: 0.9rem;
          letter-spacing: 0.03em;
        }
        .btn-primary:hover {
          background: ${colors.primaryContainer};
          transform: scale(1.05);
        }
        .btn-ghost {
          background: none;
          border: none;
          border-bottom: 2px solid rgba(116,88,83,0.3);
          color: ${colors.primary};
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          padding: 10px 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: border-color 0.3s;
          font-size: 0.9rem;
        }
        .btn-ghost:hover { border-color: ${colors.surfaceTint}; }
        .btn-ghost .arrow { transition: transform 0.2s; }
        .btn-ghost:hover .arrow { transform: translateX(4px); }

        /* Collection */
        .collection-section {
          padding: 128px 48px;
          max-width: none;
          margin: 0 auto;
        }
        .collection-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 80px;
          gap: 32px;
        }
        .collection-title {
          font-family: 'Noto Serif', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: ${colors.primary};
          margin-bottom: 24px;
        }
        .collection-sub {
          font-size: 1.1rem;
          color: ${colors.onSurfaceVariant};
          font-style: italic;
        }
        .vol-label {
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: ${colors.outline};
          white-space: nowrap;
        }

        /* Carousel card info styles */
        .origin-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          background: ${colors.secondaryContainer};
          color: ${colors.onSecondaryContainer};
          border-radius: 9999px;
          font-size: 0.625rem;
          font-weight: 700;
          font-family: 'Manrope', sans-serif;
          margin-bottom: 10px;
        }
        .origin-dot {
          width: 4px; height: 4px;
          border-radius: 9999px;
          background: ${colors.tertiary};
        }
        .coffee-name {
          font-family: 'Noto Serif', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: ${colors.primary};
          margin-bottom: 10px;
        }
        .coffee-desc {
          color: ${colors.onSurfaceVariant};
          font-size: 0.875rem;
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .btn-shop {
          background: none;
          border: none;
          border-bottom: 1px solid ${colors.outlineVariant};
          color: ${colors.primary};
          font-family: 'Manrope', sans-serif;
          font-size: 0.875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding-bottom: 8px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .btn-shop:hover { color: ${colors.surfaceTint}; }

        /* Ethos Section */
        .ethos-section {
          background: ${colors.surfaceContainer};
          padding: 128px 48px;
          overflow: hidden;
        }
        .ethos-inner {
          max-width: none;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 96px;
          align-items: center;
        }
        .ethos-img-wrap {
          position: relative;
        }
        .ethos-img-box {
          position: relative;
          z-index: 10;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 1/1;
          transform: rotate(3deg) scale(0.95);
          box-shadow: 0 25px 60px rgba(0,0,0,0.25);
          transition: transform 0.5s ease;
        }
        .ethos-img-box:hover { transform: rotate(0deg) scale(0.95); }
        .ethos-img-box img { width: 100%; height: 100%; object-fit: cover; }
        .ethos-blob-1 {
          position: absolute;
          top: -48px; left: -48px;
          width: 256px; height: 256px;
          background: rgba(255,219,206,0.30);
          border-radius: 9999px;
          filter: blur(48px);
        }
        .ethos-blob-2 {
          position: absolute;
          bottom: -48px; right: -48px;
          width: 256px; height: 256px;
          background: rgba(197,240,147,0.20);
          border-radius: 9999px;
          filter: blur(48px);
        }
        .ethos-word {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Noto Serif', serif;
          font-size: 15rem;
          color: rgba(39,19,16,0.05);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }
        .ethos-content { padding-left: 48px; }
        .ethos-title {
          font-family: 'Noto Serif', serif;
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 700;
          color: ${colors.primary};
          margin-bottom: 40px;
          line-height: 1.1;
        }
        .ethos-list { display: flex; flex-direction: column; gap: 48px; }
        .ethos-item { display: flex; gap: 24px; }
        .ethos-num {
          font-family: 'Noto Serif', serif;
          font-size: 1.875rem;
          color: ${colors.outlineVariant};
          font-style: italic;
          flex-shrink: 0;
        }
        .ethos-item-title {
          font-family: 'Noto Serif', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: ${colors.primary};
          margin-bottom: 12px;
        }
        .ethos-item-body {
          color: ${colors.onSurfaceVariant};
          line-height: 1.7;
        }

        /* Subscribe Section */
        .subscribe-section {
          padding: 160px 48px;
          background: ${colors.surface};
        }
        .subscribe-card {
          max-width: 1100px;
          margin: 0 auto;
          background: #271310;
          padding: 100px 48px;
          border-radius: 40px;
          position: relative;
          overflow: hidden;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.15);
        }
        .subscribe-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(62, 39, 35, 0.4), transparent);
          pointer-events: none;
        }
        .subscribe-inner { position: relative; z-index: 10; }
        .subscribe-eyebrow {
          font-family: 'Manrope', sans-serif;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          letter-spacing: 0.4em;
          margin-bottom: 24px;
          display: block;
        }
        .subscribe-title {
          font-family: 'Noto Serif', serif;
          font-size: 3.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 32px;
          letter-spacing: -0.02em;
        }
        .subscribe-body {
          color: rgba(255,255,255,0.7);
          margin-bottom: 56px;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
          font-size: 1.05rem;
        }
        .subscribe-form {
          display: flex;
          gap: 12px;
          max-width: 680px;
          margin: 0 auto 40px;
          align-items: center;
        }
        .subscribe-input {
          flex: 1;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.2);
          color: #ffffff;
          font-family: 'Manrope', sans-serif;
          font-size: 0.9rem;
          padding: 20px 24px;
          outline: none;
          border-radius: 4px;
          transition: border-color 0.3s;
        }
        .subscribe-input::placeholder { color: rgba(255,255,255,0.25); }
        .subscribe-input:focus { border-color: rgba(255,255,255,0.6); }

        .btn-subscribe {
          background: #ffffff;
          color: #271310;
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          padding: 20px 48px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.95rem;
          transition: transform 0.2s, background 0.3s;
          white-space: nowrap;
        }
        .btn-subscribe:hover {
          background: #f2ede6;
          transform: translateY(-2px);
        }
        .subscribe-fine {
          font-size: 0.65rem;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        /* Footer */
        .footer {
          background: ${colors.surfaceContainer};
          padding: 120px 48px 48px;
        }
        .footer-inner {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          max-width: none;
          margin: 0 auto;
        }
        .footer-brand {
          font-family: 'Noto Serif', serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: ${colors.primary};
          margin-bottom: 24px;
        }
        .footer-tagline {
          color: rgba(39,19,16,0.70);
          font-size: 0.875rem;
          line-height: 1.6;
          max-width: 280px;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 16px;
          font-family: 'Manrope', sans-serif;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .footer-link {
          color: rgba(39,19,16,0.70);
          text-decoration: none;
          transition: text-decoration 0.2s;
        }
        .footer-link:hover { text-decoration: underline; text-decoration-color: ${colors.outlineVariant}; }
        .footer-social {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 32px;
        }
        .footer-icons { display: flex; gap: 24px; }
        .footer-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: ${colors.primary};
          opacity: 0.80;
          transition: opacity 0.3s;
        }
        .footer-icon-btn:hover { opacity: 1; }
        .footer-copy {
          color: rgba(39,19,16,0.70);
          font-family: 'Manrope', sans-serif;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: right;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .nav-inner { padding: 20px 24px; }
          .hero-inner { padding: 0 24px; }
          .ethos-inner { grid-template-columns: 1fr; }
          .ethos-content { padding-left: 0; }
          .ethos-word { display: none; }
          .footer-inner { grid-template-columns: 1fr; }
          .footer-social { align-items: flex-start; }
          .footer-copy { text-align: left; }
          .subscribe-card { padding: 48px 24px; }
          .collection-section { padding: 64px 24px; }
          .ethos-section { padding: 64px 24px; }
          .subscribe-section { padding: 64px 24px; }
          .footer { padding: 64px 24px 32px; }
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hero-headline { font-size: 2.5rem; }
          .collection-header { flex-direction: column; align-items: flex-start; }
          .carousel-item { width: 200px; }
          .carousel-nav-prev { left: 8px; }
          .carousel-nav-next { right: 8px; }
          .carousel-item { width: 85vw; /* Di HP hampir menuhin lebar layar */}
          .carousel-section {height: 650px;
        }
}
        }
      `}</style>

      <nav className="nav-wrapper">
        <div className="nav-inner">
          <div className="flex items-center gap-4">
            <img src="https://raw.githubusercontent.com/razeraf/Nakopi/main/20260416_100148_0000.png"
              alt="Logo" className="w-12 h-12 object-contain" />
            <div className="nav-logo">Nakopi</div>
          </div>

          <div className="nav-links">
            {['home', 'biji-kopi', 'layanan', 'nobi'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`nav-link ${activeNav === item ? 'active' : ''}`}
                onClick={() => setActiveNav(item)}
                style={{ textTransform: 'capitalize' }}
              >
                {item.replace('-', ' ')}
              </a>
            ))}
          </div>

          <div className="w-12 md:block hidden"></div>
        </div>
      </nav>

      <main>
        {/* ── Hero ── */}
        <section id="home" className="hero-section">
          <div className="hero-bg">
            <img
              src="https://raw.githubusercontent.com/razeraf/Nakopi/main/gambaratas.jpg"
              alt="Hero background"
            />
            <div className="hero-overlay" />
          </div>
          <div className="hero-inner">
            <div className="hero-content">
              <div className="badge">
                <span className="badge-dot" />
                Est. 2019
              </div>
              <h1 className="hero-headline font-headline" style={{ lineHeight: '1' }}>
                Fresh Coffee,<br />
                fresh life!
              </h1>
              <p className="hero-sub font-body">
                Nakopi merupakan Toko Kopi Purwokerto yang menjual biji kopi Indonesia dan kopi bubuk Purwokerto.
                Nakopi juga menjual kopi arabika dan kopi robusta.
                Diantaranya ada jual kopi Gayo, hingga jual kopi Toraja.
              </p>
              <div className="hero-cta">
                <a
                  href="https://pesan.kopipurwokerto.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <button type="button" className="btn-primary font-label cursor-pointer">
                    Beli Sekarang
                  </button>
                </a>
                <a
                  href="https://wa.me/6283863150405" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <button type="button" className="btn-ghost font-label cursor-pointer">
                    Hubungi Kami
                    <span className="material-symbols-outlined arrow" style={{ fontSize: "1rem" }}>
                      arrow_forward
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Collection (CAROUSEL) ── */}
        <section id="biji-kopi" style={{ background: colors.surface }}>
          <div className="collection-section">
            <div className="collection-header">
              <div>
                <h2 className="collection-title font-headline">Jenis Biji Kopi</h2>
                <p className="collection-sub font-body">
                  Nakopi menyediakan berbagai pilihan varietas kopi berkualitas dengan karakter rasa yang beragam untuk memenuhi selera setiap penikmat kopi.
                </p>
              </div>
            </div>

            {/* CAROUSEL 3D */}
            <div style={{ position: 'relative' }}>
              <div 
                className="carousel-section"
                /* ─── Tambahkan Sensor Sentuh di Sini ─── */
                onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
                onTouchMove={(e) => {
                  if (!touchStart) return;
                  const touchDown = e.targetTouches[0].clientX;
                  const diff = touchStart - touchDown;

                  if (diff > 50) { // Geser ke kiri (Next)
                    handleNext();
                    setTouchStart(null);
                  }
                  if (diff < -50) { // Geser ke kanan (Prev)
                    handlePrev();
                    setTouchStart(null);
                  }
                }}
              >
                {/* Tombol Prev */}
                <button
                  className="carousel-nav-btn carousel-nav-prev"
                  onClick={handlePrev}
                  aria-label="Previous"
                >
                  ‹
                </button>

                {/* Sisanya (map coffees) tetap sama di dalam sini... */}

                {coffees.map((c, index) => {
                  const style = getItemStyle(index);
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={c.name}
                      className="carousel-item"
                      style={style}
                      onClick={() => setActiveIndex(index)}
                    >
                      {/* Gambar */}
                      <img
                        src={c.img}
                        alt={c.name}
                        className="carousel-img"
                      />

                      {/* Info — hanya tampil kalau aktif */}
                      <div className="carousel-info" style={{ opacity: isActive ? 1 : 0 }}>
                        <div className="origin-badge">
                          <span className="origin-dot" />
                          {c.origin}
                        </div>
                        <h3 className="coffee-name font-headline">{c.name}</h3>
                        <p className="coffee-desc font-body">{c.description}</p>
                        {/* GANTI BUTTON JADI LINK DI SINI */}
                        <a 
                          href={c.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ textDecoration: 'none' }}
                        >
                          <button 
                            className="btn-shop font-label" 
                            style={{ cursor: 'pointer' }}
                          >
                            Shop Now
                          </button>
                        </a>
                      </div>
                    </div>
                  );
                })}   

                {/* Tombol Next */}
                <button
                  className="carousel-nav-btn carousel-nav-next"
                  onClick={handleNext}
                  aria-label="Next"
                >
                  ›
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="carousel-dots">
                {coffees.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${i === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to ${coffees[i].name}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Ethos ── */}
        <section id="layanan" className="ethos-section">
          <div className="ethos-inner">
            <div className="ethos-img-wrap">
              <div className="ethos-blob-1" />
              <div className="ethos-blob-2" />
              <div className="ethos-word font-headline">SOIL</div>
              
              <div className="ethos-img-box" style={{ position: 'relative' }}>
                {/* Tag Kecil di Pojok Kiri Atas Foto */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  background: 'rgba(255,255,255,0.9)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  color: colors.primary,
                  zIndex: 20,
                  letterSpacing: '0.1em',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}>
                  {activeEthos.tag}
                </div>

                <img
                  src={activeEthos.img}
                  alt={activeEthos.title}
                  style={{ transition: 'opacity 0.5s ease' }}
                />
              </div>
            </div>

            <div className="ethos-content">
              <h2 className="ethos-title font-headline">Layanan Nakopi</h2>
              <div className="ethos-list">
                {ethos.map((item) => (
                  <div 
                    key={item.num} 
                    className="ethos-item"
                    onMouseEnter={() => setActiveEthos(item)} // Ganti foto pas kursor masuk
                    style={{ 
                      cursor: 'pointer',
                      opacity: activeEthos.num === item.num ? 1 : 0.5,
                      transition: 'opacity 0.3s'
                    }}
                  >
                    <span className="ethos-num font-headline">{item.num}</span>
                    <div>
                      <h4 className="ethos-item-title font-headline">{item.title}</h4>
                      <p className="ethos-item-body font-body">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section NOBI ── */}
        <section id="nobi" className="subscribe-section" style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '120px 0',
          background: '#fef9f2'
        }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              opacity: 10
            }}
          >
            <source src="/video-bijkop.mp4" type="video/mp4" />
          </video>

          <div className="subscribe-card" style={{
            position: 'relative',
            zIndex: 10,
            background: '#271310',
            border: 'none',
            boxShadow: '0 0 60px rgba(197, 240, 147, 0.5)'
          }}>
            <div className="subscribe-inner">
              <span className="subscribe-eyebrow font-label">Perkenalkan Teman Baru Admin Nakopi</span>
              <h2 className="subscribe-title font-headline">NOBI</h2>
              <p className="subscribe-body font-body">
                Nobi adalah asisten virtual Nakopi yang membantu kamu memilih biji kopi
                terbaik di Purwokerto dengan mudah dan cepat.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                <a 
                  href="https://api.whatsapp.com/send?phone=6285175395261&text=Halo%20Nobi!%20Saya%20mau%20tanya%20stok%20biji%20kopi%20hari%20ini%20dong%20☕" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none' }}
                >
                  <button 
                    className="btn-subscribe font-label" 
                    style={{ 
                      padding: '20px 60px', 
                      cursor: 'pointer',
                      transition: '0.3s' // Tambahin biar halus pas di-klik
                    }}
                  >
                    CHAT SEKARANG
                  </button>
                </a>
              </div>

              <p className="subscribe-fine font-label">
                KAMU BISA NGOBROL KAPAN SAJA DENGAN NOBI!
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="footer" style={{ padding: '60px 0 30px 0', background: '#f2ede6' }}>
        <div className="footer-inner full-desktop-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '80px' }}>
            <div className="footer-brand font-headline" style={{ margin: '0', fontSize: '1.5rem', fontWeight: 'bold', color: '#271310', lineHeight: '1.2' }}>
              Alamat
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Nakopi+Roastery+Purwokerto"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-tagline font-body"
              style={{
                margin: '4px 0 0 0',
                textDecoration: 'none',
                color: 'rgba(39,19,16,0.6)',
                maxWidth: '400px',
                lineHeight: '1.4',
                display: 'block'
              }}
            >
              Jl. KH Agus Salim (selatan Salsa Snack, sebelah Jet Laundry), Karangpucung, Purwokerto 53142
            </a>
          </div>

          <div className="footer-social" style={{ textAlign: 'right', paddingRight: '80px' }}>
            <div className="footer-copy font-label" style={{ color: 'rgba(39,19,16,0.5)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
              © ARKADIA.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}