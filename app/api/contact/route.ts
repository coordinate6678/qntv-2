import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Tüm alanlar zorunludur." },
        { status: 400 },
      );
    }

    // TODO: E-posta gönderimi veya CRM entegrasyonu burada yapılacak.
    // Örnek: Resend, SendGrid, veya dahili API çağrısı.
    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "İstek işlenemedi." },
      { status: 500 },
    );
  }
}
