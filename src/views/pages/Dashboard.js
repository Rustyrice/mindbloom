import React, { useEffect, useState, PureComponent } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Container, Button, Progress } from "reactstrap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import { getSleepDataOfWeek, getWaterDataOfWeek, getDailyPoints, getTotalPoints, getTotalPointsofWeek } from "config/data";


import { supabase } from "config/client";
import { AreaGraph } from "components/Graphs";

function DashboardPage() {
  const [user, setUser] = useState(null);

  const [totalPoints, setTotalPoints] = useState(0);

  const [avgSleepPts, setAvgSleepPts] = useState(0);
  const [avgWaterPts, setAvgWaterPts] = useState(0);
  const [avgRevisionPts, setAvgRevisiosPts] = useState(0);


  const [waterPoints, setWaterPoints] = useState(0);
  const [sleepPoints, setSleepPoints] = useState(0);
  const [revisionPoints, setRevisionPoints] = useState(0);

  const [TotalWeeklyPoints, setTotalWeeklyPoints] = useState(0);

  const [sleepData, setSleepData] = useState(null);
  const [waterData, setWaterData] = useState(null);

  // data for pie chart
  const data = [
    { name: 'Revision', value: revisionPoints },
    { name: 'Sleep', value: sleepPoints },
    { name: 'Water', value: waterPoints },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  let history = useHistory();

   useEffect(() => {
    supabase.auth.getUser().then((value) => {
      if (value.data?.user) {
        setUser(value.data.user);
        const date = dateNow();

        // get data for the week
        getSleepDataOfWeek(date).then((data) => {
          setSleepData(data);
        });

        getWaterDataOfWeek(date).then((data) => {
          setWaterData(data);
        });

        // get total points

        getTotalPoints().then((data) => {
          setTotalPoints(data);
        });

        getTotalPointsofWeek(date).then((data) => {
          setTotalWeeklyPoints(data);
        });

        // get average daily points for each category

        getDailyPoints(date, "revision").then((data) => {
          setAvgRevisiosPts(data[0]);
          setRevisionPoints(data[1])
        });

        getDailyPoints(date, "sleep").then((data) => {
          setAvgSleepPts(data[0]);
          setSleepPoints(data[1])
        });

        getDailyPoints(date, "water").then((data) => {
          setAvgWaterPts(data[0]);
          setWaterPoints(data[1])
        });

      } else {
        console.log("no user");
      }
    })
  }, []);

  const dateNow = () => {
    const date = new Date();
    return date;
  }


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <div style={{height: "100vh", border: "1px red", maxHeight: "100vh"}}>
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
        <div style={{margin: "10px 10px", display: "flex", flexDirection: "column"}}>

        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px"}}>
          <div className="borderDash">
            <div style={{display: "flex"}}>
              <p className="subTitleDash">Points this week</p>
              <div style={{marginLeft: "auto"}} />
              <p>{TotalWeeklyPoints}/??</p>
            </div>
            <Progress
              style={{width: "75vw"}}
                animated
                color="success"
                value={TotalWeeklyPoints}
              />
          </div>

          <div className="borderDash" style={{display: "flex", alignItems: "center", height: "100%"}}>
            <p>Total points earned: {totalPoints}</p>
          </ div>
        </div>

        <div className="gridDash">

          <div className="borderDash" style={{gridArea: "pieChart", maxHeight: "80vh"}}>
            <h3>Total points for each topic</h3>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart width={800} height={400}>
                <Pie
                  data={data}
                  cx={250}
                  cy={110}
                  innerRadius={80}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="borderDash" style={{gridArea: "areaChart"}}>
            {/* <p className="subTitleDash">Point this week</p> */}
            <AreaGraph goal={false} />
          </div>

          <div className="borderDash" style={{gridArea: "revision", width: "100%"}}>
            <p className="subTitleDash">Revision</p>
            <AreaGraph data={sleepData} width={1000} height={200} quality="true" margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 20,
            }} />
            <p>Average daily points (last 7 days): {avgRevisionPts} </p>
            <Button style={{width: "100%"}} color="success" onClick={() => history.push("/revision-landing-page")}> view </Button>
          </div>

          <div className="borderDash" style={{gridArea: "sleep", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <p className="subTitleDash">Sleep</p>
            <AreaGraph data={sleepData} width={380} height={180} quality="true" margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 20,
            }} />
            <p>Average daily points (last 7 days): {avgSleepPts} </p>
            <Button style={{width: "100%"}} color="success" onClick={() => history.push("/sleep")}> view </Button>
          </div>

          <div className="borderDash" style={{gridArea: "water", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <p className="subTitleDash">Water</p>
            <AreaGraph data={waterData} width={380} height={180} quality="true" margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 20,
            }} />
            <p>Average daily points (last 7 days): {avgWaterPts} </p>
            <Button style={{width: "100%", alignSelf: "flex-end"}} color="success" onClick={() => history.push("/water")}> view </Button>
          </div>
        </div>
      </ div>
      </ div>

  );
}

export default DashboardPage;
