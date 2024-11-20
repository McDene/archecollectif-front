"use client";

import { FC, useState } from "react";

interface Project {
  id: number;
  title: string;
  date: string; // Format YYYY-MM-DD
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Récupérer les années uniques
  const uniqueYears = Array.from(
    new Set(projects.map((project) => project.date.split("-")[0]))
  );

  // Projets filtrés par année
  const filteredProjects = selectedYear
    ? projects.filter((project) => project.date.startsWith(selectedYear))
    : projects;

  return (
    <section className=" bg-gray-50 py-20 md:py-28 h-lvh">
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-6xl font-avenirBlack text-start text-myred pb-12">
          Nos Projets
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filtres */}
          <div className="col-span-1">
            {/* Filtre Année */}
            <ul className="space-y-2">
              {uniqueYears.map((year) => (
                <li key={year}>
                  <button
                    className={`w-full text-left py-2 px-4 rounded-lg ${
                      selectedYear === year
                        ? "bg-myblue text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-myblue hover:text-white"
                    }`}
                    onClick={() =>
                      setSelectedYear(selectedYear === year ? null : year)
                    }
                  >
                    {year}
                  </button>
                </li>
              ))}
            </ul>

            <br />
            <ul className="space-y-2">
              {filteredProjects.map((project) => (
                <li key={project.id}>
                  <button
                    className={`w-full text-left py-1 px-4 rounded-lg text-2xl font-avenirBlack ${
                      selectedProject === project.id
                        ? "text-myred"
                        : " text-myred  hover:underline"
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
