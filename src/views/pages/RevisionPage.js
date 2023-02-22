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
import RevisionHeader from "components/Headers/RevisionHeader.js";


function RevisionPage(){
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
      document.body.classList.add("revison-page");
      return function cleanup() {
        document.body.classList.remove("revision-page");
      };
    });
    return (
        <>
            <RevisionHeader />
        </>
    );
}

export default RevisionPage;