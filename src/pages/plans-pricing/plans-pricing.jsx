import RootNav from "../../components/navbar/navroot.jsx";
import PlansPricingHeader from "./plans-pricing-header/plans-pricing-header";
import PlansPricingContent from "./plans-pricing-content/plans-pricing-content";
import Footer from "../../components/footer/footer.jsx";

function PlansPricing() {

  return (
    <>
      <RootNav />
      <PlansPricingHeader/>
      <PlansPricingContent/>
      <Footer />
    </>
  );
}

export default PlansPricing;
