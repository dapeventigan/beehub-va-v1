import RootNav from "../landingpage/navbar/navroot";
import VirtualHeader from "./virtual-header/virtual-header";
import VirtualAssistance from "./virtual-assistance/virtual-assistance";
import Footer from "../landingpage/footer/footer";

function VirtualHome() {

  return (
    <>
      <RootNav />
      <VirtualHeader />
      <VirtualAssistance/>
      <Footer />
    </>
  );
}

export default VirtualHome;
