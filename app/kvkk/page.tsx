import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Quontive",
  description:
    "Quontive kişisel verilerin korunması ve işlenmesine ilişkin KVKK aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
};

export default function KvkkPage() {
  return (
    <LegalPage eyebrow="KVKK" title="KVKK Aydınlatma Metni">
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, Quontive tarafından işlenen kişisel
        verileriniz hakkında sizi bilgilendirmek isteriz. Veri sorumlusu sıfatımızla, verilerinizi hukuka ve
        dürüstlük kurallarına uygun şekilde işlemekteyiz.
      </p>
      <h2>1. Veri sorumlusu</h2>
      <p>Veri sorumlusu: Quontive Medya A.Ş.</p>
      <h2>2. İşlenen veri kategorileri</h2>
      <p>
        Kimlik, iletişim, işlem güvenliği ve talep yönetimine ilişkin veriler, hizmet ilişkisi ve iletişim
        süreci kapsamında işlenebilir.
      </p>
      <h2>3. İşleme amacı ve hukuki sebep</h2>
      <p>
        Veriler; sözleşme süreçlerinin yürütülmesi, yasal yükümlülüklerin yerine getirilmesi, meşru
        menfaatlerin korunması ve açık rızanız bulunduğunda pazarlama/iletişim faaliyetleri amaçlarıyla
        işlenir.
      </p>
      <h2>4. Haklarınız</h2>
      <p>
        KVKK&apos;nin 11. maddesi kapsamında bilgi talep etme, düzeltme, silme, işlemeye itiraz etme ve
        zararınızın giderilmesini talep etme haklarına sahipsiniz.
      </p>
    </LegalPage>
  );
}
