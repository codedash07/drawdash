import Footer from "./landing-page/footer";
import FourthSection from "./landing-page/fourthSection";
import HeroSection from "./landing-page/heroSection";
import NavBar from "./landing-page/navbar";
import SecondSection from "./landing-page/secondSection";
import ThirdSection from "./landing-page/thirdSection";

function Landing() {
  return (
    <div className="text-[#2B2118]">
      <NavBar />
      <HeroSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <Footer />
    </div>
  );
}

export default Landing;
