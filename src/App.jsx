import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/landingpage/landingpage.jsx";
import Login from "./pages/login/login.jsx";
import Dashboard from "./pages/admin/dashboard/dashboard.jsx";
// import EmailVerify from "./pages/emailverifypage/emailverify.jsx";
import VirtualAssistance from "./pages/virtual/virtual-assistance.jsx";

//APPLY ROUTES
// import ApplyRegister from "./pages/apply/ApplyRegister/applyregister.jsx";
// import ApplyHome from "./pages/apply/ApplyHome/applyhome.jsx";
import InitalApplyRegister from "./pages/apply/ApplyRegister/initalapplyregister.jsx";
//JOIN ROUTES
// import JoinRegister from "./pages/join/JoinRegister/joinregister.jsx";
// import JoinHome from "./pages/join/JoinHome/joinhome.jsx";
import InitalJoinRegister from "./pages/join/JoinRegister/initaljoinregister.jsx";
//FORGOT PASSWORD
import CheckEmail from "./pages/forgotpassword/checkemail.jsx";
import ForgotPassword from "./pages/forgotpassword/forgotpassword.jsx";

//AboutUsFolder
import WhyWork from "./pages/aboutus/whywork/whywork.jsx";
import OurTeam from "./pages/aboutus/ourteam/ourteam.jsx";

//ServicesFolder
import Services from "./pages/services/services.jsx";

import "./App.css";
//RootLayout
import RootLayouts from "./layouts/rootlayouts.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayouts />}>
      <Route index element={<LandingPage />} />
      <Route path="applyregister" element={<InitalApplyRegister />} />
      <Route path="joinregister" element={<InitalJoinRegister />} />
      <Route path="login" element={<Login />} />
      <Route path="resetpasswordverify" element={<CheckEmail />} />
      <Route path="virtualassistant" element={<VirtualAssistance />} />
      <Route path="/admindashboard" element={<Dashboard />} />
      <Route path="/aboutus/why-work-with-us" element={<WhyWork />}></Route>
      <Route path="/aboutus/our-team" element={<OurTeam />}></Route>
      <Route path="/services" element={<Services />}></Route>
      {/* <Route path="/applyhome" element={<ApplyHome />} />
      <Route path="/joinhome" element={<JoinHome />} /> */}
      {/* <Route path="/verify/:id/:token" element={<EmailVerify />} /> */}
      <Route path="/reset/:id/:token" element={<ForgotPassword />} />

      <Route path="/*" element={<Navigate to="/" />} />
      {/* TODO: 404 page */}
      <Route path="*" element={<LandingPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
