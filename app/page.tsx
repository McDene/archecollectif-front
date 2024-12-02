import Hero from "../components/Hero";
import Header from "../components/Header";
import About from "../components/About";
import Project from "../components/Project";
import Team from "../components/Teams";
// import { fetchAPI } from "../lib/fetchAPI";

export default async function HomePage() {
  try {
    const [heroData, aboutData, projectData] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Video?populate=Video`, {
        next: { revalidate: 0 }, // Pas de cache
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/About`, {
        next: { revalidate: 0 }, // Pas de cache
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
        next: { revalidate: 0 }, // Pas de cache
      }).then((res) => res.json()),
    ]);

    const projects =
      projectData?.data.map(
        (project: { id: number; Title: string; Date: string }) => ({
          id: project.id,
          title: project.Title,
          date: project.Date,
        })
      ) || [];

    const videoUrl = heroData?.data?.Video?.url || "";
    const titleAbout = aboutData?.data?.Title || "Default Title";
    const textAbout = aboutData?.data?.Text || "Default Text";

    return (
      <>
        <Header />
        <Hero videoUrl={videoUrl} />
        <About titleAbout={titleAbout} textAbout={textAbout} />
        <Project projects={projects} />
        <Team />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    return (
      <>
        <Header />
        <h1>Something went wrong while fetching data.</h1>
      </>
    );
  }
}
