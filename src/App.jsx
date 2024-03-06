import { useState, useEffect } from "react";
import Axios from "axios";
import io from "socket.io-client";

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
import EmailVerify from "./pages/emailverifypage/emailverify.jsx";
import VirtualHome from "./pages/virtual/virtual-home.jsx";
import PlansPricing from "./pages/plans-pricing/plans-pricing.jsx";

//APPLY ROUTES
import ApplyHome from "./pages/apply/ApplyHome/applyhome.jsx";

//JOIN ROUTES
import JoinHome from "./pages/join/JoinHome/joinhome.jsx";

//FORGOT PASSWORD
import CheckEmail from "./pages/forgotpassword/checkemail.jsx";
import ForgotPassword from "./pages/forgotpassword/forgotpassword.jsx";

//AboutUsFolder
import WhyWork from "./pages/aboutus/whywork/whywork.jsx";
import OurTeam from "./pages/aboutus/ourteam/ourteam.jsx";

//ServicesFolder
import Services from "./pages/services/services.jsx";

//RootLayout
import RootLayouts from "./layouts/rootlayouts.jsx";

//JOB BOARDS
import JobBoard from "./pages/jobboards/jobboards.jsx";
import ChosenJob from "./pages/jobboards/chosenjob/chosenjob.jsx";

//VA BOARDS
import VABoards from "./pages/vaboards/vaboards.jsx";

//HIRE
import AdminHire from "./pages/admin/hire/hire.jsx";

//Training
import AdminTraining from "./pages/admin/training/training.jsx";

import "./App.css";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayouts />}>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="resetpasswordverify" element={<CheckEmail />} />
      <Route path="virtual-assistant" element={<VirtualHome />} />
      <Route path="/admindashboard" element={<Dashboard />} />
      <Route path="/admindashboard/hire" element={<AdminHire />} />
      <Route path="/admindashboard/training" element={<AdminTraining />} />
      <Route path="/aboutus" element={<WhyWork />}></Route>
      <Route path="/aboutus/our-team" element={<OurTeam />}></Route>
      <Route path="services" element={<Services />}></Route>
      <Route path="plans-and-pricing" element={<PlansPricing />}></Route>
      <Route path="/va-bh/:username/:id" element={<ApplyHome />} />
      <Route path="/profile-beehub" element={<JoinHome />} />
      <Route path="/verify/:id/:token" element={<EmailVerify />} />
      <Route path="/reset/:id/:token" element={<ForgotPassword />} />
      <Route path="/job-boards" element={<JobBoard />} />
      <Route path="/job-boards/bh/:id" element={<ChosenJob />} />
      <Route path="/va-boards" element={<VABoards />} />

      <Route path="/*" element={<Navigate to="/" />} />
      {/* TODO: 404 page */}
      <Route path="*" element={<LandingPage />} />
    </Route>
  )
);

export const socket = io("https://server.beehubvas.com", {
  withCredentials: true,
});

function App() {
  const [isUserLogged, setIsUserLogged] = useState(false);

  socket.on("refresh", () => {
    window.location.reload();
  });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const getUserID = async () => {
      try {
        await Axios.get("https://server.beehubvas.com/verifylogin").then((res) => {
          if (res.data !== "User not found") {
            socket.emit("authenticate", res.data._id);

            setIsUserLogged(true);
          } else {
            setIsUserLogged(false);
          }
        });
      } catch (error) {}
    };
    getUserID();
  }, [isUserLogged]);

  return <RouterProvider router={router} />;
}

export default App;
