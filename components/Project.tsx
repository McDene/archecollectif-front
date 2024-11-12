"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { FaFilePdf } from "react-icons/fa";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

interface Project {
  year: string;
  name: string;
  images: string[];
  pdf: string;
}

interface ProjectsSectionProps {
  projectsData: Project[];
}

const ProjectsSection: FC<ProjectsSectionProps> = ({ projectsData }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const uniqueYears = Array.from(
    new Set(projectsData.map((project) => project.year))
  );
  const currentProject = projectsData[currentProjectIndex];

  // Utilisation de useScroll pour capturer la position de défilement
  const { scrollY } = useScroll();
  // Transformation de scrollY pour créer un effet de parallaxe
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative bg-gradient-to-b from-gray-100 to-white min-h-screen py-28 overflow-hidden">
      {/* Image de fond avec effet de parallaxe */}
      <motion.div
        className="absolute bottom-20 left-0 w-[330px] h-[330px] bg-no-repeat bg-contain opacity-20"
        style={{
          y,
          backgroundImage: `url('/images/realisation.png')`,
        }}
      />

      {/* Contenu principal */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-6xl uppercase mb-10 font-avenirBlack text-myblue text-center">
            Nos projets
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-full">
            {/* Navigation des années et projets */}
            <div className="col-span-1">
              <div className="p-6 rounded-lg w-full max-w-md mx-auto">
                <h2 className="text-2xl font-avenirBlack text-myblue mb-4">
                  Historique
                </h2>

                {/* Liste des années */}
                <ul className="space-y-3">
                  {uniqueYears.map((year) => (
                    <li key={year}>
                      <button
                        onClick={() =>
                          setCurrentProjectIndex(
                            projectsData.findIndex(
                              (project) => project.year === year
                            )
                          )
                        }
                        className={`w-full text-left text-xl font-medium px-4 py-2 rounded-lg transition-colors ${
                          currentProject.year === year
                            ? "bg-red-100 text-red-700"
                            : "text-myblue hover:bg-red-50 hover:text-red-600"
                        }`}
                      >
                        {year}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Séparation entre les années et les projets */}
                <hr className="my-6 border-t-2 border-myblue" />

                {/* Liste des projets pour l'année sélectionnée */}
                <div className="mt-4 space-y-2">
                  {projectsData
                    .filter((project) => project.year === currentProject.year)
                    .map((project) => (
                      <div key={project.name} className="flex items-center ">
                        <button
                          onClick={() =>
                            setCurrentProjectIndex(
                              projectsData.findIndex(
                                (p) => p.name === project.name
                              )
                            )
                          }
                          className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors ${
                            currentProject.name === project.name
                              ? "text-red-500 bg-red-50"
                              : "text-myblue hover:text-red-500 hover:bg-gray-100"
                          }`}
                        >
                          {project.name}
                        </button>
                        <a
                          href={project.pdf}
                          download
                          className="ml-2 p-2 text-white"
                          title="Télécharger PDF"
                        >
                          <FaFilePdf className="text-myred" />
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Galerie d'images avec AnimatePresence pour 3 images */}
            <div className="col-span-3 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`grid gap-4 ${
                    currentProject.images.length === 3
                      ? "grid-cols-2 grid-rows-2"
                      : "grid-cols-1 md:grid-cols-2"
                  }`}
                  style={{
                    gridTemplateAreas:
                      currentProject.images.length === 3
                        ? `"image1 image2" "image3 image3"`
                        : undefined,
                  }}
                >
                  {currentProject.images.length === 3 ? (
                    <>
                      {/* Deux images côte à côte en haut */}
                      <div className="h-[330px]" style={{ gridArea: "image1" }}>
                        <Image
                          src={currentProject.images[0]}
                          alt={`${currentProject.name} - Image 1`}
                          width={300}
                          height={200} // Hauteur ajustée pour une apparence équilibrée
                          className="object-cover w-full h-full rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="h-[330px]" style={{ gridArea: "image2" }}>
                        <Image
                          src={currentProject.images[1]}
                          alt={`${currentProject.name} - Image 2`}
                          width={300}
                          height={200}
                          className="object-cover w-full h-full rounded-lg shadow-lg"
                        />
                      </div>

                      {/* Grande image horizontale occupant toute la largeur en bas */}
                      <div
                        className="col-span-2 row-span-1 h-[330px]"
                        style={{ gridArea: "image3" }}
                      >
                        <Image
                          src={currentProject.images[2]}
                          alt={`${currentProject.name} - Image 3`}
                          width={600}
                          height={250} // Plus large pour une apparence horizontale
                          className="object-cover w-full h-full rounded-lg shadow-lg"
                        />
                      </div>
                    </>
                  ) : (
                    // Cas par défaut si ce n'est pas 3 images
                    currentProject.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`${currentProject.name} - Image ${index + 1}`}
                        width={600}
                        height={400}
                        className="object-cover w-full h-auto rounded-lg shadow-lg"
                      />
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
