import Hero from "../components/Hero";
import Header from "../components/Header";
import About from "../components/About";
import Project from "../components/Project";
import Team from "../components/Teams";
import Events from "../components/Events";
import Footer from "../components/Footer";

interface HeroData {
  data: {
    Video: { url: string };
  };
}

interface AboutData {
  data: {
    Title: string;
    Text: string;
  };
}

interface ProjectData {
  id: number;
  Title: string;
  Date: string;
}

interface TeamData {
  id: number;
  Name: string;
  Content: string;
  Image: { url: string };
}

interface EventData {
  id: number;
  Image: { url: string };
  actualites_tag: { Name: string };
  Nom_lien: string;
  Lien: string;
}

export default async function HomePage() {
  try {
    const [heroData, aboutData, projectData, teamsData, eventsData]: [
      HeroData,
      AboutData,
      { data: ProjectData[] },
      { data: TeamData[] },
      { data: EventData[] }
    ] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Video?populate=Video`, {
        next: { revalidate: 0 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/About`, {
        next: { revalidate: 0 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
        next: { revalidate: 0 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/teams?populate=Image`, {
        next: { revalidate: 0 },
      }).then((res) => res.json()),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/actualties?populate=*`, {
        next: { revalidate: 0 },
      }).then((res) => res.json()),
    ]);

    // Transformation des données des projets
    const projects =
      projectData?.data.map((project) => ({
        id: project.id,
        title: project.Title,
        date: project.Date,
      })) || [];

    // Transformation des données des équipes
    const teams =
      teamsData?.data.map((team) => ({
        id: team.id,
        name: team.Name,
        content: team.Content,
        imageUrl: team.Image?.url || "",
      })) || [];

    // Transformation des données des événements
    const events =
      eventsData?.data.map((event) => ({
        id: event.id,
        imageUrl: event.Image?.url || "",
        tag: event.actualites_tag?.Name?.trim().toLowerCase() || "",
        linkName: event.Nom_lien || "",
        linkUrl: event.Lien || "",
      })) || [];

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
        <Events events={events} />
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
