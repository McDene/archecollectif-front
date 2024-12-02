"use client";

import { FC, useState, useEffect } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { fetchAPI } from "../lib/fetchAPI";

interface Project {
  id: number;
  title: string;
  date: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Récupérer les années uniques
  const uniqueYears = Array.from(
    new Set(projects.map((project) => project.date.split("-")[0]))
  );

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

  // Charger les images d'un projet
  const loadProjectImages = async (projectId: number) => {
    setLoading(true);
    try {
      const data = await fetchAPI(
        `/api/projects?filters[id][$eq]=${projectId}&populate[Image]=*&timestamp=${Date.now()}`
      );

      const images = data?.data[0]?.Image.map(
        (img: { url: string }) => img.url
      );
      setProjectImages(images || []);
    } catch (error) {
      console.error("Error fetching project images:", error);
      setProjectImages([]);
    } finally {
      setLoading(false);
    }
  };

  // Charger les images initiales du premier projet de l'année sélectionnée
  useEffect(() => {
    if (filteredProjects.length > 0) {
      const firstProject = filteredProjects[0];
      setSelectedProject(firstProject.id);
      loadProjectImages(firstProject.id);
    } else {
      setSelectedProject(null);
      setProjectImages([]);
    }
  }, [selectedYear]);

  // Gestion des boutons "Monté" et "Descendre"
  const handleScrollUp = () => {
    setSelectedYearIndex(
      (prev) => (prev - 1 + uniqueYears.length) % uniqueYears.length
    );
  };

  const handleScrollDown = () => {
    setSelectedYearIndex((prev) => (prev + 1) % uniqueYears.length);
  };

  return (
    <section className="bg-gray-50 py-20 md:py-28 min-h-lvh">
      <div className="max-w-7xl mx-auto px-4">
        {/* <h1 className="text-5xl md:text-8xl font-avenirBlack text-center text-myblue pb-10 md:pb-16">
          Nos Projets
        </h1> */}

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8">
          {/* Filtres */}
          <div className="col-span-1 flex flex-col">
            <div className="flex items-center justify-between">
              <button onClick={handleScrollDown}>
                <AiFillMinusCircle
                  className="text-gray-400 hover:text-myred"
                  size={30}
                />
              </button>

              <ul className="space-y-2 flex flex-col justify-center items-center h-36">
                {visibleYears.map((year) => (
                  <li key={year}>
                    <button
                      className={`w-full px-4 rounded-lg ${
                        year === selectedYear
                          ? "text-myred font-avenirBlack text-4xl"
                          : "text-gray-400 font-avenirRegular hover:underline"
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

              <button onClick={handleScrollUp}>
                <AiFillPlusCircle
                  className="text-gray-400 hover:text-myred"
                  size={30}
                />
              </button>
            </div>

            <div className="block h-[2px] w-full bg-myblue my-6" />

            <ul className="space-y-2">
              {filteredProjects.map((project) => (
                <li key={project.id}>
                  <button
                    className={`text-left py-1 px-4 rounded-lg text-3xl font-avenirBlack ${
                      selectedProject === project.id
                        ? "text-myred underline"
                        : "text-gray-400 hover:underline"
                    }`}
                    onClick={() => {
                      setSelectedProject(project.id);
                      loadProjectImages(project.id);
                    }}
                  >
                    {project.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contenu */}
          <div className="col-span-3">
            {loading ? (
              <div className="text-center h-[500px] md:h-[700px] bg-gray-100 rounded-3xl"></div>
            ) : (
              <Swiper
                grabCursor
                centeredSlides
                slidesPerView={1}
                effect="coverflow"
                loop
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="w-full h-[500px] md:h-[700px]"
              >
                {projectImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-3xl "
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
