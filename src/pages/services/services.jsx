import RootNav from "../../components/navbar/navroot.jsx";
import ServicesHeader from "./header/servicesheader";
import ServicesContent from "./content/servicescontent";
import Footer from "../../components/footer/footer.jsx";

function Services() {

  return (
    <>
      <RootNav />
      <ServicesHeader/>
      <ServicesContent/>
      <Footer />
    </>
  );
}

export default Services;
