import React from "react";
import { useHistory } from "react-router-dom";

import { Container } from "reactstrap";

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
      </div>
    </>
  );
}

export default RevisionHeader;