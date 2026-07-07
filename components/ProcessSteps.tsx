import Reveal from "./Reveal";

const steps = [
  {
    num: "01",
    title: "Brief ve Planlama",
    text: "Hedef kitle, bütçe ve KPI'larınızı paylaşın; 24 saat içinde medya plan önerisi sunalım.",
    delay: undefined as 1 | 2 | 3 | undefined,
  },
  {
    num: "02",
    title: "Teklif ve Sözleşme",
    text: "Onayladığınız plan üzerinden detaylı teklif; IO / sözleşme imzalanır.",
    delay: 1 as const,
  },
  {
    num: "03",
    title: "Kreatif Teslim ve Lansman",
    text: "Creative asset'leri teslim alın; QA sonrası kampanya yayına girer.",
    delay: 2 as const,
  },
  {
    num: "04",
    title: "Optimizasyon ve Raporlama",
    text: "Günlük performans raporu, haftalık optimizasyon, kampanya sonu detaylı post-campaign analizi.",
    delay: 3 as const,
  },
];

export default function ProcessSteps() {
  return (
    <section id="surec">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="sec-eyebrow">Süreç</span>
          <h2>Süreç ve çözüm odaklı yaklaşım.</h2>
        </Reveal>
        <div className="steps">
          {steps.map((step) => (
            <Reveal key={step.num} delay={step.delay} className="step">
              <span className="step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
