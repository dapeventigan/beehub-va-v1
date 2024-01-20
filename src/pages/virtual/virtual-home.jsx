import RootNav from "../../components/navbar/navroot.jsx";
import VirtualHeader from "./virtual-header/virtual-header";
import VirtualAssistance from "./virtual-assistance/virtual-assistance";
import Footer from "../../components/footer/footer.jsx";

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
