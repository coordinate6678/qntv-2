"use client";

import { FormEvent, useState } from "react";
import Reveal from "./Reveal";

function mailtoFallback(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Web sitesi iletişim formu — ${name}`);
  const body = encodeURIComponent(`${message}\n\n${name} · ${email}`);
  window.location.href = `mailto:hello@quontive.com?subject=${subject}&body=${body}`;
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const company = (form.elements.namedItem("company") as HTMLInputElement).value;

    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage("Mesajınız alındı. En kısa sürede dönüş yapacağız.");
        form.reset();
        return;
      }

      throw new Error(data.error || "Gönderim başarısız");
    } catch {
      setStatus("error");
      setStatusMessage("Form gönderilemedi; e-posta uygulamanız açılıyor.");
      mailtoFallback(name, email, message);
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <Reveal className="sec-head">
          <span className="sec-eyebrow">İletişim</span>
          <h2>Quontive Medya.</h2>
          <p style={{ color: "#A6A399" }}>
            Satış ve operasyon ekiplerimize doğrudan ulaşabilir, kampanyanız için en uygun planı kısa sürede
            netleştirebilirsiniz.
          </p>
        </Reveal>
        <div className="contact-grid">
          <Reveal>
            <div className="c-item">
              <h3>E-posta</h3>
              <a href="mailto:hello@quontive.com">hello@quontive.com</a>
            </div>
            <div className="c-item">
              <h3>Adres</h3>
              <p>
                Esentepe Mahallesi Talatpaşa Caddesi
                <br />
                No: 5 / 1 Levent, İstanbul
              </p>
            </div>
            <div className="c-item">
              <h3>Çalışma Saatleri</h3>
              <p>Hafta içi 09:00 – 18:00</p>
            </div>
            <p className="c-note">Yanıt süresi: 24 saat</p>
          </Reveal>
          <Reveal delay={1}>
            <form className="form" onSubmit={handleSubmit} id="contactForm">
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="f-company">Şirket</label>
              <input id="f-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div>
              <label htmlFor="f-name">Ad Soyad</label>
              <input id="f-name" name="name" type="text" required autoComplete="name" />
            </div>
            <div>
              <label htmlFor="f-mail">E-posta</label>
              <input id="f-mail" name="email" type="email" required autoComplete="email" />
            </div>
            <div>
              <label htmlFor="f-msg">Mesajınız</label>
              <textarea id="f-msg" name="message" required />
            </div>
            <label className="consent">
              <input type="checkbox" required />
              <span>
                Şirket <a href="/kvkk" target="_blank" rel="noreferrer">aydınlatma metnini</a> okudum ve
                kişisel verilerimin bu kapsamda işlenmesine açık rıza veriyorum.
              </span>
            </label>
            {statusMessage && (
              <p className="form-status" role="status">
                {statusMessage}
              </p>
            )}
            <button type="submit" className="btn" disabled={status === "loading"}>
              {status === "loading" ? "Gönderiliyor…" : "Gönder"} <span className="arrow">→</span>
            </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
