import React, { useState } from 'react';
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


function RevisionWeeklyPage() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [todos, setTodos] = useState([]);

  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!topic) return;
    setTodos([...todos, { text: topic, date: date }]);
    setTopic('');
    setDate('');
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  // const handleInputChange = (event) => {
  //   setTopic(event.target.value);
  // };
  // const handledateChange = (event) => {
  //   setDate(event.target.value);
  // };


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("revison-page");
    return function cleanup() {
      document.body.classList.remove("revision-page");
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
        <h1 className='presentation-title'>Weekly To-Do List</h1>
      </div>

      {/* <ToDoList/> 
       */}

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


            <ListGroup style={{ padding: "10px 0" }}>
              <ListGroupItem style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                <div style={{ display: 'flex', flexDirection: 'row', width: '60%' }}>
                  <InputGroup style={{ width: "60%", marginRight: "10px" }}>
                    <InputGroupText>
                      Topic
                    </InputGroupText>
                    <Input addon type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
                  </InputGroup>

                  <InputGroup style={{ width: "35%" }}>
                    <InputGroupText>
                      Date
                    </InputGroupText>
                    <Input addon type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </InputGroup>
                </div>

                <Button color="success" onClick={handleSubmit}>Add</Button>

              </ListGroupItem>
            </ListGroup>


         

          {/* <form onSubmit={handleSubmit}>
            <input type="text" value={topic}  placeholder="Input task..." />
            <input type="date" value={date}  />
            <Button className="btn-round"
              color="danger">Add</Button>
          </form> */}

            <div className="revisionCardContainer">
              {todos.map((todo, index) => (

                <CardBody className="my-li" key={index}>
                  <CardTitle tag="h5">{todo.text}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted">Due: {todo.date}</CardSubtitle>
                  <CardText>
                    ...
                  </CardText>
                  <Button onClick={() => handleDelete(index)}>Delete</Button>
                </CardBody>

                // <li key={index} className="my-li task" >
                //   <div>
                //     <span>{todo.text}</span>
                //   </div>
                //   {todo.date.length > 0 &&
                //     <div className="due-date">
                //       Due: {todo.date}
                //     </div>
                //   }

                //   <Button className="btn-round"
                //     color="danger" onClick={() => handleDelete(index)}>Delete</Button>
                // </li>

              ))}
            </div>

        </Container>

      </div>

    </div>



  );
}


export default RevisionWeeklyPage;
