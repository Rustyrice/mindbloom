import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Container, Button, Progress } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter.js";
import Overview from "components/Overview";

import { supabase } from "config/client";
import { AreaGraph } from "components/Graphs";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);

  let history = useHistory();

  useEffect(() => {
    supabase.auth.getUser().then((value) => {
      if (value.data?.user) {
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


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <div style={{height: "74vh", border: "1px red", maxHeight: "100vh"}}>
      <IndexNavbar />
      <div style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "25%",
            backgroundImage: "url(https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)",
        }}>
        <Container>
          <h1 style={{fontWeight: "bold", color: "white", paddingTop: "40px"}}>Hi {user?.user_metadata.name}, welcome to mindbloom</h1>
        </Container>

        </div>
        <div style={{margin: "10px 10px", display: "flex", height: "100%", flexDirection: "column"}}> 

        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px"}}>
          <div className="borderDash">
            <div style={{display: "flex"}}>
              <p className="subTitleDash">Point this week</p>
              <div style={{marginLeft: "auto"}} />
              <p>??/??</p>
            </div>
            <Progress
              style={{width: "75vw"}}
                animated
                color="success"
                value={totalPoints}
              />
          </div>

          <div className="borderDash" style={{display: "flex", alignItems: "center", height: "100%"}}>
            <p>Total points earned: {totalPoints}</p>
          </ div>
        </div>

        <div className="gridDash"> 

          <div className="borderDash" style={{gridArea: "pieChart"}}>
            {/* <p className="subTitleDash">Point this week</p> */}
          </div>

          <div className="borderDash" style={{gridArea: "areaChart"}}>
            {/* <p className="subTitleDash">Point this week</p> */}
            <AreaGraph goal={false} />
          </div>

          <div className="borderDash" style={{gridArea: "revision", width: "100%"}}>
            <p className="subTitleDash">Revision</p>
            <AreaGraph goal={false} />
            <Button style={{width: "100%"}} color="success" onClick={() => history.push("/revision-landing-page")}> view </Button>
          </div>

          <div className="borderDash" style={{gridArea: "sleep", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <p className="subTitleDash">Sleep</p>
            <p>Avg. pts in a day this week: </p>
            <Button style={{width: "100%"}} color="success" onClick={() => history.push("/sleep")}> view </Button>
          </div>

          <div className="borderDash" style={{gridArea: "water", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <p className="subTitleDash">Water</p>
            <p>Avg. pts in a a day this week: </p>
            <Button style={{width: "100%", alignSelf: "flex-end"}} color="success" onClick={() => history.push("/water")}> view </Button>
          </div>
        </div>
      </ div>
      </ div>

  );
}

export default DashboardPage;
