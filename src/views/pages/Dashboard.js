import React, { useEffect, useState, PureComponent } from "react";
import { useHistory } from "react-router-dom";

// reactstrap components
import { Container, Button, Progress } from "reactstrap";

// recharts components
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter.js";
import Overview from "components/Overview";

import { supabase } from "config/client";
import { AreaGraph } from "components/Graphs";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [weeklyPoints, setWeeklyPoints] = useState(0);
  const [AvgDailyPoints, setAvgDailyPoints] = useState(0);
  const [revisionPoints, setRevisionPoints] = useState(0);
  const [sleepPoints, setSleepPoints] = useState(0);
  const [waterPoints, setWaterPoints] = useState(0);
  const [sleepData, setSleepData] = useState(null);
  const [waterData, setWaterData] = useState([]);

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
        getTotalPoints(value.data.user.id);
        getWeeklyPoints(value.data.user.id);
      } else {
        console.log("no user");
      }
    });
    getSleepData();
    getWater();
  }, []);

  const getTotalPoints = async (userId) => {
    const { data, error } = await supabase
      .from("points")
      .select("*")
      .eq("user_id", userId)
  
    if (error) {
      console.log(error.message);
    } else {
      const revisionPoints = data.filter(point => point.type === 'revision')
                                 .reduce((acc, point) => acc + point.points, 0);
      const sleepPoints = data.filter(point => point.type === 'sleep')
                              .reduce((acc, point) => acc + point.points, 0);
      const waterPoints = data.filter(point => point.type === 'water')
                              .reduce((acc, point) => acc + point.points, 0);
      
      // set state for each topic's total points
      setRevisionPoints(revisionPoints);
      setSleepPoints(sleepPoints);
      setWaterPoints(waterPoints);
      
      // set state for the total points (sum of all topics)
      const totalPoints = revisionPoints + sleepPoints + waterPoints;
      setTotalPoints(totalPoints);
    }
  };
  

  const getWeeklyPoints = async (userId) => {
    // calculate the start and end dates of the week
    const endofWeek = new Date();
    const startofWeek = new Date(endofWeek.getTime() - 7 * 24 * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from("points")
      .select("*")
      .eq("user_id", userId)
      .gte("date", startofWeek.toISOString().slice(0, 10))
      .lte("date", endofWeek.toISOString().slice(0, 10));
    
    if (error) {
      console.log(error.message);
    } else {
      const points = data.reduce((acc, point) => acc + point.points, 0);
      const days = 7;
      const weeklyPoints = Math.round(points / days);
      const dailyPoints = Math.round(points / data.length);
      
      setWeeklyPoints(weeklyPoints);
      setAvgDailyPoints(dailyPoints);
    }
  };

  // get sleep data
  const getSleepData = async () => {
      try {
          const { data, error } = await supabase
            .from("sleep")
            .select("*")
            .order("date", {ascending: true})
            .limit(7)
            .eq("user_id", await getUserId());
          if (error) throw error;
          setSleepData(data);
      } catch (error) {
          alert(error.message);
          console.log("error", error);
      }
  };

  // get water data
  const getWater = async () => {
        
    const { data, error } = await supabase
      .from("water")
      .select("*")
      .eq("user_id", await getUserId());
    if (error) throw error;

    setWaterData(data);
    console.log(waterData);
    console.log(data);
  };

  // get the user's id
  async function getUserId() {
      const { data, error } = await supabase.auth.getSession()
      if (data.session) { // if there is a session, user is logged in
          return data.session.user.id;
      }
      throw error;
  }


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <div style={{height: "150vh", border: "1px red", maxHeight: "200vh"}}>
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
              <p className="subTitleDash">Points this week</p>
              <div style={{marginLeft: "auto"}} />
              <p>{weeklyPoints}/??</p>
            </div>
            <Progress
              style={{width: "75vw"}}
                animated
                color="success"
                value={weeklyPoints}
              />
          </div>

          <div className="borderDash" style={{display: "flex", alignItems: "center", height: "100%"}}>
            <p>Total points earned: {totalPoints}</p>
          </ div>
        </div>

        <div className="gridDash"> 

          <div className="borderDash" style={{gridArea: "pieChart"}}>
            <h3>Total points for each topic</h3>
            <ResponsiveContainer width="100%" height="50%">
              <PieChart width={800} height={400}>
                <Pie
                  data={data}
                  cx={220}
                  cy={300}
                  innerRadius={80}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              <Legend />
              </PieChart>
            </ResponsiveContainer>
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
            <AreaGraph data={sleepData} width={380} height={180} quality="true" margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: 20,
            }} />
            <p>Average daily points for this week: {weeklyPoints}/{AvgDailyPoints} </p>
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
            <p>Average daily points for this week: {weeklyPoints}/{AvgDailyPoints} </p>
            <Button style={{width: "100%", alignSelf: "flex-end"}} color="success" onClick={() => history.push("/water")}> view </Button>
          </div>
        </div>
      </ div>
      </ div>

  );
}

export default DashboardPage;
