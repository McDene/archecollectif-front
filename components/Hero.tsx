"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const images = ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Capture la position de défilement
  const { scrollY } = useScroll();
  // Transformation de défilement pour créer un effet de parallaxe
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Change l'image toutes les 8 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-myblue min-h-screen flex items-center overflow-hidden">
      {/* Image de fond avec effet de parallaxe, alignée en bas à droite */}
      <motion.div
        className="absolute bottom-0 right-0 w-[375px] h-[750px] opacity-20 pointer-events-none"
        style={{ y }}
      >
        <Image
          src="/images/LogoBlanc.png" // Remplacez par le chemin de votre image
          alt="Arrière-plan"
          layout="fill"
          objectFit="cover"
          className="object-right-bottom"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8 items-center relative z-10">
        {/* Conteneur d'images avec effet de fondu croisé - 2/5 de la largeur */}
        <div className="col-span-5 md:col-span-2 relative w-full h-[400px] md:h-[500px]">
          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 w-full h-full rounded-3xl shadow-lg overflow-hidden"
            >
              <Image
                src={images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Texte du hero - 3/5 de la largeur */}
        <div className="col-span-5 md:col-span-3">
          <h1 className="text-6xl md:text-8xl font-avenirBlack text-white">
            Un COLLECTIF d&apos;humains
          </h1>
          <p className="py-6 text-lg md:text-xl text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur dicta beatae labore, ut voluptate nulla delectus
            voluptatibus iusto accusantium perspiciatis odit ex voluptates, nam
            dolor reiciendis, id fugit ratione dolorum culpa eos. Iste tempora
            officia cupiditate aliquam sit voluptates unde dolore ab harum
            totam? Vero ipsam repellendus provident incidunt pariatur.
          </p>
        </div>
      </div>
    </section>
  );
}
