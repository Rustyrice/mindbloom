import React, { useState, useEffect} from "react";
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
import { AreaGraph } from "components/Graphs";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { supabase } from "config/client";


function SleepPage() {
    const [sleepData, setSleepData] = useState([]);
    const [goalData, setGoalData] = useState([]);
    const [points, setPoints] = useState(0);

    // User input
    const [quality, setQuality] = useState("");
    const [amount, setAmount] = useState(0);
    const [goal, setGoal] = useState(8);

    // Processed data
    const [averageSleepTime, setAverageSleepTime] = useState(0);
    const [averageSleepTimeWeek, setAverageSleepTimeWeek] = useState(0);

    const [dataUpdated, setDataUpdated] = useState(false);

    // when data is updated, update sleepData
    useEffect(() => {
        getSleepData();
        getCurrentGoal();
    }, [dataUpdated]);

    const formattedDate = (date) => {
        var date = new Date(date); // Get the current date

        // Get the year, month, and day
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });

        var formattedDate = year + "-" + month + "-" + day; // Generate yyyy-mm-dd date string

        return formattedDate;
    }

    // get the current date, in the format yyyy-mm-dd
    const dateNow = ()  => {
        var date = new Date(); // Get the current date

        return formattedDate(date);
    }

    const weekDates = () => {
        var date = new Date(); // Get the current date

        // Get monday of the current week
        var day = date.getDay(); // Get the current day of the week, 0 = sunday, 1 = monday, etc.
        var diff = date.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday

        date = new Date(date.setDate(diff)); // set date to monday of the current week
    
        var dates = [];
        for (var i = 0; i < 7; i++) {
            dates.push(formattedDate(date));
            date.setDate(date.getDate() + 1);
        }

        return dates;
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

        // check if user has set their goal before allowing them to submit data
        if (!goalData || !goalData.goalSleep) {
            alert("Please set your sleep goal before logging your sleep");
            return;
        }

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
                const { data: sleepData, error: sleepError } = await supabase
                    .from("sleep")
                    .insert([
                        { quality: quality, amount: amount, date: date, user_id: await getUserId(), goal_amount: goalData.goalSleep },
                    ]);
                if (sleepError) throw sleepError;

                setSleepData(null); // Clear the topic
                setDataUpdated(!dataUpdated); // Update the data, to show the new item
                alert("Sleep has been recorded successfully!");

                const sleepHours = parseInt(amount);
                
                if (sleepHours >= goalData.goalSleep) {

                    // update the points
                    const earnedPoints = points + 1 + (sleepHours - goalData.goalSleep)
                    setPoints(earnedPoints);
                    
                    const { data: pointsData, error: pointsError } = await supabase
                        .from("points")
                        .insert([
                            {
                                user_id: await getUserId(),
                                date: date,
                                points: earnedPoints,
                                type: "sleep",
                            },
                        ]);
                    if (pointsError) throw pointsError;

                    alert("Congrats on meeting your sleep goal! You just earned " + earnedPoints + " points!");
                } else {
                    alert("You did not meet your sleep goal today, try to get more sleep tomorrow!");
                }
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
      
    // get the sleep data for the current day
    const getSleepData = async () => {
        var dates = weekDates(); // Get the dates of the current week

        console.log("dates");
        console.log(dates);

        const { data,  error } = await supabase
            .from("sleep")
            .select("*")
            // .in("date", dates)
            // .order("date", { ascending: true })
            .eq("user_id", await getUserId());
        if (error) throw error;

        getAverages(data);

        setSleepData(data);

    };

    const getAverages = (data) => {

        var totalSleep = 0;
        var count = 0;
        data.forEach((item) => {
            totalSleep += parseInt(item.amount);
            count++;
        }
        );

        setAverageSleepTime(parseInt(totalSleep / count));

        var dates = weekDates(); // Get the dates of the current week
        var filetered = data.filter((item) => {
            return dates.includes(item.date);
        })

        count = 0;
        totalSleep = 0;
        filetered.forEach((item) => {
            totalSleep += parseInt(item.amount);
            count++;
        }
        );

        setAverageSleepTimeWeek(parseInt(totalSleep / count));

    }

    // get the current goal
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
                
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "5px", border: "0.5px solid #ebebeb" ,boxShadow: "3px 3px 5px #d1d1d1"}}>
                    <AreaGraph data={sleepData} width={1000} height={350} quality="true" margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 20,

                    }} />
                </div>
                <br/>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "5px", border: "0.5px solid #ebebeb" ,boxShadow: "3px 3px 5px #d1d1d1"}}>
                    <p>Average Sleep Time: {averageSleepTime} hrs</p> 
                    <br /> 
                    <p>Average Sleep Time This Week: {averageSleepTimeWeek} hrs</p>
                </div>
                <br/>

                <ListGroup>
                    
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
