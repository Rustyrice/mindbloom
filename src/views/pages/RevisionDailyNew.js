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
// import DemoFooter from "components/Footers/DemoFooter.js";

import { PomodoroTimer, ListItem } from "components/RevisionDailyComponents.js";


function RevisionDailyPage() {

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
            <PomodoroTimer expiryTimestamp={Date.now() + 1000 * 60 * 25} />

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
                    <ListItem title="maths" goal="3" progress="2"/>
                    <ListItem title="ai" goal="3" progress="1"/>
                    <ListItem title="system arch" goal="3" progress="1"/>
                </ListGroup>
            </Container>
          </div>
        </div>
      
    );
}

export default RevisionDailyPage;