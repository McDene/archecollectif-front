import Hero from "../components/Hero";
import Header from "../components/Header";
// import About from "../components/About";
import { fetchAPI } from "../lib/fetchAPI";

export default async function HomePage() {
  const heroData = await fetchAPI("/api/Video?populate=Video");
  const videoUrl = heroData?.data?.Video?.url || "";

  return (
    <>
      <Header />
      <Hero videoUrl={videoUrl} />
      {/* <About /> */}
    </>
  );
}
