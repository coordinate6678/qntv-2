import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

export default function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#icerik">
        İçeriğe atla
      </a>
      <Nav />
      <main id="icerik" tabIndex={-1} className="legal">
        <div className="wrap">
          <header className="legal-head">
            <span className="sec-eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            {updated && <p className="legal-updated">Son güncelleme: {updated}</p>}
          </header>
          <article className="legal-body">{children}</article>
        </div>
      </main>
      <Footer />
    </>
  );
}
