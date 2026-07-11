"use client";

import { useEffect } from "react";
import Reveal from "./Reveal";

function CountSpan({
  count,
  decimals = 0,
}: {
  count: number;
  decimals?: number;
}) {
  return (
    <span data-count={count} data-dec={decimals}>
      {decimals > 0 ? count.toFixed(decimals) : count}
    </span>
  );
}

export default function Metrics() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const counters = document.querySelectorAll("[data-count]");

    // SSR final değeri basar (SEO/no-JS için); animasyon olacaksa
    // görünüme girmeden önce 0'a çek ki final→0 sıçraması olmasın.
    if (!reduced) {
      counters.forEach((c) => {
        const el = c as HTMLElement;
        const dec = +(el.dataset.dec || "0");
        el.textContent = (0).toFixed(dec);
      });
    }

    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          cio.unobserve(e.target);
          const el = e.target as HTMLElement;
          const target = parseFloat(el.dataset.count || "0");
          const dec = +(el.dataset.dec || "0");
          if (reduced || target === 0) {
            el.textContent = target.toFixed(dec);
            return;
          }
          const t0 = performance.now();
          const dur = 1400;
          function tick(t: number) {
            const p = Math.min((t - t0) / dur, 1);
            el.textContent = (target * (1 - Math.pow(1 - p, 3))).toFixed(dec);
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((c) => cio.observe(c));
    return () => cio.disconnect();
  }, []);

  return (
    <section className="metrics" id="metrikler" aria-label="Performans metrikleri">
      <div className="signal-line" aria-hidden="true" />
      <div className="wrap">
        <Reveal className="metrics-head">
          <div>
            <span className="m-eyebrow">Satışlarınıza Destek</span>
            <h2>Rakamlarla Quontive.</h2>
          </div>
        </Reveal>
        <div className="roas-row">
          <Reveal className="roas">
            <b>
              <span className="dir">↑</span>%<CountSpan count={35} />
            </b>
            <span>ROAS artışı</span>
          </Reveal>
          <Reveal className="roas" delay={1}>
            <b>
              <span className="dir">↑</span>%<CountSpan count={61} />
            </b>
            <span>Sepete ekleme artışı</span>
          </Reveal>
          <Reveal className="roas" delay={2}>
            <b>
              <span className="dir" style={{ transform: "rotate(180deg)", display: "inline-block" }}>
                ↑
              </span>
              %<CountSpan count={51} />
            </b>
            <span>Maliyet düşüşü</span>
          </Reveal>
        </div>

        <Reveal as="span" className="m-eyebrow">
          Kampanya Performans Ortalamaları
        </Reveal>
        <div className="live-grid">
          <Reveal className="live">
            <div className="live-val">
              <span className="live-dot" />
              %<CountSpan count={99} />
            </div>
            <h3>Viewability</h3>
            <p>IAB standartlarına göre görünebilir gösterim oranı</p>
          </Reveal>
          <Reveal className="live" delay={1}>
            <div className="live-val">
              <span className="live-dot" />
              %<CountSpan count={98.7} decimals={1} />
            </div>
            <h3>Brand Safety</h3>
            <p>Uygun içerik ortamları ve güvenli yerleşim skoru</p>
          </Reveal>
          <Reveal className="live" delay={2}>
            <div className="live-val">
              <span className="live-dot" />
              %<CountSpan count={92} />
            </div>
            <h3>Video Completion</h3>
            <p>Kampanya bazlı ortalama tam izlenme performansı</p>
          </Reveal>
          <Reveal className="live" delay={3}>
            <div className="live-val">
              <span className="live-dot" />
              %<CountSpan count={0} />
            </div>
            <h3>Ad Fraud</h3>
            <p>Filtrelenmiş trafiğe karşı fraud tespit ve engelleme</p>
          </Reveal>
        </div>
        <Reveal className="metrics-note">
          <p>
            Gösterilen değerler geçmiş kampanya sonuçlarının ortalamalarıdır. Performans; hedef, dönem,
            kreatif ve kullanılan envantere göre değişebilir.
          </p>
        </Reveal>

        <div className="counter-row">
          <Reveal className="counter">
            <b>
              <CountSpan count={150} />+
            </b>
            <span>Premium Mobil Uygulama</span>
          </Reveal>
          <Reveal className="counter" delay={1}>
            <b>
              <CountSpan count={40} />
              M+
            </b>
            <span>Aylık Toplam Kullanıcı Erişimi</span>
          </Reveal>
          <Reveal className="counter" delay={2}>
            <b>
              <CountSpan count={250} />+
            </b>
            <span>Türkiye Premium Web Sitesi</span>
          </Reveal>
          <Reveal className="counter" delay={3}>
            <b>
              <CountSpan count={30} />+
            </b>
            <span>Reklam Formatı ve Modeli</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
