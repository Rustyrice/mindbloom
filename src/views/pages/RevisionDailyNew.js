import React, { useState, useRef, useEffect } from "react";

import {
    ListGroup,
    ListGroupItem,
    InputGroup,
    InputGroupText,
    Input,
    Container,
    Button
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { ListItem } from "components/ListGroupItem";


function RevisionDailyPage() {
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00:00');
    const [isRunning, setIsRunning] = useState(false);
    const [endTime, setEndTime] = useState(null);

    const getTimeRemaining = (endTime) => {
        const total = Date.parse(endTime) - Date.parse(new Date());
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((total / (1000 * 60)) % 60);
        const seconds = Math.floor((total / 1000) % 60);
        return {
          total,
          hours,
          minutes,
          seconds,
        };
    };
    
    const startTimer = () => {
        let { total, hours, minutes, seconds } = getTimeRemaining(endTime);
        if (total >= 0 && timer != '00:00:00') {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) +
                ':' +
                (minutes > 9 ? minutes : '0' + minutes) +
                ':' +
                (seconds > 9 ? seconds : '0' + seconds)
            );
            setEndTime(new Date(endTime.getTime() - 1000));
        } else {
            // pause the timer
            setIsRunning(false);
            if (Ref.current) clearInterval(Ref.current);
            setTimer('00:00:00');
        }
    };
    
    const onClickStartPause = () => {
        if (!isRunning) {
            // start the timer
            const endTime = new Date();
            endTime.setSeconds(endTime.getSeconds() + 1500);
            setEndTime(endTime);
            setIsRunning(true);
            const id = setInterval(() => {
                startTimer();
            }, 1000);
            Ref.current = id;
        } else {
            // pause the timer
            setIsRunning(false);
            if (Ref.current) clearInterval(Ref.current);
            setEndTime(new Date(endTime.getTime() + (new Date() - new Date(endTime))));
        }
    };
    
    const clearTimer = () => {
        // set the timer to 25 mins
        setTimer('00:25:00');
        const endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + 25);
        endTime.setSeconds(0);
        setEndTime(endTime);
        // clear the timer
        if (Ref.current) clearInterval(Ref.current);
    };
    
    useEffect(() => {
        clearTimer();
    }, []);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("revision-landing-page");
    return function cleanup() {
      document.body.classList.remove("revision-landing-page");
    };
  });
  
    return (
      <div>
        <IndexNavbar />
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "40vh",
            backgroundImage: "url(https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)",
        }}>
            <div style={{backgroundColor: "white", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0px 50px 10px 50px"}}>
                <h1 style={{marginBottom: "10px"}}>{timer}</h1>
                <Button color="danger" onClick={onClickStartPause}>{isRunning ? 'Pause' : 'Start'}</Button>

            </div>

        </div>
          <div className="content-center" style={{paddingTop: "30px"}}>
            <Container>

                <ListGroup>
                    <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>

                        <div  style={{display: "flex", flexDirection: "row", width: "60%"}}>
                            <InputGroup style={{width: "60%", marginRight: "10px"}}>
                                <InputGroupText>
                                    Topic
                                </InputGroupText>
                                <Input addon placeholder="Maths" type="text" />
                            </InputGroup>

                            <InputGroup style={{width: "30%"}}>
                                <InputGroupText>
                                    Amount
                                </InputGroupText>
                                <Input addon placeholder="2" type="text" />
                            </InputGroup>
                        </div>

                        <Button color="success">Add</Button>

                    </ListGroupItem>
                </ListGroup>

                <div style={{height: "30px"}}/>
                <ListGroup>
                    <ListItem title="maths" goal="3" progress="1"/>
                    <ListItem title="ai" goal="3" progress="1"/>
                    <ListItem title="system arch" goal="3" progress="1"/>
                </ListGroup>
            </Container>
          </div>
        </div>
      
    );
}

export default RevisionDailyPage;