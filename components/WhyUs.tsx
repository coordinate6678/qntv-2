import Reveal from "./Reveal";

const items = [
  {
    num: "01",
    title: "Tek noktadan çok kanal",
    text: "Mobil, sosyal ve web envanterini ayrı ayrı anlaşma yapmadan tek kontratla satın alın.",
    delay: undefined as 1 | 2 | 3 | undefined,
  },
  {
    num: "02",
    title: "Performance ve branding birlikte",
    text: "CPM, CPC, CPV, CPI, CPA ve CPU modelleriyle hem farkındalık hem dönüşüm kampanyaları yürütün.",
    delay: 1 as const,
  },
  {
    num: "03",
    title: "Planlama ve satın almada hız",
    text: "Tek panelden hızlı teklif, net medya planı ve merkezi operasyon yönetimiyle kampanyalarınızı daha kısa sürede yayına alın.",
    delay: 1 as const,
  },
  {
    num: "04",
    title: "Şeffaf raporlama",
    text: "Kampanya bazlı günlük impression, click, CTR, view-through raporu; third-party tag desteği.",
    delay: 2 as const,
  },
];

export default function WhyUs() {
  return (
    <section id="neden-biz">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="sec-eyebrow">Quontive</span>
          <h2>Sizin akışınıza göre tasarlandı.</h2>
          <p>Brief&apos;ten raporlamaya kadar; ölçülebilir, şeffaf, hızlı.</p>
        </Reveal>
        <div className="why-grid">
          {items.map((item) => (
            <Reveal key={item.num} delay={item.delay} as="article" className="why">
              <span className="why-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
