import React from "react";

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Col
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
              <table class="tg" >
                <thead>
                  <tr>
                    <th class="tg-0lax">Subject</th>
                    <th class="tg-0lax">Number of Pomodoro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="tg-0lax"></td>
                    <td class="tg-sjuo"></td>
                  </tr>
                  <tr>
                    <td class="tg-0lax"></td>
                    <td class="tg-sjuo"></td>
                  </tr>
                  <tr>
                    <td class="tg-0lax"></td>
                    <td class="tg-sjuo"></td>
                  </tr>
                  <tr>
                    <td class="tg-0lax"></td>
                    <td class="tg-sjuo"></td>
                  </tr>
                  <tr>
                    <td class="tg-0lax"></td>
                    <td class="tg-sjuo"></td>
                  </tr>
                  <tr>
                    <td class="tg-0lax"></td>
                    <td class="tg-sjuo"></td>
                  </tr>
                  <tr>
                    <td class="tg-0lax"></td>
                    <td class="tg-sjuo"></td>
                  </tr>
                  <tr>
                    <td class="tg-0lax"></td>
                    <td class="tg-sjuo"></td>
                  </tr>
                </tbody>
              </table>
            </Container>
          </div>
        </div>
      </>
        
    );
}


export default RevisionDailyPage;