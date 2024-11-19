import Hero from "../components/Hero";
import Header from "../components/Header";
import About from "../components/About";
import { fetchAPI } from "../lib/fetchAPI";

export default async function HomePage() {
  try {
    const [heroData, aboutData] = await Promise.all([
      fetchAPI("/api/Video?populate=Video").catch((err) => {
        console.error("Error fetching hero data:", err);
        return null;
      }),
      fetchAPI("/api/About").catch((err) => {
        console.error("Error fetching about data:", err);
        return null;
      }),
    ]);

    const videoUrl = heroData?.data?.Video?.url || "";
    const titleAbout = aboutData?.data?.Title || "Default Title";
    const textAbout = aboutData?.data?.Text || "Default Text";

    console.log("Rendering page...");
    return (
      <>
        <Header />
        <Hero videoUrl={videoUrl} />
        <About titleAbout={titleAbout} textAbout={textAbout} />
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
