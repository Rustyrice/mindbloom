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
import { AreaGraph } from "components/Graphs";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { supabase } from "config/client";


function WaterPage() {
    // Water data
    const [waterData, setWaterData] = useState([]);
    const [goalData, setGoalData] = useState([]);

    const [points, setPoints] = useState(0);

    // User input
    const [amount, setAmount] = useState(0);
    const [goal, setGoal] = useState(8);

    const [dataUpdated, setDataUpdated] = useState(false);

    useEffect(() => {
        getWater();
        getCurrentGoal();
        console.log(waterData);
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

    // Supabase functions

    async function getUserId() {
        const { data, error } = await supabase.auth.getSession()
        if (data.session) { // if there is a session, user is logged in
            return data.session.user.id;
        }
        throw error;
    }

    const handleWaterSubmit = async (e) => {
        e.preventDefault();

        if (!amount) {
            alert("Please fill in all the required fields");
            return;
        }

        const date = dateNow(); // Get the current date

        try {
            const { data: existingData, error: existingError } = await supabase
                .from("water")
                .select()
                .eq("date", date)
                .eq("user_id", await getUserId());

            if (existingError) throw existingError;

            if (existingData && existingData.length > 0) {
                alert("You've already logged your water consumption for today");
            } else {
                const { data: waterData, error:waterError } = await supabase
                    .from("water")
                    .insert([
                        { amount: amount, date: date, user_id: await getUserId(), goal_amount: goal },
                    ]); // Insert the new item into the database
                if (waterError) throw waterError;

                const waterAmount = parseInt(amount);

                const { data: pointsData, error: pointsError } = await supabase
                    .from("points")
                    .insert([
                        {
                            user_id: await getUserId(),
                            date: date,
                            points: waterAmount,
                            type: "water",
                        }
                    ]);
                if (pointsError) throw pointsError;

                setWaterData(null); // Clear the topic
                setDataUpdated(!dataUpdated); // Update the data, to show the new item
                alert("Water has been recorded successfully!");

                // update the points
                setPoints(points + waterAmount);
                alert("You have earned " + waterAmount + " points for drinking water today!");
            }

        } catch (error) {
            alert(error.message);
            console.log("error", error);
        }
    };

    const handleGoalSubmit = async (e) => {
        e.preventDefault();
        
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
                const { data: updatedData, error: updateError } = await supabase
                    .from("goal")
                    .update({ goalWater: goal })
                    .eq("id", existingData[0].id)
                    .eq("user_id", await getUserId());

                if (updateError) throw updateError;
                
                setDataUpdated(!dataUpdated);
            } else {
                const { data: insertedData, error: insertError } = await supabase
                    .from("goal")
                    .insert({ goalWater: goal, user_id: await getUserId() })
                    .single();

                if (insertError) throw insertError;

                setDataUpdated(!dataUpdated);
            }
            alert("Goal has been updated successfully!");
            setGoal(8);
        } catch (error) {
            alert(error.message);
            console.log("error", error);
        }
    };
    
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

    const getCurrentGoal = async () => {
        const { data, error } = await supabase
            .from("goal")
            .select("goalWater")
            .eq("user_id", await getUserId())
            .limit();
        if (error) throw error;

        if (data) {
            setGoalData( { goalWater: data[0].goalWater });
        } else {
            setGoalData({ goalWater: 8 });
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
        <IndexNavbar title="• Water"/>
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
                <p style={{color: "white", fontWeight: "bold", padding: "7px 0", marginBottom: "10px", backgroundColor: "grey", borderRadius: "5px", width: "100%", textAlign: "center" }}>Cup(s) (250mL)</p>
                <div style={{ backgroundColor: "grey", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", padding: "23px 40px"}}>
                    <Button onClick={() => setAmount(amount - 1)} disabled={amount <= 0}><AiOutlineMinus /></Button>
                    <h1 style={{color: "white", fontWeight: "bold", padding: "0 20px", margin: "0"}}>{amount}</h1>
                    <Button  onClick={() => setAmount(amount + 1)} disabled={amount >= 30}><AiOutlinePlus /></Button>
                </div>
                </div>

                <Button color="success" onClick={handleWaterSubmit} style={{width: "100%", marginTop: "10px"}}>Submit</Button>
            </div>
        </div>
          <div className="content-center" style={{paddingTop: "30px"}}>
          <Container>

                <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "5px", border: "0.5px solid #ebebeb" ,boxShadow: "3px 3px 5px #d1d1d1"}}>

                <AreaGraph data={waterData} width={1000} height={350} goal="false" margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 20,

                        }} />
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
                                        if (!isNaN(value) && value > 0 && value < 31) {
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
                                    Current goal: <b>{goalData.goalWater}</b> cups of water
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

export default WaterPage;
