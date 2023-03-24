import SleepTracker from 'components/SleepTracker';
import React, { useState } from 'react';
import {
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupText,
  Input,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Container,
  Button,
} from "reactstrap";

import IndexNavbar from 'components/Navbars/IndexNavbar';
function SleepPage(){
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
      document.body.classList.add("sleep-page");
      return function cleanup() {
        document.body.classList.remove("sleep-page");
      };
    });
    return (
        <>
            <IndexNavbar />

            <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "40vh",
            backgroundImage: "url(https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)",
            }}>
            <h1 className='presentation-title'>Sleep Tracker</h1>
            </div>

            <SleepTracker />
        </>
    );
}
export default SleepPage;