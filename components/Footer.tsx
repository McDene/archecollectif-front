import Image from "next/image";
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    <footer id="contact" className="bg-myblue text-neutral-content py-10">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Informations de contact */}
        <aside className="flex justify-center items-center pb-12 md:pb-0">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-stretch">
            <Image
              src="/images/LogoBlanc.png"
              alt="Logo"
              width={140} // La largeur peut être ajustée
              height={0} // Hauteur auto-adaptée au contenu
              className="object-contain"
            />
          </div>
          {/* Texte à droite du logo */}
          <div className="ml-6 flex flex-col justify-between text-white text-lg md:text-xl">
            <h2 className="text-xl md:text-3xl font-avenirBlack pb-4 md:pb-6 ">
              L&apos;ARCH collectif sàrl
            </h2>
            <address className="not-italic leading-relaxed">
              Rue de la Condémine 20
              <br />
              1630 Bulle
              <br />
              <a href="tel:+41265667046" className="hover:underline">
                026 566 70 46
              </a>
              <br />
              <a
                href="mailto:hello@archcollectif.ch"
                className="hover:underline"
              >
                hello@larchcollectif.ch
              </a>
            </address>
          </div>
        </aside>

        {/* Navigation sociale */}
        <nav className="flex flex-col items-start">
          <h6 className="text-xl md:text-3xl font-avenirBlack mb-4 text-white">
            Suivez-nous
          </h6>
          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/company/larchcollectif"
              aria-label="LinkedIn"
              target="_blank"
              title="Suivez-nous sur LinkedIn"
              className="hover:text-myred hover:scale-110 transition-all duration-200"
            >
              <AiFillLinkedin className="text-2xl md:text-3xl" />
            </a>
            <a
              href="https://www.instagram.com/larchcollectif"
              target="_blank"
              aria-label="Instagram"
              title="Suivez-nous sur Instagram"
              className="hover:text-myred hover:scale-110 transition-all duration-200"
            >
              <AiFillInstagram className="text-2xl md:text-3xl" />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
