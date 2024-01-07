import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="68162380214-b3bm7kd1kuk38k4h8k9s1b6pat2mv1rs.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
