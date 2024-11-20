"use client";

import { FC, useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

interface Project {
  id: number;
  title: string;
  date: string; // Format YYYY-MM-DD
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0); // Par défaut, sélectionne la première année
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Récupérer les années uniques
  const uniqueYears = Array.from(
    new Set(projects.map((project) => project.date.split("-")[0]))
  );

  // Gestion des boutons "Monté" et "Descendre"
  const handleScrollUp = () => {
    setSelectedYearIndex(
      (prev) => (prev - 1 + uniqueYears.length) % uniqueYears.length
    );
  };

  const handleScrollDown = () => {
    setSelectedYearIndex((prev) => (prev + 1) % uniqueYears.length);
  };

  // Calculer les années visibles (3 éléments avec celui du milieu sélectionné)
  const visibleYears = [
    uniqueYears[
      (selectedYearIndex - 1 + uniqueYears.length) % uniqueYears.length
    ],
    uniqueYears[selectedYearIndex],
    uniqueYears[(selectedYearIndex + 1) % uniqueYears.length],
  ];

  // Projets filtrés par l'année sélectionnée
  const selectedYear = uniqueYears[selectedYearIndex];
  const filteredProjects = projects.filter((project) =>
    project.date.startsWith(selectedYear)
  );

  return (
    <section className="bg-gray-50 py-20 md:py-28 h-lvh">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-6xl font-avenirBlack text-start text-myred pb-12">
          Nos Projets
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filtres */}
          <div className="col-span-1 flex flex-col">
            {/* Bouton "Monté" */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleScrollDown}
                className="text-center p-2 w-8 h-8 flex items-center justify-center bg-gray-400 text-white rounded-full shadow hover:bg-myblue"
              >
                <AiFillMinusCircle size={24} />
              </button>

              {/* Liste des années */}
              <ul className=" space-y-2 flex flex-col justify-center items-center h-36">
                {visibleYears.map((year) => (
                  <li key={year}>
                    <button
                      className={`w-full px-4 rounded-lg ${
                        year === selectedYear
                          ? " text-myblue font-avenirBlack text-4xl"
                          : " text-gray-400 font-avenirRegular hover:underline"
                      }`}
                      onClick={() =>
                        setSelectedYearIndex(uniqueYears.indexOf(year))
                      }
                    >
                      {year}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Bouton "Descendre" */}

              <button
                onClick={handleScrollUp}
                className="text-center p-2 w-8 h-8 flex items-center justify-center bg-gray-400 text-white rounded-full shadow hover:bg-myblue"
              >
                <AiFillPlusCircle size={24} />
              </button>
            </div>

            <div className="block h-[2px] w-full bg-myblue my-6" />

            {/* Liste des projets pour l'année sélectionnée */}
            <ul className="space-y-2">
              {filteredProjects.map((project) => (
                <li key={project.id}>
                  <button
                    className={`text-left py-1 px-4 rounded-lg text-3xl font-avenirBlack ${
                      selectedProject === project.id
                        ? "text-myred underline"
                        : "text-gray-400 hover:underline"
                    }`}
                    onClick={() =>
                      setSelectedProject(
                        selectedProject === project.id ? null : project.id
                      )
                    }
                  >
                    {project.title}
                  </button>
                </li>
              ))}
            </ul>
            <div className="block h-[2px] w-full bg-myblue my-6" />
            <p className="text-gray-400">Télécharger le PDF</p>
          </div>

          {/* Contenu */}
          <div className="col-span-3">
            <ul className="space-y-4">
              {filteredProjects
                .filter(
                  (project) =>
                    selectedProject === null || project.id === selectedProject
                )
                .map((project) => (
                  <li
                    key={project.id}
                    className="p-4 border rounded-lg shadow-sm bg-white"
                  >
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="text-gray-600">Date: {project.date}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
