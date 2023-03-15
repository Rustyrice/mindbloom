import React from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Button } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

// index sections
import SectionButtons from "views/index-sections/SectionButtons.js";
import SectionNavbars from "views/index-sections/SectionNavbars.js";
import SectionNavigation from "views/index-sections/SectionNavigation.js";
import SectionProgress from "views/index-sections/SectionProgress.js";
import SectionNotifications from "views/index-sections/SectionNotifications.js";
import SectionTypography from "views/index-sections/SectionTypography.js";
import SectionJavaScript from "views/index-sections/SectionJavaScript.js";
import SectionCarousel from "views/index-sections/SectionCarousel.js";
import SectionNucleoIcons from "views/index-sections/SectionNucleoIcons.js";
import SectionDark from "views/index-sections/SectionDark.js";
import SectionLogin from "views/index-sections/SectionLogin.js";
import SectionAboutUs from "views/index-sections/SectionAboutUs";
// import SectionDownload from "views/index-sections/SectionDownload.js";
import SectionCards from "views/index-sections/SectionCards";


function Index() {
  const history = useHistory();

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <IndexNavbar />
      <IndexHeader />
      <div className="main">
        <div>
          {/* Usefull links */}
          <Button color="primary" onClick={() => history.push("revision-landing-page")}> Revision Page </Button>
          <Button color="primary" onClick={() => history.push("dashboard")}> Dashboard Page </Button>
        </div>
        <SectionButtons />
        <SectionNavbars />
        <SectionNavigation /> 
        <SectionProgress />
        <SectionNotifications />
        <SectionTypography />
        <SectionCards />
        <SectionJavaScript /> 
        <SectionCarousel />
        <SectionAboutUs />
        <SectionNucleoIcons /> 
        <SectionDark />
        <SectionLogin />
        {/* <SectionDownload /> */}
        <DemoFooter />
      </div>
    </>
  );
}

export default Index;
