import React from 'react';
import {DayPilot, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import ToDoList from 'components/ToDoList';
import IndexNavbar from 'components/Navbars/IndexNavbar';


function RevisionWeeklyPage(){
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
      document.body.classList.add("revison-page");
      return function cleanup() {
        document.body.classList.remove("revision-page");
      };
    });
    return (
      <div>
        
        <IndexNavbar/>
        
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
        <ToDoList/> 
        
      </div>
      

    
    );
}


export default RevisionWeeklyPage;