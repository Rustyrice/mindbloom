import React from "react";
import { useHistory } from "react-router-dom";


import { Container } from "reactstrap";
import { ReactComponent as Plant } from 'assets/img/plant-1573.svg';

function RevisionHeader() {
  let history = useHistory();

  function dailyView(){
    history.push("/revision-daily");
  }

  function weeklyView(){
    history.push("/revision-weekly");
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
            <button className="daily-own" onClick={dailyView}>
              <span class="text">Daily View</span>
            </button>

            </div>
            <div className="padded-div">
            <button className="daily-own" onClick={weeklyView}>
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
    </>
  );
}

export default RevisionHeader;