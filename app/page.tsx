// Home.tsx
"use client";

import { FC } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProjectsSection from "../components/Project";
import Teams from "../components/Teams";
import Events from "../components/Events";
import Footer from "../components/Footer";

const Home: FC = () => {
  const projectsData = [
    {
      year: "2024",
      name: "Projet A",
      images: [
        "/images/1.jpg",
        "/images/2.jpg",
        "/images/3.jpg",
        "/images/4.jpg",
      ],
      pdf: "/pdfs/projetA.pdf",
    },
    {
      year: "2024",
      name: "Projet B",
      images: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"],
      pdf: "/pdfs/projetC.pdf",
    },
    {
      year: "2023",
      name: "Projet C",
      images: ["/images/1.jpg", "/images/2.jpg", "/images/4.jpg"],
      pdf: "/pdfs/projetB.pdf",
    },
  ];

  return (
    <>
      <Header />
      <Hero />
      <ProjectsSection projectsData={projectsData} />
      <Teams />
      <Events />
      <Footer />
    </>
  );
};

export default Home;
