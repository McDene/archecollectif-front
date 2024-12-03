"use client";

import { FC, useState, useEffect } from "react";
import { AiFillCaretDown, AiFillCaretUp, AiFillFilePdf } from "react-icons/ai";
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
  const [selectedProject, setSelectedProject] = useState<number | null>(null); // Active project ID or null for summary
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [summaryImage, setSummaryImage] = useState<string | null>(null);
  const [summaryTitle, setSummaryTitle] = useState<string | null>(null);
  const [projectPDF, setProjectPDF] = useState<string | null>(null);
  const [projectNamePDF, setProjectNamePDF] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const selectedYear = uniqueYears[selectedYearIndex];
  const filteredProjects = projects.filter((project) =>
    project.date.startsWith(selectedYear)
  );

  const loadSummaryData = async (year: string) => {
    setLoading(true);
    try {
      const data = await fetchAPI(
        `/api/summary-projects?filters[Title][$eq]=Résumé de ${year}&populate=Image`
      );
      const imageUrl = data?.data?.[0]?.Image?.url || null;
      const title = data?.data?.[0]?.Title || null;

      setSummaryImage(imageUrl);
      setSummaryTitle(title);
    } catch (error) {
      console.error("Error fetching summary data:", error);
      setSummaryImage(null);
      setSummaryTitle(null);
    } finally {
      setLoading(false);
    }
  };

  const loadProjectData = async (projectId: number) => {
    setLoading(true);
    try {
      const data = await fetchAPI(
        `/api/projects?filters[id][$eq]=${projectId}&populate[Image]=*&populate[PDF]=*`
      );

      const images =
        data?.data?.[0]?.Image?.map((img: { url: string }) => img.url) || [];
      const pdf = data?.data?.[0]?.PDF?.url || null;
      const pdfName = data?.data?.[0]?.PDF_Name || null;

      setProjectImages(images);
      setProjectPDF(pdf);
      setProjectNamePDF(pdfName);
    } catch (error) {
      console.error("Error fetching project data:", error);
      setProjectImages([]);
      setProjectPDF(null);
      setProjectNamePDF(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedYear) {
      loadSummaryData(selectedYear);
      setSelectedProject(null); // Reset to summary on year change
    }
  }, [selectedYear]);

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
        <h1 className="text-5xl md:text-8xl block lg:hidden font-avenirBlack text-center text-myblue pb-10 md:pb-16">
          Projets
        </h1>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="col-span-1 flex flex-col justify-between">
            <div>
              {/* Version mobile */}
              <div className="block lg:hidden">
                {/* Années */}
                <select
                  className="w-full p-2 mb-4 border bg-gray-50 border-gray-200 rounded-xl focus:outline-none"
                  value={selectedYear}
                  onChange={(e) =>
                    setSelectedYearIndex(uniqueYears.indexOf(e.target.value))
                  }
                >
                  {uniqueYears.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                {/* Projets */}
                <select
                  className="w-full p-2 mb-4 border bg-gray-50 border-gray-200 rounded-xl focus:outline-none"
                  value={selectedProject || "summary"}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "summary") {
                      setSelectedProject(null);
                    } else {
                      setSelectedProject(parseInt(value, 10));
                      loadProjectData(parseInt(value, 10));
                    }
                  }}
                >
                  <option value="summary">
                    {summaryTitle || "Résumé de l'année"}
                  </option>
                  {filteredProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Version desktop */}
              <div className="hidden lg:block">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <button className="mb-3" onClick={handleScrollUp}>
                      <AiFillCaretUp
                        className="text-gray-400 hover:text-myred"
                        size={25}
                      />
                    </button>
                    <button className="mb-3" onClick={handleScrollDown}>
                      <AiFillCaretDown
                        className="text-gray-400 hover:text-myred"
                        size={25}
                      />
                    </button>
                  </div>

                  <ul className="space-y-2 flex flex-col justify-center items-center h-36">
                    {visibleYears.map((year) => (
                      <li key={year}>
                        <button
                          className={`w-full px-6 rounded-lg ${
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
                </div>

                <div className="block h-[2px] w-full bg-myblue my-6" />

                <ul className="space-y-2">
                  <li>
                    <button
                      className={`text-left py-1 rounded-lg text-3xl font-avenirBlack ${
                        selectedProject === null
                          ? "text-myred underline"
                          : "text-gray-400 hover:underline"
                      }`}
                      onClick={() => setSelectedProject(null)}
                    >
                      {summaryTitle || "Résumé de l'année"}
                    </button>
                  </li>
                  {filteredProjects.map((project) => (
                    <li key={project.id}>
                      <button
                        className={`text-left py-1 rounded-lg text-3xl font-avenirBlack ${
                          selectedProject === project.id
                            ? "text-myred underline"
                            : "text-gray-400 hover:underline"
                        }`}
                        onClick={() => {
                          setSelectedProject(project.id);
                          loadProjectData(project.id);
                        }}
                      >
                        {project.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* PDF download link */}
            {projectPDF && (
              <div className="flex items-center mt-6">
                <a
                  href={projectPDF}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-myred hover:underline text-lg"
                  aria-label={`Télécharger le PDF : ${projectNamePDF}`}
                >
                  <span>{projectNamePDF}</span>
                  <AiFillFilePdf className="text-2xl" />
                </a>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="col-span-3">
            {selectedProject === null && summaryImage && (
              <div className="mb-8">
                <img
                  src={summaryImage}
                  alt={summaryTitle || "Résumé de l'année"}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            )}

            {selectedProject !== null && (
              <Swiper
                grabCursor
                centeredSlides
                slidesPerView={1}
                effect="coverflow"
                loop={projectImages.length > 1}
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
                      className="w-full h-full object-cover rounded-3xl"
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
