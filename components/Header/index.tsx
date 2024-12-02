"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

export default function Navbar() {
  const [isFixed, setIsFixed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer le menu mobile
  const headerHeight = 64;

  // Gestion de la position du header
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY >= window.innerHeight - headerHeight) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Empêche le scroll quand le menu est ouvert
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

  return (
    <header
      className={`${
        isFixed ? "fixed top-0" : "absolute bottom-0"
      } left-0 right-0 z-50 bg-myblue py-4 shadow `}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 ">
        {/* Logo */}
        <div className="flex items-center text-2xl text-myred font-avenirRegular">
          <Link href="/">
            <span className="font-avenirBlack">L&apos;ARCH</span> collectif
          </Link>
        </div>

        {/* Menu pour Desktop */}
        <nav className="hidden md:flex space-x-8 text-xl text-myred font-avenirRegular">
          <Link href="/" className="hover:underline">
            home
          </Link>
          <Link href="#projets" className="hover:underline">
            projets
          </Link>
          <Link href="#team" className="hover:underline">
            équipe
          </Link>
          <Link href="#news" className="hover:underline">
            actualités
          </Link>
          <Link href="#contact" className="hover:underline">
            contact
          </Link>
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
          {/* Bouton Close en haut à droite */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-myred text-3xl"
            aria-label="Close menu"
          >
            <AiOutlineClose />
          </button>

          {/* Liens du menu */}
          <div className="flex items-center text-4xl text-myred font-avenirRegular">
            <Link href="/">
              <span className="font-avenirBlack">L&apos;ARCH</span> Collectif
            </Link>
          </div>

          <Link
            href="/"
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Nos projets
          </Link>
          <Link
            href="/team"
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            L&apos;équipe
          </Link>
          <Link
            href="/news"
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Nos actualités
          </Link>
          <Link
            href="/contact"
            className="hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
