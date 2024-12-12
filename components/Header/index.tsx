"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerHeight = 64;

  useEffect(() => {
    const handleScroll = () => {
      const isMdOrLarger = window.matchMedia("(min-width: 768px)").matches;

      if (isMdOrLarger) {
        const scrollY = window.scrollY;

        if (scrollY >= window.innerHeight - headerHeight) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  // Correction : Ajout d'un type explicite pour `id`
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Ferme le menu si on est sur mobile
  };

  return (
    <header
      className={`${
        isFixed ? "fixed top-0" : "md:absolute md:bottom-0 fixed"
      } left-0 right-0 z-50 bg-myblue py-4 shadow-sm`}
    >
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center text-2xl text-myred font-avenirRegular">
          <Link href="/">
            <span className="font-avenirBlack">L&apos;ARCH</span> collectif
          </Link>
        </div>

        {/* Menu pour Desktop */}
        <nav className="hidden md:flex space-x-8 text-xl text-myred font-avenirRegular">
          <button
            onClick={() => handleScrollTo("home")}
            className="hover:underline"
          >
            home
          </button>
          <button
            onClick={() => handleScrollTo("projets")}
            className="hover:underline"
          >
            projets
          </button>
          <button
            onClick={() => handleScrollTo("team")}
            className="hover:underline"
          >
            équipe
          </button>
          <button
            onClick={() => handleScrollTo("news")}
            className="hover:underline"
          >
            actualités
          </button>
          <button
            onClick={() => handleScrollTo("contact")}
            className="hover:underline"
          >
            contact
          </button>
        </nav>

        {/* Menu burger pour Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-myred text-2xl"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Navigation mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-myblue text-myred fixed inset-0 flex flex-col items-center justify-center space-y-6 text-xl z-50">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-myred text-3xl"
          >
            <AiOutlineClose />
          </button>
          <button
            onClick={() => handleScrollTo("home")}
            className="hover:underline"
          >
            home
          </button>
          <button
            onClick={() => handleScrollTo("projets")}
            className="hover:underline"
          >
            projets
          </button>
          <button
            onClick={() => handleScrollTo("team")}
            className="hover:underline"
          >
            équipe
          </button>
          <button
            onClick={() => handleScrollTo("news")}
            className="hover:underline"
          >
            actualités
          </button>
          <button
            onClick={() => handleScrollTo("contact")}
            className="hover:underline"
          >
            contact
          </button>
        </div>
      )}
    </header>
  );
}
