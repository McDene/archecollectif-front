import Hero from "../components/Hero";
import Header from "../components/Header";
import About from "../components/About";
import Project from "../components/Project";
import { fetchAPI } from "../lib/fetchAPI";

export default async function HomePage() {
  try {
    // Récupération parallèle des données
    const [heroData, aboutData, projectData] = await Promise.all([
      fetchAPI("/api/Video?populate=Video").catch((err) => {
        console.error("Error fetching hero data:", err);
        return null;
      }),
      fetchAPI("/api/About").catch((err) => {
        console.error("Error fetching about data:", err);
        return null;
      }),
      fetchAPI("/api/projects").catch((err) => {
        console.error("Error fetching project data:", err);
        return null;
      }),
    ]);

    // Extraction des données Hero
    const videoUrl = heroData?.data?.Video?.url || "";

    // Extraction des données About
    const titleAbout = aboutData?.data?.Title || "Default Title";
    const textAbout = aboutData?.data?.Text || "Default Text";

    // Extraction des données Project
    const projects =
      projectData?.data.map(
        (project: { id: number; Title: string; Date: string }) => ({
          id: project.id,
          title: project.Title,
          date: project.Date,
        })
      ) || [];

    console.log("Rendering page...");
    return (
      <>
        <Header />
        <Hero videoUrl={videoUrl} />
        <About titleAbout={titleAbout} textAbout={textAbout} />
        <Project projects={projects} />
      </>
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return (
      <>
        <Header />
        <h1>Something went wrong</h1>
      </>
    );
  }
}
