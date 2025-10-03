"use client";
/* eslint-disable @next/next/no-img-element */

import { FC, useState, useEffect, useMemo, useRef } from "react";
import { AiFillFilePdf, AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
  Navigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { fetchAPI } from "../lib/fetchAPI";
import { toAbsoluteUrl } from "../lib/media";
import dynamic from "next/dynamic";

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
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);
  const [projectPDF, setProjectPDF] = useState<string | null>(null);
  const [projectNamePDF, setProjectNamePDF] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPdfModalOpen, setPdfModalOpen] = useState(false);
  const pdfModalRef = useRef<HTMLDialogElement | null>(null);

  const PdfLightViewer = useMemo(
    () => dynamic(() => import("./PdfLightViewer"), { ssr: false }),
    []
  );

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

  // (Résumé annuel supprimé)

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

  // Quand l’année change → sélectionner automatiquement le 1er projet de l’année
  useEffect(() => {
    if (!selectedYear) return;
    if (filteredProjects.length > 0) {
      const firstId = filteredProjects[0].id;
      setSelectedProject(firstId);
      loadProjectData(firstId);
    } else {
      setSelectedProject(null);
      setProjectImages([]);
      setProjectPDF(null);
      setProjectNamePDF(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, filteredProjects.length]);

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

  // Fermer le modal si la fenêtre passe sous le breakpoint lg (1024px)
  useEffect(() => {
    const onResize = () => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        setPdfModalOpen(false);
        try {
          pdfModalRef.current?.close();
        } catch {}
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      id="projets"
      className="bg-gradient-to-b from-gray-100 to-gray-100 pb-20 pt-32 md:pb-36 md:pt-36 relative"
    >
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 relative -mt-14">
        <h1 className="text-6xl md:text-7xl lg:text-9xl font-avenirBlack text-myred pb-12 lg:pb-24">
          projets
        </h1>
        {/* Barre de contrôle: sélecteur d'année (gauche avec flèches) + PDF (à gauche, à côté) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-4 md:gap-6 pb-6 md:pb-10">
          <div className="flex items-center gap-3">
            {/* Mobile: simple select */}
            <div className="block lg:hidden">
              <label htmlFor="yearSelect" className="sr-only">
                Sélectionner l&apos;année
              </label>
              <select
                id="yearSelect"
                className="select select-bordered select-sm rounded-full bg-transparent border-gray-300 text-gray-700 focus:outline-none focus:border-myred"
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
            </div>

            {/* Desktop: flèches + années visibles */}
            <div className="hidden lg:block">
              <div className="flex items-center pb-1">
                <div className="flex flex-col">
                  <button
                    className="mb-2"
                    onClick={handleScrollUp}
                    aria-label="Année précédente"
                    type="button"
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
                    type="button"
                  >
                    <AiFillCaretDown
                      className="text-myred hover:text-gray-400"
                      size={20}
                    />
                  </button>
                </div>

                <ul className="space-y-1 flex flex-col justify-center items-center h-28">
                  {visibleYears.map((year, i) => (
                    <li key={`${year}-${i}`}>
                      <button
                        type="button"
                        className={`w-full px-4 rounded-lg ${
                          year === selectedYear
                            ? "text-myred font-avenirBlack text-3xl"
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
            </div>
          </div>

          {selectedProject !== null && projectPDF && projectNamePDF && (
            <div className="flex items-center gap-4 md:pl-6">
              <a
                href={projectPDF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-myred hover:underline"
                aria-label={`Ouvrir le PDF : ${projectNamePDF}`}
              >
                <span className="text-sm md:text-base">{projectNamePDF}</span>
                <AiFillFilePdf className="text-xl" />
              </a>
              {/^https?:\/\/res\.cloudinary\.com\//.test(projectPDF) && (
                <button
                  type="button"
                  className="hidden lg:inline-flex btn btn-outline btn-xs rounded-full text-myred border-myred hover:bg-myred hover:text-white"
                  onClick={() => {
                    setPdfModalOpen(true);
                    pdfModalRef.current?.showModal();
                  }}
                >
                  Aperçu rapide
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Carrousel à 100% de la largeur du conteneur */}
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4">
        {loading && (
          <div className="text-center h-[420px] md:h-[600px] flex items-center justify-center">
            {/* skeleton simple */}
          </div>
        )}

        {!loading && selectedProject !== null && projectImages.length > 0 && (
          <Swiper
            grabCursor
            centeredSlides
            slidesPerView={1}
            loop={projectImages.length > 1}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            className="w-full h-[420px] md:h-[600px] to-myblue"
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

        {/* Modal d'aperçu PDF (daisyUI) */}
        <dialog
          ref={pdfModalRef}
          className="modal"
          onClose={() => setPdfModalOpen(false)}
        >
          <div className="modal-box max-w-5xl w-11/12">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-avenirBlack text-lg text-myred">Aperçu PDF</h3>
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost"
                  aria-label="Fermer"
                  onClick={() => setPdfModalOpen(false)}
                >
                  ✕
                </button>
              </form>
            </div>
            {!loading && selectedProject !== null && projectPDF && isPdfModalOpen && (
              <PdfLightViewer pdfUrl={projectPDF} />
            )}
            <div className="mt-4 text-right">
              <a
                href={projectPDF ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline rounded-full text-myred border-myred hover:bg-myred hover:text-white"
              >
                Ouvrir dans un nouvel onglet
              </a>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button aria-label="Fermer l’aperçu">close</button>
          </form>
        </dialog>
      </div>
    </section>
  );
};

export default ProjectsSection;
