import Hero from "../components/Hero";
import Header from "../components/Header";
import About from "../components/About";
import Project from "../components/Project"; // reçoit les projets
import Team from "../components/Teams";
import Events from "../components/Events";
import Footer from "../components/Footer";
import { toAbsoluteUrl } from "../lib/media";

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
  Lien: string | null;
  PDF?: { url: string } | null;
  Event_content: string;
}

type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type StrapiListResponse<T> = {
  data: T[];
  meta?: { pagination?: StrapiPagination };
};

/** Récupère TOUTES les pages de /api/projects (Strapi v4) */
async function fetchAllProjects(baseUrl: string, pageSize = 200) {
  let page = 1;
  const all: ProjectData[] = [];

  // boucle jusqu'à tout récupérer
  while (true) {
    const url =
      `${baseUrl}/api/projects` +
      `?pagination[page]=${page}` +
      `&pagination[pageSize]=${pageSize}` +
      `&sort=Date:desc` +
      `&fields[0]=Title&fields[1]=Date`;

    const res = await fetch(url, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error(`Projects fetch failed (page ${page})`);
    const json = (await res.json()) as StrapiListResponse<ProjectData>;

    const items = json?.data ?? [];
    all.push(...items);

    const pag = json?.meta?.pagination;
    if (!pag || page >= pag.pageCount) break;
    page += 1;
  }

  return all;
}

export default async function HomePage() {
  try {
    const API = process.env.NEXT_PUBLIC_API_URL as string;

    const [heroData, aboutData, allProjects, teamsData, eventsData]: [
      HeroData,
      AboutData,
      ProjectData[],
      StrapiListResponse<TeamData>,
      StrapiListResponse<EventData>
    ] = await Promise.all([
      fetch(`${API}/api/Video?populate=Video`, {
        next: { revalidate: 0 },
      }).then((r) => r.json()),
      fetch(`${API}/api/About`, { next: { revalidate: 0 } }).then((r) =>
        r.json()
      ),
      fetchAllProjects(API, 200), // ← récupère toutes les pages
      fetch(`${API}/api/teams?populate=Image`, {
        next: { revalidate: 0 },
      }).then((r) => r.json()),
      fetch(`${API}/api/actualties?populate=*`, {
        next: { revalidate: 0 },
      }).then((r) => r.json()),
    ]);

    // Transformation des projets
    const projects =
      (allProjects ?? []).map((project) => ({
        id: project.id,
        title: project.Title,
        date: project.Date,
      })) || [];

    // Transformation des équipes
    const teams =
      (teamsData?.data ?? []).map((team) => ({
        id: team.id,
        name: team.Name,
        content: team.Content,
        imageUrl: toAbsoluteUrl(team.Image?.url),
      })) || [];

    // Transformation des événements
    const events =
      (eventsData?.data ?? []).map((event) => ({
        id: event.id,
        imageUrl: toAbsoluteUrl(event.Image?.url),
        tag: event.actualites_tag?.Name?.trim().toLowerCase() || "",
        linkName: event.Nom_lien || "",
        linkUrl: event.Lien || toAbsoluteUrl(event.PDF?.url) || "",
        eventContent: event.Event_content || "",
      })) || [];

    const videoUrl = toAbsoluteUrl(heroData?.data?.Video?.url) || "";
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
