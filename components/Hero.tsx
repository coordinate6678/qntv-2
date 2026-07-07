"use client";

import { useEffect, useRef, useState } from "react";

function PartnerBadge({
  src,
  alt,
  width,
  height,
  fallback,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallback: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="badge-fallback">{fallback}</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={() => setFailed(true)}
    />
  );
}

type PathPoint = { x: number; y: number };
type Path = { a: PathPoint; b: PathPoint; c: PathPoint; d: PathPoint };
type Particle = {
  path: Path;
  t: number;
  v: number;
  r: number;
  clay: boolean;
};

function cubic(p: number, a: PathPoint, b: PathPoint, c: PathPoint, d: PathPoint) {
  const m = 1 - p;
  return {
    x: m * m * m * a.x + 3 * m * m * p * b.x + 3 * m * p * p * c.x + p * p * p * d.x,
    y: m * m * m * a.y + 3 * m * m * p * b.y + 3 * m * p * p * c.y + p * p * p * d.y,
  };
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let paths: Path[] = [];
    let particles: Particle[] = [];
    let node = { x: 0, y: 0 };
    let ringT = 0;
    let frameRaf = 0;

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.clientWidth;
      H = canvas!.clientHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = W * 0.87;
      const cy = H * 0.4;
      const n = W < 700 ? 5 : 8;
      paths = [];
      for (let i = 0; i < n; i++) {
        const y0 = H * (0.08 + (0.84 * i) / (n - 1)) + (Math.random() * 40 - 20);
        paths.push({
          a: { x: -40, y: y0 },
          b: { x: W * 0.32, y: y0 + (Math.random() * 80 - 40) },
          c: { x: W * 0.62, y: cy + (y0 - cy) * 0.35 },
          d: { x: cx, y: cy },
        });
      }
      particles = [];
      const per = W < 700 ? 2 : 3;
      paths.forEach((p) => {
        for (let k = 0; k < per; k++) {
          particles.push({
            path: p,
            t: Math.random(),
            v: 0.0016 + Math.random() * 0.0022,
            r: 1.4 + Math.random() * 1.6,
            clay: Math.random() < 0.25,
          });
        }
      });
      node = { x: cx, y: cy };
    }

    function frame() {
      ctx!.clearRect(0, 0, W, H);

      ctx!.lineWidth = 1;
      paths.forEach((p) => {
        ctx!.strokeStyle = "rgba(20,20,19,0.07)";
        ctx!.beginPath();
        ctx!.moveTo(p.a.x, p.a.y);
        ctx!.bezierCurveTo(p.b.x, p.b.y, p.c.x, p.c.y, p.d.x, p.d.y);
        ctx!.stroke();
      });

      particles.forEach((pt) => {
        pt.t += pt.v;
        if (pt.t > 1) pt.t = 0;
        const pos = cubic(pt.t, pt.path.a, pt.path.b, pt.path.c, pt.path.d);
        const alpha = 0.22 + 0.55 * pt.t;
        const col = pt.clay ? "217,119,87" : "20,20,19";
        ctx!.fillStyle = `rgba(${col},${alpha})`;
        ctx!.beginPath();
        ctx!.arc(pos.x, pos.y, pt.r, 0, Math.PI * 2);
        ctx!.fill();
        const trail = cubic(Math.max(pt.t - 0.015, 0), pt.path.a, pt.path.b, pt.path.c, pt.path.d);
        ctx!.strokeStyle = `rgba(${col},${alpha * 0.35})`;
        ctx!.beginPath();
        ctx!.moveTo(trail.x, trail.y);
        ctx!.lineTo(pos.x, pos.y);
        ctx!.stroke();
      });

      ringT = (ringT + 0.008) % 1;
      const rr = 6 + ringT * 46;
      ctx!.strokeStyle = `rgba(217,119,87,${0.4 * (1 - ringT)})`;
      ctx!.lineWidth = 1.5;
      ctx!.beginPath();
      ctx!.arc(node.x, node.y, rr, 0, Math.PI * 2);
      ctx!.stroke();
      ctx!.fillStyle = "rgba(20,20,19,0.92)";
      ctx!.beginPath();
      ctx!.arc(node.x, node.y, 4.5, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = "rgba(217,119,87,0.22)";
      ctx!.beginPath();
      ctx!.arc(node.x, node.y, 12, 0, Math.PI * 2);
      ctx!.fill();

      frameRaf = requestAnimationFrame(frame);
    }

    build();
    window.addEventListener("resize", build);
    frameRaf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", build);
      if (frameRaf) cancelAnimationFrame(frameRaf);
    };
  }, []);

  return (
    <header>
      <canvas id="signal-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="wrap hero-content">
        <span className="eyebrow">Quontive · İstanbul</span>
        <h1>
          Türkiye&apos;nin <em>en gelişmiş</em> reklam teknolojisi.
        </h1>
        <p className="hero-sub">
          Quontive, Türkiye genelinde premium dijital yayın ağlarını tek bir planlama ve satın alma
          çatısı altında toplar. Markanız için ölçülebilir, şeffaf ve performans odaklı kampanyaları
          farklı fiyatlama modelleriyle uçtan uca yönetmenizi sağlar.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            Teklif alın <span className="arrow">→</span>
          </a>
          <a href="#kabiliyetler" className="btn btn-ghost">
            Kabiliyetleri inceleyin
          </a>
        </div>
        <div className="partners">
          <PartnerBadge
            src="https://www.quontive.com/google-premier-partner.png"
            alt="Google Premier Partner"
            width={132}
            height={44}
            fallback="Google Premier Partner"
          />
          <PartnerBadge
            src="https://www.quontive.com/meta-business-partner.png"
            alt="Meta Business Partner"
            width={100}
            height={44}
            fallback="Meta Business Partner"
          />
        </div>
      </div>
    </header>
  );
}
