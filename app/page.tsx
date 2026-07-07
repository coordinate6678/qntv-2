import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import WhyUs from "@/components/WhyUs";
import Capabilities from "@/components/Capabilities";
import Publishers from "@/components/Publishers";
import ProcessSteps from "@/components/ProcessSteps";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#icerik">
        İçeriğe atla
      </a>
      <Nav />
      <main id="icerik" tabIndex={-1}>
        <Hero />
        <Metrics />
        <WhyUs />
        <Capabilities />
        <Publishers />
        <ProcessSteps />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
