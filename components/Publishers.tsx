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
          <span className="sec-eyebrow">Yayıncılarımız</span>
          <h2>Premium yayın ağı, güvenli erişim.</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Haber, ekonomi, spor, teknoloji ve yaşam kategorilerinde premium yayın ağımız ile markalarınıza
            ölçekli ve güvenli erişim sağlıyoruz.
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
