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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

import { supabase } from "config/client";


function SleepPage() {
    const [dailyRevision, setDailyRevision] = useState([]);

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [quality, setQuality] = useState("");
    const [amount, setAmount] = useState(0);
    const [notes, setNotes] = useState("");
    const [goal, setGoal] = useState("");

    const data = [
        {
            name: 'Sleep',
            uv: 8,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Goal',
            uv: 9,
            pv: 1398,
            amt: 2210,
        },
    ];


    const [dataUpdated, setDataUpdated] = useState(false);

    async function getUserId() {
        const { data, error } = await supabase.auth.getSession()
        if (data.session) { // if there is a session, user is logged in
            return data.session.user.id;
        }
        throw error;
    }


    const handleSleepSubmit = async (e) => {
        let value = to - from;
        data[0].uv = value;
        setDataUpdated(!dataUpdated);
        e.preventDefault();
    };
    const handleSubmit = async (e) => {

    }

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
    };


    useEffect(() => {
        getDailyRevision();
        console.log(dailyRevision);
    }, [dataUpdated]);

    const ListItems = dailyRevision.map((item) => (
        <ListItem
            key={item.id}
            title={item.topic}
            goal={item.goal}
            progress={item.progress}
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
        <IndexNavbar title="• Sleep"/>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "40vh",
            backgroundImage: "url(https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)",
        }}>
        <h1 className='presentation-title'>Sleep</h1>
        </div>
          <div className="content-center" style={{paddingTop: "30px"}}>
            <Container>
                <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    {/*<div  style={{display: "flex", flexDirection: "row", width: "60%"}}>*/}
                    {/*    */}
                    {/*</div>*/}
                    <Button color="success" onClick={handleSubmit}>Prev</Button>
                    <h1 className='content-center'>Today</h1>
                    <Button color="success" onClick={handleSubmit}>Next</Button>
                </ListGroupItem>
                <br/>
                <BarChart 
                    width={1000}
                    height={600}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="uv" barSize={30} fill="#8884d8"
                        />
                </BarChart>
                <br/>
                <ListGroup>
                    <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
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
                                <Input addon type="number" value={from} onChange={(e) => setFrom(e.target.value)}/>
                                <InputGroupText>
                                    To
                                </InputGroupText>
                                <Input addon type="number" value={to} onChange={(e) => setTo(e.target.value)}/>
                            </InputGroup>
                        </div>
                        <Button color="success" onClick={handleSleepSubmit}>Add</Button>
                    </ListGroupItem>
                    <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div  style={{display: "flex", flexDirection: "row", width: "60%"}}>
                            <InputGroup style={{width: "60%", marginRight: "10px"}}>
                                <InputGroupText>
                                   Sleep Quality
                                </InputGroupText>
                            </InputGroup>
                            <InputGroup style={{width: "90%"}}>
                                <Input addon type="text" value={quality} onChange={(e) => setQuality(e.target.value)}/>
                            </InputGroup>
                        </div>
                        <Button color="success" onClick={handleSubmit}>Add</Button>
                    </ListGroupItem>
                    <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div  style={{display: "flex", flexDirection: "row", width: "60%"}}>
                            <InputGroup style={{width: "60%", marginRight: "10px"}}>
                                <InputGroupText>
                                    Goal
                                </InputGroupText>
                            </InputGroup>
                            <InputGroup style={{width: "90%"}}>
                                <Input addon type="text" value={goal} onChange={(e) => setGoal(e.target.value)}/>
                            </InputGroup>
                        </div>
                        <Button color="success" onClick={handleSubmit}>Add</Button>
                    </ListGroupItem>
                    <ListGroupItem style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <div  style={{display: "flex", flexDirection: "row", width: "60%"}}>
                            <InputGroup style={{width: "60%", marginRight: "10px"}}>
                                <InputGroupText>
                                    Sleep Notes
                                </InputGroupText>
                            </InputGroup>
                            <InputGroup style={{width: "90%"}}>
                                <Input addon type="text" value={notes} onChange={(e) => setNotes(e.target.value)}/>
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

export default SleepPage;