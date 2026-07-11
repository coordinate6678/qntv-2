import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Quontive",
  description: "Quontive web sitesi gizlilik politikası.",
  alternates: { canonical: "/gizlilik-politikasi" },
};

export default function GizlilikPage() {
  return (
    <LegalPage eyebrow="Gizlilik" title="Gizlilik Politikası">
      <p>
        Quontive olarak ziyaretçilerimizin ve iş ortaklarımızın kişisel verilerinin gizliliğine önem
        veriyoruz. Bu metin, hangi verilerin hangi amaçlarla toplandığını, ne kadar süre saklandığını ve hangi
        durumlarda üçüncü taraflarla paylaşılabileceğini genel hatlarıyla açıklar.
      </p>
      <h2>1. Toplanan veriler</h2>
      <p>
        Site kullanımı sırasında iletişim formu bilgileri, teknik log kayıtları, çerez tercihleri ve
        performans analizine yönelik anonim veriler toplanabilir.
      </p>
      <h2>2. Veri kullanım amacı</h2>
      <p>
        Toplanan veriler; talep yönetimi, teklif süreçlerinin yürütülmesi, teknik güvenlik ve hizmet
        kalitesinin geliştirilmesi amaçlarıyla işlenir.
      </p>
      <h2>3. Veri saklama ve güvenlik</h2>
      <p>
        Veriler, yasal yükümlülükler ve iş süreçleriyle uyumlu sürelerde saklanır. Yetkisiz erişimi önlemek
        için organizasyonel ve teknik güvenlik önlemleri uygulanır.
      </p>
      <h2>4. İletişim</h2>
      <p>
        Gizlilik uygulamalarımızla ilgili sorularınız için <a href="mailto:hello@quontive.com">hello@quontive.com</a>{" "}
        adresinden bize ulaşabilirsiniz.
      </p>
    </LegalPage>
  );
}
