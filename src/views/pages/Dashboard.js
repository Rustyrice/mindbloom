import React, { useEffect, useState, PureComponent } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Container, Button, Progress } from "reactstrap";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
  const dataPieChart = [
    { name: 'Revision', value: revisionPoints },
    { name: 'Sleep', value: sleepPoints },
    { name: 'Water', value: waterPoints },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // data for needle chart
  const RADIAN = Math.PI / 180;
  const dataNeedleChart = [
    { name: 'Poor', value: 100, color: '#ff0000' },
    { name: 'Average', value: 300, color: '#FFBB28' },
    { name: 'Good', value: 200, color: '#FFFF00' },
    { name: 'Excellent', value: 200, color: '#00C49F' },
  ];
  const cx = 150;
  const cy = 200;
  const iR = 50;
  const oR = 100;
  const value = 50;

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    if (value >= 600) {
      color = '#00C49F';
    } else if (value >= 400) {
      color = '#FFFF00';
    } else if (value >= 100) {
      color = '#FFBB28';
    } else {
      color = '#ff0000';
    }

    return [
      <circle cx={x0} cy={y0} r={r} fill="gray" stroke="none" />,
      <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill="gray" />,
    ];
  };

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
              <p>{TotalWeeklyPoints}/1000</p>
            </div>
            <Progress
              style={{width: "75vw"}}
                animated
                color="success"
                value={TotalWeeklyPoints / 100}
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

          <div className="borderDash" style={{gridArea: "areaChart", maxHeight: "80vh"}}>
          <h3>Health Status</h3>
            <ResponsiveContainer width="100%" height="80%">
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
                {needle(TotalWeeklyPoints, dataNeedleChart, cx, cy, iR, oR, '#d0d000')}
              </PieChart>
            </ResponsiveContainer>
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
            <Button style={{width: "100%", marginTop: "15px"}} color="success" onClick={() => history.push("/revision-landing-page")}> view </Button>
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
