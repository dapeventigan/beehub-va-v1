import RootNav from "../landingpage/navbar/navroot";
import PlansPricingHeader from "./plans-pricing-header/plans-pricing-header";
import PlansPricingContent from "./plans-pricing-content/plans-pricing-content";
import Footer from "../landingpage/footer/footer";

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
