import Hero from "../components/Hero";
import Header from "../components/Header";
import About from "../components/About";
import { fetchAPI } from "../lib/fetchAPI";

export default async function HomePage() {
  const heroData = await fetchAPI("/api/Video?populate=Video");
  const videoUrl = heroData?.data?.Video?.url || "";

  const aboutData = await fetchAPI("/api/About");
  const titleAbout = aboutData?.data?.Title || "";
  const textAbout = aboutData?.data?.Text || "";

  console.log("Rendering page...");
  return (
    <>
      <Header />
      <Hero videoUrl={videoUrl} />
      <About titleAbout={titleAbout} textAbout={textAbout} />
    </>
  );
}
