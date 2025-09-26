"use client";

import { FC, useState, useEffect, useMemo } from "react";
import { AiFillCaretDown, AiFillCaretUp, AiFillFilePdf } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { fetchAPI } from "../lib/fetchAPI";
import { toAbsoluteUrl } from "../lib/media";

interface Project {
  id: number;
  title: string;
  date: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

// ----- Helpers -----
const yearOf = (raw: string) => {
  const m = String(raw || "").match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : "Inconnu";
};

const ProjectsSection: FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null); // null = résumé
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [summaryImage, setSummaryImage] = useState<string | null>(null);
  const [summaryTitle, setSummaryTitle] = useState<string | null>(null);
  const [projectPDF, setProjectPDF] = useState<string | null>(null);
  const [projectNamePDF, setProjectNamePDF] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Années uniques (tri décroissant), robustes
  const uniqueYears = useMemo(
    () =>
      Array.from(new Set(projects.map((p) => yearOf(p.date))))
        .filter((y) => y !== "Inconnu")
        .sort((a, b) => parseInt(b) - parseInt(a)),
    [projects]
  );

  // Fall-back si pas d’année valide
  useEffect(() => {
    if (uniqueYears.length === 0) {
      setSelectedYearIndex(0);
    } else if (selectedYearIndex >= uniqueYears.length) {
      setSelectedYearIndex(0);
    }
  }, [uniqueYears, selectedYearIndex]);

  const selectedYear = uniqueYears[selectedYearIndex];

  // Années visibles (évite les doublons quand < 3 années)
  const visibleYears = useMemo(() => {
    const n = uniqueYears.length;
    if (n === 0) return [];
    if (n === 1) return [uniqueYears[0]];
    if (n === 2) {
      const prev = uniqueYears[(selectedYearIndex - 1 + n) % n];
      const curr = uniqueYears[selectedYearIndex];
      return prev === curr ? [curr] : [prev, curr];
    }
    return [
      uniqueYears[(selectedYearIndex - 1 + n) % n],
      uniqueYears[selectedYearIndex],
      uniqueYears[(selectedYearIndex + 1) % n],
    ];
  }, [uniqueYears, selectedYearIndex]);

  // Projets de l’année sélectionnée
  const filteredProjects = useMemo(
    () =>
      projects
        .filter((p) => yearOf(p.date) === selectedYear)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
    [projects, selectedYear]
  );

  // Chargement “Résumé de <year>”
  const loadSummaryData = async (year: string) => {
    if (!year) return;
    setLoading(true);
    try {
      const data = await fetchAPI(
        `/api/summary-projects?filters[Title][$eq]=Résumé de ${year}&populate=Image`
      );
      const imageUrl = toAbsoluteUrl(data?.data?.[0]?.Image?.url) || null;
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

  // Chargement d’un projet
  const loadProjectData = async (projectId: number) => {
    if (!projectId) return;
    setLoading(true);
    try {
      const data = await fetchAPI(
        `/api/projects?filters[id][$eq]=${projectId}&populate[Image]=*&populate[PDF]=*`
      );

      const images =
        data?.data?.[0]?.Image?.map((img: { url: string }) =>
          toAbsoluteUrl(img.url)
        ) || [];
      const pdf = toAbsoluteUrl(data?.data?.[0]?.PDF?.url) || null;
      const pdfName = data?.data?.[0]?.Descriptif_projet || null;

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

  // Quand l’année change → resume
  useEffect(() => {
    if (selectedYear) {
      loadSummaryData(selectedYear);
      setSelectedProject(null);
    }
  }, [selectedYear]);

  const handleScrollUp = () => {
    if (!uniqueYears.length) return;
    setSelectedYearIndex(
      (prev) => (prev - 1 + uniqueYears.length) % uniqueYears.length
    );
  };

  const handleScrollDown = () => {
    if (!uniqueYears.length) return;
    setSelectedYearIndex((prev) => (prev + 1) % uniqueYears.length);
  };

  return (
    <section
      id="projets"
      className="bg-gradient-to-b from-gray-100 to-gray-100 pb-20 pt-32 md:pb-36 md:pt-36 relative"
    >
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 relative -mt-14">
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-avenirBlack text-myred pb-12 lg:pb-24">
          projets
        </h1>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="col-span-1 flex flex-col justify-between">
            <div>
              {/* Mobile */}
              <div className="block lg:hidden">
                {/* Années */}
                <select
                  className="w-full p-2 mb-4 border-2 bg-transparent border-gray-200 rounded-xl focus:outline-none"
                  value={selectedYear || ""}
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
                  className="w-full p-2 mb-4 border-2 bg-transparent border-gray-200 rounded-xl focus:outline-none"
                  value={selectedProject || "summary"}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "summary") {
                      setSelectedProject(null);
                    } else {
                      const id = parseInt(value, 10);
                      setSelectedProject(id);
                      loadProjectData(id);
                    }
                  }}
                >
                  <option value="summary">{"Résumé de l'année"}</option>
                  {filteredProjects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Desktop */}
              <div className="hidden lg:block">
                <div className="flex items-center pb-3">
                  <div className="flex flex-col">
                    <button
                      className="mb-3"
                      onClick={handleScrollUp}
                      aria-label="Année précédente"
                    >
                      <AiFillCaretUp
                        className="text-myred hover:text-gray-400"
                        size={20}
                      />
                    </button>
                    <button
                      className="mb-1"
                      onClick={handleScrollDown}
                      aria-label="Année suivante"
                    >
                      <AiFillCaretDown
                        className="text-myred hover:text-gray-400"
                        size={20}
                      />
                    </button>
                  </div>

                  <ul className="space-y-2 flex flex-col justify-center items-center h-36">
                    {visibleYears.map((year, i) => (
                      <li key={`${year}-${i}`}>
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

                <ul className="space-y-2">
                  <li>
                    <button
                      className={`text-left py-1 rounded-lg text-2xl font-avenirBlack ${
                        selectedProject === null
                          ? "text-myred underline"
                          : "text-gray-400 hover:underline"
                      }`}
                      onClick={() => setSelectedProject(null)}
                    >
                      {"Résumé de l'année"}
                    </button>
                  </li>
                  {filteredProjects.map((project) => (
                    <li key={project.id}>
                      <button
                        className={`text-left py-1 rounded-lg text-2xl font-avenirBlack ${
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
            {selectedProject !== null && projectPDF && projectNamePDF && (
              <div className="flex flex-col mt-6">
                <p className="text-myred pb-4 text-sm">{projectNamePDF}</p>
                <a
                  href={projectPDF}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm space-x-2 text-myred hover:underline"
                  aria-label={`Télécharger le PDF : ${projectNamePDF}`}
                >
                  <span>Lire le PDF</span>
                  <AiFillFilePdf className="text-xl" />
                </a>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="col-span-3">
            {loading && (
              <div className="text-center h-[500px] md:h-[700px] bg-gray-200 rounded-3xl flex items-center justify-center">
                {/* skeleton simple */}
              </div>
            )}

            {!loading && selectedProject === null && summaryImage && (
              <div className="mb-8">
                <img
                  src={summaryImage}
                  alt={summaryTitle || "Résumé de l'année"}
                  className="w-full h-[500px] md:h-[700px] object-contain rounded-3xl bg-gray-200"
                />
              </div>
            )}

            {!loading && selectedProject !== null && (
              <Swiper
                grabCursor
                centeredSlides
                slidesPerView={1}
                loop={(projectImages?.length || 0) > 1}
                pagination={{ clickable: true }}
                navigation
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
                className="w-full h-[500px] md:h-[700px] projects-swiper to-myblue"
              >
                {projectImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-contain"
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
