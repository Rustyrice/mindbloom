import React, { useEffect, useState, PureComponent } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Container, Button, Progress } from "reactstrap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import { getSleepDataOfWeek, getWaterDataOfWeek, getDailyPoints, getTotalPoints, getTotalPointsofWeek } from "config/data";


import { supabase } from "config/client";
import { AreaGraph, healthMeter } from "components/Graphs";
import Badges from "components/Badges";

function DashboardPage() {
  const [user, setUser] = useState(null);

  const [totalPoints, setTotalPoints] = useState(0);
  const [TotalWeeklyPoints, setTotalWeeklyPoints] = useState(0);


  const [avgSleepPts, setAvgSleepPts] = useState(0);
  const [avgWaterPts, setAvgWaterPts] = useState(0);
  const [avgRevisionPts, setAvgRevisiosPts] = useState(0);

  const [waterPoints, setWaterPoints] = useState(0);
  const [sleepPoints, setSleepPoints] = useState(0);
  const [revisionPoints, setRevisionPoints] = useState(0);


  // const [sleepData, setSleepData] = useState(null);
  // const [waterData, setWaterData] = useState(null);
  const [revisionData, setRevisionData] = useState(null);

  const [quote, setQuote] = useState(null);

  // data for pie chart
  const dataPieChart = [
    { name: 'Revision', value: revisionPoints },
    { name: 'Sleep', value: sleepPoints },
    { name: 'Water', value: waterPoints },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // data for needle chart
  const dataNeedleChart = [
    { name: 'Poor', value: 100, color: '#ff0000' },
    { name: 'Average', value: 200, color: '#FFBB28' },
    { name: 'Good', value: 300, color: '#FFFF00' },
    { name: 'Excellent', value: 400, color: '#00C49F' },
  ];

  const cx = 250;
  const cy = 150;
  const iR = 50;
  const oR = 100;
  const value = 50;

  const healthStatus = (value) => {
    if (value < 100) {
      return "C'mon, you can do better";
    } else if (value < 200) {
      return "Bruh, you're average";
    } else if (value < 300) {
      return "Good job, keep it up";
    } else {
      return "You have been blessed by the gods";
    }
  }

  let history = useHistory();

   useEffect(() => {
    supabase.auth.getUser().then((value) => {
      if (value.data?.user) {
        setUser(value.data.user);
        getData();
      } else {
        console.log("no user");
      }
    })

    getQuote();
    
  }, []);

  const getData = async () => {
    const date = dateNow();

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
          setRevisionData(data[2])
          console.log(data[2])
        });

        getDailyPoints(date, "sleep").then((data) => {
          setAvgSleepPts(data[0]);
          setSleepPoints(data[1])
        });

        getDailyPoints(date, "water").then((data) => {
          setAvgWaterPts(data[0]);
          setWaterPoints(data[1])
        });
  }

  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        const random = Math.floor(Math.random() * data.length);
        setQuote(data[random]);
      });
  }


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
    <div>
      <IndexNavbar />
      <div style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "35%",
            backgroundImage: "url(https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)",
        }}>
        <Container>
          <h1 style={{fontWeight: "bold", color: "white", padding: "90px 0 20px 0"}}>Hi {user?.user_metadata.name}, welcome to mindbloom</h1>
        </Container>

        </div>
        <div style={{margin: "10px 10px", display: "flex", flexDirection: "column"}}>

        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px"}}>
          <div className="borderDash">
            <div style={{display: "flex"}}>
              <p className="subTitleDash">Points this week</p>
              <div style={{marginLeft: "auto"}} />
              <p>{TotalWeeklyPoints}/1000</p>
            </div>
            <Progress
              style={{width: "75vw"}}
                animated
                color="success"
                value={TotalWeeklyPoints / 10}
              />
          </div>

          <div className="borderDash" style={{display: "flex", alignItems: "center", height: "100%"}}>
            <p>Total points earned: {totalPoints}</p>
          </ div>
        </div>

        <div className="gridDash">

          <div className="borderDash" style={{gridArea: "pieChart"}}>
          <p className="subTitleDash">Total points for each topic</p>
            <ResponsiveContainer width="100%">
              <PieChart width={800} height={400}>
                <Pie
                  data={dataPieChart}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                {dataPieChart.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="borderDash" style={{gridArea: "healthMeter", maxHeight: "80vh"}}>
          <p className="subTitleDash">Health Status</p>
            <ResponsiveContainer width="100%" height="60%">
              <PieChart width={400} height={500}>
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={dataNeedleChart}
                  cx={cx}
                  cy={cy}
                  innerRadius={iR}
                  outerRadius={oR}
                  fill="#8884d8"
                  stroke="none"
                >
                  {dataNeedleChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                {healthMeter(TotalWeeklyPoints, dataNeedleChart, cx, cy, iR, oR, '#d0d000')}
              </PieChart>
            </ResponsiveContainer>
            <p style={{textAlign: "center", fontWeight: "bold"}}>
              {healthStatus(TotalWeeklyPoints)}
            </p>
          </div>

          

          <div className="borderDash" style={{gridArea: "revision", width: "100%"}}>
            <p className="subTitleDash">Revision</p>
            <AreaGraph data={revisionData} width={900} height={200} goal={false} measure={"points"} margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 20,
            }} />
            {/* <p>Average daily points (last 7 days): {avgRevisionPts} </p> */}
            <Button style={{width: "100%"}} color="success" onClick={() => history.push("/revision-landing-page")}> view </Button>
          </div>

          <div className="borderDash" style={{gridArea: "sleep", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <p className="subTitleDash">Sleep</p>
            <p>Average daily points (last 7 days): {avgSleepPts} </p>
            <Button style={{width: "100%"}} color="success" onClick={() => history.push("/sleep")}> view </Button>
          </div>

          <div className="borderDash" style={{gridArea: "water", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <p className="subTitleDash">Water</p>
            <p>Average daily points (last 7 days): {avgWaterPts} </p>
            <Button style={{width: "100%", alignSelf: "flex-end"}} color="success" onClick={() => history.push("/water")}> view </Button>
          </div>

          <div className="borderDash" style={{gridArea: "quote", }}>
            <p className="subTitleDash">Quote of the day</p>
            {quote === null ? <p>loading...</p> : 
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "90%"}}>
              <h3 style={{width: "100%", textAlign: "center"}}>"{quote.text}"</h3>
              <p style={{width: "100%", textAlign: "center"}}> - {quote.author}</p>
            </div>
            }
            
          </div>

          <div className="borderDash" style={{gridArea: "badges", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <p className="subTitleDash">Badges</p>
            <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
              <Badges points={totalPoints}/>
            </div>
          </div>

          <div className="borderDash" style={{gridArea: "leaderBoard", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <p className="subTitleDash">LeaderBoard</p>
          </div>

        </div>
      </ div>



      </ div>

  );
}

export default DashboardPage;
