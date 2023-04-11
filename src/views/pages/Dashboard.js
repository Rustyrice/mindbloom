import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Container, Button, Progress } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter.js";
import Overview from "components/Overview";

import { supabase } from "config/client";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);

  let history = useHistory();

  useEffect(() => {
    supabase.auth.getUser().then((value) => {
      if (value.data?.user) {
        // console.log("user", value.data.user);
        setUser(value.data.user);
        getPoints(value.data.user.id);
      } else {
        console.log("no user");
      }
    });
  }, []);

  const getPoints = async (userId) => {
    const { data, error } = await supabase
      .from("points")
      .select("*")
      .eq("user_id", userId);
    
    if (error) {
      console.log(error.message);
    } else {
      const points = data.reduce((acc, point) => acc + point.points, 0);
      setTotalPoints(points);
    }
  };
  console.log(totalPoints);


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div style={{
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "30vh",
            
            backgroundImage: "url(https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)",
        }}>
        <Container>
          <h1 style={{fontWeight: "bold", color: "white"}}>Hi {user?.user_metadata.name}, welcome to mindbloom</h1>
        </Container>

        </div>
      <div className="section profile-content">
        <Container style={{marginTop: "10px"}}>          

          <h3 style={{fontWeight: "bold", color: "black"}}>Point System</h3>
          <br />
          <Progress
            animated
            color="success"
            value={totalPoints}
          />
          <br />
          <p>Total points earned: {totalPoints}</p>
          <h3 style={{fontWeight: "bold", color: "black"}}>Revision</h3>
          <br />
          <Overview />
          <br />
          <Button style={{marginRight: "10px"}} onClick={() => history.push("revision-landing-page")}> Revision Page </Button>
          <br />
          <br />
          <h3 style={{fontWeight: "bold", color: "black"}}>Wellbeing</h3>
          <br />
          <Button style={{marginRight: "10px"}} onClick={() => history.push("sleep")}> Sleep Page </Button>
          <Button style={{marginRight: "10px"}} onClick={() => history.push("water")}> Water Page </Button>
          <Button style={{marginRight: "10px"}} onClick={() => history.push("alcohol")}> Alcohol Page </Button>


          <br />
          <br />
          <p>This page will show all the data and trends about Personal Informatics according to user Input</p>

          
          
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default DashboardPage;
