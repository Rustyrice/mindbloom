import React, { useState } from "react";

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
import {ReactComponent as Plant} from 'assets/img/plant-1573.svg';
// core components
function RevisionHeader() {
  function dailyView(){
    window.location.href = "/revision-daily";
  }
  function weeklyView(){
    window.location.href = "/revision-weekly";
  }
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
            < button className="daily-own" onClick={dailyView}>
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
        {/* <div
          className="moving-clouds"
          style={{
            backgroundImage: "url(" + require("assets/img/clouds.png") + ")"
          }}
        /> */}
      </div>
      <div className="section-dark" >
        <h3 className="presentation-desc-title">The Pomodoro System</h3>
        <p className="desc-text">
          The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.
          The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks.
          Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student.
          This method is based on the idea that frequent breaks can improve mental agility. The research on this technique has shown promising results. This is why we have chosen to use this technique for our revision page.
          For our page the pomodoros will be represented by plants as can be seen here. <Plant />
        </p>
      </div>
    </>
  );
}

export default RevisionHeader;