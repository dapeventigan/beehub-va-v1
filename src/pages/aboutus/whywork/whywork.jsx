import RootNav from "../../landingpage/navbar/navroot.jsx";
import WhyWorkHeader from "./header/whyworkheader.jsx";
import WhyWorkAbout from "./aboutus/whyworkabout.jsx";
import WhyWorkBeeHub from "./beehub/whyworkbeehub.jsx";
import WhyWorkStats from "./stats/whyworkstats.jsx";
import Footer from "../../landingpage/footer/footer.jsx";

function WhyWork() {

  return (
    <>
      <RootNav />
      <WhyWorkHeader/>
      <WhyWorkAbout/>
      <WhyWorkStats/>
      <WhyWorkBeeHub/>
      <Footer />
    </>
  );
}

export default WhyWork;
