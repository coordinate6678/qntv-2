import Reveal from "./Reveal";

const brands = [
  { src: "/brands/volvo.svg", alt: "Volvo", width: 110, height: 34 },
  { src: "/brands/pepsi.svg", alt: "Pepsi", width: 110, height: 34 },
  { src: "/brands/volkswagen.svg", alt: "Volkswagen", width: 110, height: 34 },
  { src: "/brands/migros.svg", alt: "Migros", width: 110, height: 34 },
  { src: "/brands/akbank.svg", alt: "Akbank", width: 110, height: 34 },
];

const trackBrands = [...brands, ...brands];

export default function Publishers() {
  return (
    <section className="pubs" id="yayincilarimiz">
      <div className="wrap">
        <Reveal className="sec-head" style={{ marginBottom: 0 }}>
          <span className="sec-eyebrow">Çalıştığımız Markalar</span>
          <h2>Ölçülebilir kampanyalar, güçlü markalar.</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Farklı sektörlerden markalar için premium dijital envanter üzerinde ölçekli, güvenli ve
            performans odaklı kampanyalar yürütüyoruz.
          </p>
        </Reveal>
        <Reveal className="logo-strip" aria-hidden="true">
          <div className="logo-track" id="logoTrack">
            {trackBrands.map((b, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${b.alt}-${i}`}
                src={b.src}
                alt={b.alt}
                width={b.width}
                height={b.height}
                loading="lazy"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
