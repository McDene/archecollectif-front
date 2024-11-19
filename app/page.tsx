import Hero from "../components/Hero";
import Header from "../components/Header";
// import About from "../components/About";
import { fetchAPI } from "../lib/fetchAPI";

export default async function HomePage() {
  console.log("Fetching data...");
  const heroData = await fetchAPI("/api/Video?populate=Video");
  console.log("Data fetched:", heroData);
  const videoUrl = heroData?.data?.Video?.url || "";

  console.log("Rendering page...");
  return (
    <>
      <Header />
      <Hero videoUrl={videoUrl} />
      {/* <About /> */}
    </>
  );
}
