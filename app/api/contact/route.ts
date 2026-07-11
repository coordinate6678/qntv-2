import { NextResponse } from "next/server";
import { Resend } from "resend";

// --- Basit bellek-içi rate limit (IP başına saatte 5 istek) ---
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Çok fazla istek. Lütfen daha sonra tekrar deneyin." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
      company?: string; // honeypot — gerçek kullanıcılar bu alanı görmez
    };

    // Honeypot doluysa bot'tur: sessizce "başarılı" dön, e-posta gönderme.
    if (body.company?.trim()) {
      return NextResponse.json({ success: true });
    }

    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Tüm alanlar zorunludur." },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email) || name.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Geçersiz form verisi." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL ?? "info@quontive.com";

    if (!apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.log("Contact form submission (RESEND_API_KEY yok):", { name, email, message });
        return NextResponse.json({ success: true });
      }

      console.error("Contact form is unavailable: RESEND_API_KEY is missing.");
      return NextResponse.json(
        { success: false, error: "İletişim formu geçici olarak kullanılamıyor." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Quontive Web <no-reply@quontive.com>",
      to: [to],
      replyTo: email,
      subject: `Web sitesi iletişim formu — ${name}`,
      text: `${message}\n\n—\n${name}\n${email}\nIP: ${ip}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { success: false, error: "E-posta gönderilemedi." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "İstek işlenemedi." },
      { status: 500 },
    );
  }
}
