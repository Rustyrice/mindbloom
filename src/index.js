import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import LandingPage from "views/pages/Landing.js";
// import NucleoIcons from "views/NucleoIcons.js";
import RegisterPage from "views/pages/Register.js";
import LoginPage from "views/pages/Login.js";
import RevisionPage from "views/pages/RevisionLanding.js";
import RevisionDailyPage from "views/pages/RevisionDaily.js";
import RevisionWeeklyPage from "views/pages/RevisionWeekly.js";
import DashboardPage from "views/pages/Dashboard.js";
import SleepPage from "views/pages/Sleep.js";
import WaterPage from "views/pages/Water.js";
// others

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/index"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route
        path="/login-page"
        render={(props) => <LoginPage {...props} />}
      />
       <Route
        path="/revision-landing-page"
        render={(props) => <RevisionPage {...props} />}
      />
      <Route
        path="/revision-daily"
        render={(props) => <RevisionDailyPage {...props} />}
      />
      <Route
        path="/revision-weekly"
        render={(props) => <RevisionWeeklyPage {...props} />}
      />
      <Route
        path ="/dashboard"
        render={(props) => <DashboardPage {...props} />}
      />
      <Route
          path ="/sleep"
          render={(props) => <SleepPage {...props} />}
      />
      <Route
          path ="/water"
          render={(props) => <WaterPage {...props} />}
      />
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>
);

