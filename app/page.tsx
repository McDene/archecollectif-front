import Hero from "../components/Hero";
import Header from "../components/Header";
import About from "../components/About";
import Project from "../components/Project";
import Team from "../components/Teams";
import Footer from "../components/Footer";

export default async function HomePage() {
  try {
    const [heroData, aboutData, projectData, teamsData] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Video?populate=Video`, {
        next: { revalidate: 0 }, // Pas de cache
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/About`, {
        next: { revalidate: 0 }, // Pas de cache
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
        next: { revalidate: 0 }, // Pas de cache
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams?populate=Image`, {
        next: { revalidate: 0 }, // Pas de cache
      }).then((res) => res.json()),
    ]);

    // Transformation des données des projets
    const projects =
      projectData?.data.map(
        (project: { id: number; Title: string; Date: string }) => ({
          id: project.id,
          title: project.Title,
          date: project.Date,
        })
      ) || [];

    // Transformation des données des équipes
    const teams =
      teamsData?.data.map(
        (team: {
          id: number;
          Name: string;
          Content: string;
          Image: { url: string };
        }) => ({
          id: team.id,
          name: team.Name,
          content: team.Content,
          imageUrl: team.Image?.url || "",
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
        <Team teams={teams} />
        <Footer />
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
