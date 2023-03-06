import React from "react";

// reactstrap components
import {
    ListGroup,
    ListGroupItem,
    Container
  } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";


function RevisionDailyPage(){
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("revision-landing-page");
    return function cleanup() {
      document.body.classList.remove("revision-landing-page");
    };
  });
    return (
      <>
        <div style={{
          backgroundImage:
            "url(" + require("assets/img/revision-page-background.jpg") + ")"
        }}  >
        <div className="filter" />
          <div className="content-center">
            <Container>
                <ListGroup>
                    <ListGroupItem>Subject</ListGroupItem>
                    <ListGroupItem>Number of Pomodoro</ListGroupItem>
                </ListGroup>
                
            </Container>
          </div>
        </div>
      </>
        
    );
}


export default RevisionDailyPage;