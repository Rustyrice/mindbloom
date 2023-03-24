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
import { PomodoroTimer, ListItem } from "components/RevisionDailyComponents.js";

import { supabase } from "config/client";


function RevisionDailyPage() {
    const [dailyRevision, setDailyRevision] = useState([]);

    const [topic, setTopic] = useState("");
    const [amount, setAmount] = useState(0);

    const [dataUpdated, setDataUpdated] = useState(false);

    const [active, setActive] = useState(0);
    const [currentItem, setCurrentItem] = useState();

    async function getUserId() {
        const { data, error } = await supabase.auth.getSession()
        if (data.session) { // if there is a session, user is logged in
            return data.session.user.id;
        }
        throw error;
    }

    useEffect(() => {
        setCurrentItem(dailyRevision.find(item => item.id === active));
    }, [active]);

    useEffect(() => {
        getDailyRevision();
        console.log(dailyRevision);
    }, [dataUpdated]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!topic || !amount) {
            alert("Please fill in all the required fields");
            return;
        }

        var date = new Date();

        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });

        // Generate yyyy-mm-dd date string
        var formattedDate = year + "-" + month + "-" + day;


        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from("revision")
                .insert([
                    { topic: topic, goal: amount, progress: 0, date: formattedDate, user_id: await getUserId() },
                ]);
            if (error) throw error;
            setDataUpdated(!dataUpdated);
        } catch (error) {
            alert(error.message);
            console.log("error", error);
        }
    };

    const getDailyRevision = async () => {
        var date = new Date();

        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });

        // Generate yyyy-mm-dd date string
        var formattedDate = year + "-" + month + "-" + day;

        const { data, error } = await supabase
            .from("revision")
            .select("*")
            .eq("date", formattedDate)
            .eq("user_id", await getUserId());
        if (error) throw error;
        
        setDailyRevision(data);
        console.log(data);
    };

    const ListItems = dailyRevision.map((item) => (
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
        <IndexNavbar />
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "40vh",
            backgroundImage: "url(https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)",
        }}>
            <PomodoroTimer expiryTimestamp={Date.now() + 1000 * 60 * 25} item={currentItem} itemUpdated={() => setDataUpdated(!dataUpdated)} />

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
                    {/* <ListItem title="maths" goal="3" progress="2"/>
                    <ListItem title="ai" goal="2" progress="1"/>
                    <ListItem title="system arch" goal="3" progress="1"/> */}
                </ListGroup>

            </Container>
          </div>
        </div>
      
    );
}

export default RevisionDailyPage;