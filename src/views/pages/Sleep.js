import React, { useState, useEffect, PureComponent} from "react";
import {
    ListGroup,
    ListGroupItem,
    InputGroup,
    InputGroupText,
    Input,
    Container,
    Button
} from "reactstrap";

import IndexNavbar from "components/Navbars/IndexNavbar";
import { ListItem } from "components/RevisionComponents.js";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { supabase } from "config/client";


function SleepPage() {
    const [sleepData, setSleepData] = useState([]);
    const [goalData, setGoalData] = useState([]);

    const [quality, setQuality] = useState("");
    const [amount, setAmount] = useState(0);
    const [goal, setGoal] = useState(8);
    const [data, setData] = React.useState([{ name: "Sleep", data: 8 }, { name: "Goal", data: 8 }]);

    const [dataUpdated, setDataUpdated] = useState(false);

    // when data is updated, update sleepData
    useEffect(() => {
        getSleepData();
        getCurrentGoal();
        console.log(sleepData);
        console.log(goalData);
    }, [dataUpdated]);

    // get the current date, in the format yyyy-mm-dd
    const dateNow = ()  => {
        var date = new Date(); // Get the current date

        // Get the year, month, and day
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });

        var formattedDate = year + "-" + month + "-" + day; // Generate yyyy-mm-dd date string

        return formattedDate;
    }

    // supabase functions

    // get the user's id
    async function getUserId() {
        const { data, error } = await supabase.auth.getSession()
        if (data.session) { // if there is a session, user is logged in
            return data.session.user.id;
        }
        throw error;
    }

    const handleSleepSubmit = async (e) => {
        e.preventDefault();

        if (!quality || !amount) {
            alert("Please fill in all the required fields");
            return;
        }

        const date = dateNow(); // Get the current date

        try {
            const { data: existingData, error: existingError } = await supabase
                .from("sleep")
                .select()
                .eq("date", date)
                .eq("user_id", await getUserId());
            
            if (existingError) throw existingError;

            if (existingData && existingData.length > 0) {
                alert("You've already logged your sleep for today");
            } else {
                const { data, error } = await supabase
                    .from("sleep")
                    .insert([
                        { quality: quality, amount: amount, date: date, user_id: await getUserId() },
                    ]);
                if (error) throw error;
            
                setSleepData(null); // Clear the topic
                setDataUpdated(!dataUpdated); // Update the data, to show the new item
                alert("Sleep has been recorded successfully!");
            }

        } catch (error) {
            alert(error.message);
            console.log("error", error);
        }
    };
    
    const handleGoalSubmit = async (e) => {
        e.preventDefault();
      
        // If the quality or amount is empty, don't submit
        if (!goal) {
          alert("Please fill in the required field");
          return;
        }
      
        try {
          const { data: existingData, error: existingError } = await supabase
            .from("goal")
            .select()
            .eq("user_id", await getUserId());
      
          if (existingError) throw existingError;
      
          if (existingData && existingData.length > 0) {
            // Update the existing row
            const { data: updatedData, error: updateError } = await supabase
              .from("goal")
              .update({ goalSleep: goal })
              .eq("id", existingData[0].id)
              .eq("user_id", await getUserId());
      
            if (updateError) throw updateError;
      
            setDataUpdated(!dataUpdated); // Update the data, to show the new item
          } else {
            // Insert a new row
            const { data: insertedData, error: insertError } = await supabase
              .from("goal")
              .insert({ user_id: await getUserId(), goalSleep: goal })
              .single();
      
            if (insertError) throw insertError;
            
            setDataUpdated(!dataUpdated); // Update the data, to show the new item
          }
          alert("Goal set successfully!");

      
          setGoal(8); // Clear the topic
        } catch (error) {
          alert(error.message);
          console.log("error", error);
        }
    };
      
    const getSleepData = async () => {
        var date = new Date();

        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });

        // Generate yyyy-mm-dd date string
        var formattedDate = year + "-" + month + "-" + day;

        const { data,  error } = await supabase
            .from("sleep")
            .select("*")
            .eq("date", formattedDate)
            .eq("user_id", await getUserId());
        if (error) throw error;

    setSleepData(data);
    };

    const getCurrentGoal = async () => {
        const { data, error } = await supabase
            .from("goal")
            .select("goalSleep")
            .eq("user_id", await getUserId())
            .limit();
        if (error) throw error;

        if (data) {
            setGoalData( { goalSleep: data[0].goalSleep });
        } else {
            setGoalData({ goalSleep: 8 });
        }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
              <p >{`${label} : ${payload[0].value}`}</p>
              <p className="desc">Quality: {quality}</p>
            </div>
          );
        }

        return null;
      };
    useEffect(() => {
        getSleepData();
        getCurrentGoal();
        console.log(sleepData);
        console.log(goalData);
    }, [dataUpdated]);

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("revision-landing-page");
    return function cleanup() {
      document.body.classList.remove("revision-landing-page");
    };
  });

    return (
      <div>
        <IndexNavbar title="• Sleep"/>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "40vh",
            backgroundImage: "url(https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)",
        }}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <p style={{color: "white", fontWeight: "bold", padding: "7px 0", marginBottom: "10px", backgroundColor: "grey", borderRadius: "5px", width: "100%", textAlign: "center" }}>Hour(s)</p>
                    <div style={{ backgroundColor: "grey", borderRadius: "5px", padding: "0px 40px 23px 40px"}}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
                            <Button onClick={() => setAmount(amount - 1)} style={{marginTop: "30px"}} disabled={amount <= 1}><AiOutlineMinus /></Button>
                            <h1 style={{color: "white", fontWeight: "bold", padding: "0 20px"}}>{amount}</h1>
                            <Button  onClick={() => setAmount(amount + 1)} style={{marginTop: "30px"}} disabled={amount >= 15}><AiOutlinePlus /></Button>
                        </div>
                        <InputGroup style={{width: "100%", marginTop: "10px", fontColor: "white"}}>
                            <Input placeholder="Quality" type="text" onChange={(e) => setQuality(e.target.value)} className="placeholder-white" style={{backgroundColor: "grey", color: "white"}}/>
                    </InputGroup>
                    </div>
                </div>

                <Button color="success" onClick={handleSleepSubmit} style={{width: "100%", marginTop: "10px"}}>Submit</Button>
            </div>
        </div>
          <div className="content-center" style={{paddingTop: "30px"}}>
          <Container>
                <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    
                    <Button color="success" onClick={() => { {/*  Do Something  */} }}>Prev</Button>
                    <h1 className='content-center'>Today</h1>
                    <Button color="success" onClick={() => { {/*  Do Something  */} }}>Next</Button>
                </ListGroupItem>
                <br/>                   


                <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "5px", border: "0.5px solid #ebebeb" ,boxShadow: "3px 3px 5px #d1d1d1"}}>
                    <AreaChart
                        width={1000}
                        height={400}
                        data={sleepData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 20,
                            bottom: 5,

                        }}
                    >
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="Day" />
                        <YAxis />
                        <Tooltip cursor={{fill: '#fff'}} content={<CustomTooltip />} />
                        <Area dataKey="amount" barSize={30} fill="#8884d8" />
                    </AreaChart>
                </div>
                <br/>
                <ListGroup>
                    {/* <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div  style={{display: "flex", flexDirection: "row", width: "60%"}}>
                            <InputGroup style={{width: "60%", marginRight: "10px"}}>
                                <InputGroupText>
                                    In Bed
                                </InputGroupText>
                            </InputGroup>
                            <InputGroup style={{width: "90%"}}>
                                <InputGroupText>
                                    From
                                </InputGroupText>
                                <Input
                                    addon
                                    type="number"
                                    value={from}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (!isNaN(value) && value >= 0 && value < 24) {
                                            setFrom(value);
                                        }
                                    }}
                                    />
                                <InputGroupText>
                                    To
                                </InputGroupText>
                                <Input addon type="number" value={to} onChange={(e) => {
                                        const value = e.target.value;
                                        if (!isNaN(value) && value >= 0 && value < 24) {
                                            setTo(value);
                                        }
                                    }}/>
                            </InputGroup>
                        </div>
                        <Button color="success" onClick={handleSleepSubmit}>Add</Button> */}
                    {/* </ListGroupItem>
                    <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div  style={{display: "flex", flexDirection: "row", width: "60%"}}>
                            <InputGroup style={{width: "60%", marginRight: "10px"}}>
                                <InputGroupText>
                                   Sleep Quality
                                </InputGroupText>
                            </InputGroup>
                            <InputGroup style={{width: "90%"}}>
                                <Input
                                    addon
                                    type="text"
                                    value={quality}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        if (value.length <= 30) {
                                            setQuality(value);
                                        }
                                    }}
                                        />
                            </InputGroup>
                        </div>
                        <Button color="success" onClick={handleSubmit}>Add</Button>
                    </ListGroupItem> */}
                    <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div  style={{display: "flex", flexDirection: "row", width: "60%"}}>
                            <InputGroup style={{width: "60%", marginRight: "10px"}}>
                                <InputGroupText>
                                    Goal (hrs)
                                </InputGroupText>
                            </InputGroup>
                            <InputGroup style={{width: "90%"}}>
                                <Input
                                    addon
                                    type="number"
                                    value={goal}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        if (!isNaN(value) && value > 0 && value < 16) {
                                            setGoal(value);
                                        }
                                    }}
                                        />
                            </InputGroup>
                        </div>
                        <Button color="success" onClick={handleGoalSubmit}>Add</Button>
                    </ListGroupItem>
                    <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div  style={{display: "flex", flexDirection: "row", width: "60%"}}>
                                <h3>
                                    Current goal: <b>{goalData.goalSleep}</b> hours of sleep
                                </h3>
                        </div>
                    </ListGroupItem>
                </ListGroup>
                <div style={{height: "30px"}}/>


            </Container>
          </div>
        </div>

    );
}

export default SleepPage;
