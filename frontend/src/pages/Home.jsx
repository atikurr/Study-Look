import useTitle from "../hooks/useTitle";
import HomeHero from "../components/HomeHero";
import LatestRooms from "../components/LatestRooms";
import WhyStudyNook from "../components/WhyStudyNook";
import HomeCTA from "../components/HomeCTA";

function Home() {
  useTitle("Home");

  return (
    <main>
      <HomeHero />
      <LatestRooms />
      <WhyStudyNook />
      <HomeCTA />
    </main>
  );
}

export default Home;