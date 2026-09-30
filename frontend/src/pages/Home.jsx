import HomeHero from "../components/HomeHero";
import LatestRooms from "../components/LatestRooms";
import WhyStudyNook from "../components/WhyStudyNook";
import HomeCTA from "../components/HomeCTA";


function Home() {
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