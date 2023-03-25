import React, { useState, useEffect } from 'react';
import {
  ListGroup,
  ListGroupItem,
  InputGroup,
  InputGroupText,
  Input,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Container,
  Button,
} from "reactstrap";

import IndexNavbar from 'components/Navbars/IndexNavbar';
import { RevisionCard } from 'components/RevisionComponents.js';

import { supabase } from 'config/client';


function RevisionWeeklyPage() {
  const [revisionData, setRevisionData] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);

  // Form states
  const [topic, setTopic] = useState(''); 
  const [date, setDate] = useState('');
  const [goal, setGoal] = useState(0);

  useEffect(() => {
    getRevisionData();
  }, [dataUpdated]);

  async function getUserId() {
    const { data, error } = await supabase.auth.getSession()
    if (data.session) { // if there is a session, user is logged in
        return data.session.user.id;
    }
    throw error;
  }

  async function getRevisionData() {
    const userId = await getUserId();
    const { data, error } = await supabase
      .from('revision')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true });
    if (data) {
      setRevisionData(data);
    }
    throw error;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!topic || !date) {
      alert("Please fill in all the required fields");
      return;
    }

    // Add new todo
    const { data, error } = await supabase
        .from("revision")
        .insert([
            { topic: topic, goal: goal, progress: 0, date: date, user_id: await getUserId() },
        ]); // Insert the new item into the database
    if (error) throw error;

    setDataUpdated(!dataUpdated); // Update the data, to show the new item

    // Clear form
    setTopic('');
    setDate('');
  };

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  // Create a ListItem for each item in the database
  const revisionCards = revisionData.map((item) => (
    <RevisionCard
      key={item.id}
      id={item.id}
      topic={item.topic}
      goal={item.goal}
      progress={item.progress}
      date={item.date}
      deletedItem={() => setDataUpdated(!dataUpdated)}
    />
));

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("revison-page");
    return function cleanup() {
      document.body.classList.remove("revision-page");
    };
  });

  return (
    <div>

      <IndexNavbar title="• Revision"/>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "40vh",
        backgroundImage: "url(https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80)",
      }}>
        <h1 className='presentation-title' style={{marginTop: '45px'}}>Weekly To-Do List</h1>
      </div>


      <div className='todo-list-container'>
        <div style={{paddingTop: "30px"}} />

        <Container>

          <div>
              <select value={selectedWeek} onChange={handleWeekChange}>
                {Array.from({ length: 52 }, (_, i) => i + 1).map((week) => (
                  <option key={week} value={week}>Week {week}</option>
                ))}
              </select>
              {/* your task components here */}
           </div>


            {/* Form */}
            <ListGroup style={{ padding: "10px 0" }}>
              <ListGroupItem style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                <div style={{ display: 'flex', flexDirection: 'row' }}>

                  <InputGroup style={{ width: "60%", marginRight: "10px" }}>
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

                  <InputGroup style={{ width: "35%", marginRight: "10px" }}>
                    <InputGroupText>
                      Due Date
                    </InputGroupText>
                    <Input addon type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </InputGroup>

                  <InputGroup style={{width: "30%"}}>
                      <InputGroupText>
                          Amount
                      </InputGroupText>
                      <Input 
                          addon 
                          type="text" 
                          value={goal}
                          max={1}
                          onChange={(e) => {
                              const value = e.target.value;
                              if (!isNaN(value) && value <= 5) {
                                  setGoal(value);
                              }
                          }}
                      />
                  </InputGroup>

                </div>

                <Button color="success" onClick={handleSubmit}>Add</Button>

              </ListGroupItem>
            </ListGroup>

            {/* List */}
  
            <div className="revisionCardContainer">
              {revisionCards}
            </div>

        </Container>

      </div>

    </div>



  );
}


export default RevisionWeeklyPage;
