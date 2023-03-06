import React, { useState, useRef, useEffect } from "react";

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



const App = () => {
  const Ref = useRef(null);

  const [timer, setTimer] = useState('00:00:00');

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return {
      total, hours, minutes, seconds
    };
  }

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } 
                = getTimeRemaining(e);
    if (total >= 0) {

        // update the timer
        // check if less than 10 then we need to 
        // add '0' at the beginning of the variable
        setTimer(
            (hours > 9 ? hours : '0' + hours) + ':' +
            (minutes > 9 ? minutes : '0' + minutes) + ':'
            + (seconds > 9 ? seconds : '0' + seconds)
        )
    }
}

const clearTimer = (e) => {
  
    // set the timer to 10 sec
    setTimer('00:00:10');

    // clear the timer
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
        startTimer(e);
    }, 1000)
    Ref.current = id;
}

const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if 
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
}

useEffect(() => {
    clearTimer(getDeadTime());
}, []);

const onClickReset = () => {
    clearTimer(getDeadTime());
}

return (
  <div class



function RevisionDailyPage(){
    
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("revision-landing-page");
    return function cleanup() {
      document.body.classList.remove("revision-landing-page");
    };
  });

  
    return (
      <div style={{height: '100vh'}}>
          <div className="content-center">
            <Container>
                <ListGroup>
                    <ListGroupItem>Maths</ListGroupItem>
                    <ListGroupItem>AI</ListGroupItem>
                    <ListGroupItem>SPaM</ListGroupItem>
                </ListGroup>
                
            </Container>
          </div>
      </div>
      
    );
}

export default RevisionDailyPage;