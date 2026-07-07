import Reveal from "./Reveal";

const items = [
  {
    num: "01",
    title: "Yüksek görünürlük garantisi",
    text: "Kampanyalar, IAB görünürlük standartlarını merkez alacak şekilde planlanır. Bu sayede bütçe görünen envantere yönlenir, verim kaybı azalır.",
    delay: undefined as 1 | 2 | 3 | undefined,
  },
  {
    num: "02",
    title: "Bağlama duyarlı hedefleme",
    text: "İçerik kategorisi, kullanıcı ilgisi ve yayın ortamı sinyalleri birlikte değerlendirilir. Mesajınız doğru bağlamda, doğru kitleye ulaşır.",
    delay: 1 as const,
  },
  {
    num: "03",
    title: "Video ölçüm uyumluluğu",
    text: "Video kampanyaları VAST/VPAID uyumlu altyapıyla çalışır. İzlenme, tamamlama ve etkileşim metrikleri standart rapor formatında sunulur.",
    delay: 2 as const,
  },
  {
    num: "04",
    title: "Lead odaklı formlar",
    text: "Landing page veya mini form senaryolarıyla talep toplama sürecini hızlandırırız. Gelen başvurular kampanya bazında net olarak takip edilir.",
    delay: undefined as 1 | 2 | 3 | undefined,
  },
  {
    num: "05",
    title: "Akıllı yeniden erişim",
    text: "Siteyi ziyaret eden veya etkileşim veren kullanıcılar segmentlenir. Yeniden erişim senaryolarıyla dönüşüme yakın kitle tekrar yakalanır.",
    delay: 1 as const,
  },
  {
    num: "06",
    title: "Etkileşimli format kütüphanesi",
    text: "HTML5 rich media, ankete dayalı akışlar ve özel microsite kurgularıyla marka hikayesi daha uzun süre dikkat toplar.",
    delay: 2 as const,
  },
];

export default function Capabilities() {
  return (
    <section className="cap" id="kabiliyetler">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="sec-eyebrow">Quontive</span>
          <h2>Operasyonel kabiliyetler.</h2>
          <p>
            Planlama ve satın alma ekiplerinin günlük ihtiyaçlarına göre tasarlanmış, ölçülebilir kampanya
            altyapısı.
          </p>
        </Reveal>
        <div className="cap-grid">
          {items.map((item) => (
            <Reveal key={item.num} delay={item.delay} className="cap-item">
              <span className="cap-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
