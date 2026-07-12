"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const BRAND_SCROLL = [0, 300] as const;

function brandProgressFromScroll(y: number) {
  const t = (y - BRAND_SCROLL[0]) / (BRAND_SCROLL[1] - BRAND_SCROLL[0]);
  return Math.min(1, Math.max(0, t));
}

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLAnchorElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    const brand = brandRef.current;
    if (!nav || !brand) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let brandCurrent = 0;
    let brandTarget = 0;
    let brandRaf = 0;

    function applyBrandProgress(p: number) {
      brand!.style.setProperty("--brand-p", String(p));
    }

    function stepBrand() {
      if (reduced) {
        brandCurrent = brandTarget;
      } else {
        brandCurrent += (brandTarget - brandCurrent) * 0.12;
      }
      applyBrandProgress(brandCurrent);
      if (!reduced && Math.abs(brandTarget - brandCurrent) > 0.0005) {
        brandRaf = requestAnimationFrame(stepBrand);
      } else {
        brandCurrent = brandTarget;
        applyBrandProgress(brandCurrent);
        brandRaf = 0;
      }
    }

    function onScroll() {
      nav!.classList.toggle("scrolled", scrollY > 12);
      brandTarget = brandProgressFromScroll(scrollY);
      if (reduced) {
        brandCurrent = brandTarget;
        applyBrandProgress(brandCurrent);
      } else if (!brandRaf) {
        brandRaf = requestAnimationFrame(stepBrand);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (brandRaf) cancelAnimationFrame(brandRaf);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav id="nav" ref={navRef} aria-label="Ana menü">
      <div className="nav-inner">
        <Link href="/" className="logo" id="brand" ref={brandRef} aria-label="Quontive">
          <span className="brand-stack" aria-hidden="true">
            <span className="brand-word">
              <span className="bq">Q</span>
              <span className="bl" style={{ "--st": 0.48 } as React.CSSProperties}>u</span>
              <span className="bl" style={{ "--st": 0.4 } as React.CSSProperties}>o</span>
              <span className="bl" style={{ "--st": 0.32 } as React.CSSProperties}>n</span>
              <span className="bl" style={{ "--st": 0.24 } as React.CSSProperties}>t</span>
              <span className="bl" style={{ "--st": 0.16 } as React.CSSProperties}>i</span>
              <span className="bl" style={{ "--st": 0.08 } as React.CSSProperties}>v</span>
              <span className="bl" style={{ "--st": 0 } as React.CSSProperties}>e</span>
            </span>
            <span className="brand-mark">
              <svg viewBox="0 0 104 104" xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision">
                <defs>
                  <mask id="q-cut-n">
                    <rect width="104" height="104" fill="#fff" />
                    <polygon points="40,58 73,58 133,118 100,118" fill="#000" />
                  </mask>
                </defs>
                <circle cx="52" cy="52" r="43" fill="none" stroke="currentColor" strokeWidth="14" mask="url(#q-cut-n)" />
                <polygon points="48,66 65,66 101,100 84,100" fill="currentColor" />
              </svg>
            </span>
          </span>
        </Link>
        <div
          className={`nav-links${menuOpen ? " open" : ""}`}
          id="navLinks"
          ref={navLinksRef}
        >
          <Link href="/#neden-biz" onClick={closeMenu}>Neden Biz</Link>
          <Link href="/#kabiliyetler" onClick={closeMenu}>Kabiliyetler</Link>
          <Link href="/#yayincilarimiz" onClick={closeMenu}>Markalar</Link>
          <Link href="/#surec" onClick={closeMenu}>Süreç</Link>
          <Link href="/#contact" onClick={closeMenu}>İletişim</Link>
          <Link href="/#contact" onClick={closeMenu} className="nav-mobile-only">Yayıncı</Link>
          <Link href="/#contact" onClick={closeMenu} className="nav-mobile-only">Reklamveren</Link>
        </div>
        <div className="nav-sub">
          <Link href="/#contact">Yayıncı</Link>
          <Link href="/#contact">Reklamveren</Link>
        </div>
        <button
          className="menu-btn"
          id="menuBtn"
          aria-label="Menü"
          aria-expanded={menuOpen}
          aria-controls="navLinks"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
