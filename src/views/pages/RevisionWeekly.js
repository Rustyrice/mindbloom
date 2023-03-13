import React from 'react';
import {DayPilot, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import ToDoList from 'components/ToDoList';


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
        {/* <DayPilotNavigator selectMode={"Week"}
        showMonths={3}
        skipMonths={3}
        onTimeRangeSelected={ args => {
          this.setState({
            startDate: args.day
          });
          getTaskWeek(args.day);
        }} /> */}
        <ToDoList/>
      </div>
    
    );
}


export default RevisionWeeklyPage;