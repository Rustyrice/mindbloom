import React, { useState, useEffect, useCallback , memo} from "react";
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
import { PomodoroTimer, ListItem } from "components/RevisionComponents.js";

import { supabase } from "config/client";


function RevisionDailyPage() {
    const [revisionData, setRevisionData] = useState([]);

    // Data for the form, to add a new revision item
    const [topic, setTopic] = useState("");
    const [amount, setAmount] = useState(0);

    // If data is updated, this changes, which triggers a useEffect to update the data
    const [dataUpdated, setDataUpdated] = useState(false);

    // For the list of items
    const [active, setActive] = useState(0);

    // const [points, setPoints] = useState(0);

    // When the data is updated, update the revisionData
    useEffect(() => {
        getRevisionData();
        console.log(revisionData);
    }, [dataUpdated]);


    // Get the current date, in the format yyyy-mm-dd
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

    // Get the user's id
    async function getUserId() {
        const { data, error } = await supabase.auth.getSession()
        if (data.session) { // if there is a session, user is logged in
            return data.session.user.id;
        }
        throw error;
    }

    // Handle the form submission, to add a new revision item
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the page from refreshing
        

        if (!topic || !amount) { // If the topic or amount is empty, don't submit
            alert("Please fill in all the required fields");
            return;
        }

        const date = dateNow(); // Get the current date

        try {
            const { data, error } = await supabase
                .from("revision")
                .insert([
                    { topic: topic, goal: amount, progress: 0, date: date, user_id: await getUserId() },
                ]); // Insert the new item into the database
            if (error) throw error;

            setTopic(""); // Clear the topic
            setDataUpdated(!dataUpdated); // Update the data, to show the new item
        } catch (error) {
            alert(error.message);
            console.log("error", error);
        }
    };

    // Get the revision data from the database
    const getRevisionData = async () => {
        const date = dateNow(); // Get the current date

        const { data, error } = await supabase
            .from("revision")
            .select("*")
            .eq("date", date)
            .eq("user_id", await getUserId()); // Get the items for the current date
        if (error) throw error;
        
        setRevisionData(data);
    };


    // Handle the pomodoro timer completing
    const handlePomodoroComplete = async () => {
        console.log("Pomodoro complete");

        // Update the progress of the current item
        if (active === 0) return; // If there is no active item, don't do anything
        const item = revisionData.find((item) => item.id === active); // Get the current item
        const newProgress = item.progress + 1; // Increment the progress

        // If the progress is equal to the goal, delete the item
        if (newProgress === item.goal) {
            const { data, error } = await supabase
                .from("revision")
                .delete()
                .eq("id", active); // Delete the item
            if (error) throw error;
        }

        const { data, error } = await supabase
            .from("revision") 
            .update({ progress: newProgress })
            .eq("id", active); // Update the progress of the current item
        if (error) throw error;

        setDataUpdated(!dataUpdated); // Update the data, to show the new progress

        const date = dateNow(); // Get the current date

        // Get points for today
        const { data: pointsData, error: pointsError } = await supabase
            .from("points")
            .select("*")
            .eq("date", date)
            .eq("user_id", await getUserId())
            .eq("type", "revision");
        if (pointsError) throw pointsError;

        console.log("Points data", pointsData);

        // If there are no points for today, insert a new row
        if (pointsData.length === 0) {
            const { data, error } = await supabase
                .from("points")
                .insert([
                    {
                        user_id: await getUserId(),
                        date: date,
                        points: 5,
                        type: "revision",
                    },
                ]);
            if (error) throw error;
        } else {
            // Otherwise, update the points
            const { data, error } = await supabase
                .from("points")
                .update({ points: pointsData[0].points + 5 })
                .eq("id", pointsData[0].id);
            if (error) throw error;

            console.log("Updated points", data);
        }

        setTopic(""); // Clear the topic
        setDataUpdated(!dataUpdated); // Update the data, to show the new item

        // Update the points
        // setPoints(points + 5);
        alert("You have earned " + 5 + " points for completing a pomodoro!");
    };

    // Create a ListItem for each item in the database
    const ListItems = revisionData.map((item) => (
        <ListItem
            key={item.id}
            setActive = {() => setActive(item.id)}
            active={active === item.id}
            id={item.id}
            title={item.topic}
            goal={item.goal}
            progress={item.progress}
            deletedItem={() => setDataUpdated(!dataUpdated)}
        />
    ));


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("revision-landing-page");
    return function cleanup() {
      document.body.classList.remove("revision-landing-page");
    };
  });
  
    return (
      <div>
        <IndexNavbar title="• Revision"/>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "40vh",
            backgroundImage: "url(https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)",
        }}>
            <PomodoroTimer completed={handlePomodoroComplete} />
        </div>
          <div className="content-center" style={{paddingTop: "30px"}}>
            <Container>

                <ListGroup>
                    <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>

                        <div  style={{display: "flex", flexDirection: "row", width: "60%"}}>
                            <InputGroup style={{width: "60%", marginRight: "10px"}}>
                                <InputGroupText>
                                    Topic
                                </InputGroupText>
                                <Input 
                                    addon 
                                    type="text" 
                                    value={topic} 
                                    maxLength={25} 
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value.length <= 30) {
                                            setTopic(value);
                                        }
                                    }}
                                />
                            </InputGroup>

                            <InputGroup style={{width: "30%"}}>
                                <InputGroupText>
                                    Amount
                                </InputGroupText>
                                <Input 
                                    addon 
                                    type="text" 
                                    value={amount}
                                    max={1}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (!isNaN(value) && value <= 5) {
                                            setAmount(value);
                                        }
                                    }}
                                />
                            </InputGroup>
                        </div>

                        <Button color="success" onClick={handleSubmit}>Add</Button>

                    </ListGroupItem>
                </ListGroup>

                <div style={{height: "30px"}}/>
                <ListGroup>
                    {ListItems}
                </ListGroup>

            </Container>
          </div>

        </div>
      
    );
}

export default RevisionDailyPage;