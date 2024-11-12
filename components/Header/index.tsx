"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setIsScrolled(true); // Activer le fond blanc après 50px
      } else {
        setIsScrolled(false); // Rendre transparent en haut de la page
      }

      if (currentScrollY < 20 || currentScrollY < lastScrollY) {
        setShowNavbar(true); // Affiche le header en haut de page ou si on remonte
      } else if (currentScrollY > 20 && currentScrollY > lastScrollY) {
        setShowNavbar(false); // Cache le header si on descend après 80px
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -150 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "bg-gray-100 " : "bg-transparent"
      } py-4 px-8 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/RougeChaud.png"
            alt="Logo"
            width={50}
            height={50}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-grow flex justify-center space-x-8 text-2xl text-myred font-avenirBlack">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/projects" className="hover:underline">
            Nos projets
          </Link>
          <Link href="/team" className="hover:underline">
            L&apos;équipe
          </Link>
          <Link href="/news" className="hover:underline">
            Nos actualités
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
