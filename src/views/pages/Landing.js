import React from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

// index sections
import SectionCarousel from "views/index-sections/SectionCarousel.js";
import SectionAboutUs from "views/index-sections/SectionAboutUs";
import SectionCards from "views/index-sections/SectionCards";


function LandingPage() {

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
        <SectionCards />
        <SectionCarousel />
        <SectionAboutUs />
        <DemoFooter />
      </div>
    </>
  );
}

export default LandingPage;
