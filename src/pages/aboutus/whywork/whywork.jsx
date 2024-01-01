import RootNav from "../../landingpage/navbar/navroot.jsx";
import WhyWorkHeader from "./header/whyworkheader.jsx";
import WhyWorkAbout from "./aboutus/whyworkabout.jsx";
import WhyWorkStats from "./stats/whyworkstats.jsx";
import Footer from "../../landingpage/footer/footer.jsx";

function WhyWork() {

  return (
    <>
      <RootNav />
      <WhyWorkHeader/>
      <WhyWorkAbout/>
      <WhyWorkStats/>
      <Footer />
    </>
  );
}

export default WhyWork;
