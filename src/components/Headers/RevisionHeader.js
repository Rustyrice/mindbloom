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
function RevisionHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("assets/img/revision-page-background.jpg") + ")"
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">Mindbloom</h1>
              <h1 className="presentation-second-title">Revision</h1>
            </div>
            <h2 className="presentation-subtitle text-center">
              This is the revision page for our Software Processes Coursework!
            </h2>
            <div className="padded-div">
            <button className="daily-own" role="button" onclick="dailyView()">
              <span class="text">Daily View</span>
            </button>
            </div>
            <div className="padded-div">
            <button className="daily-own" role="button" onclick="weeklyView()">
              <span class="text">Weekly View</span>
            </button>
            </div>
          </Container>
        </div>
        <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")"
          }}
        />
      </div>

    </>
  );
}
function dailyView(){

}
function weeklyView(){

}

export default RevisionHeader;