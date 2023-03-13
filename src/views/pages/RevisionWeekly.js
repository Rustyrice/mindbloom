import React from 'react';
import {DayPilot, DayPilotNavigator} from "@daypilot/daypilot-lite-react";

function getTaskWeek(){
  var startDate = new DayPilot.Date().firstDayOfWeek();
  var endDate = startDate.addDays(7);
  var params = {
    start: startDate.toString(),
    end: endDate.toString()
  };
  var url = "backend_tasks.php?start=" + params.start + "&end=" + params.end;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      this.setState({
        tasks: data
      });
    });
  return (
    <>
      <div>
          <DayPilotNavigator selectMode={"Week"}
          showMonths={3}
          skipMonths={3}
          onTimeRangeSelected={ args => {
            this.setState({
              startDate: args.day
            });
            getTaskWeek(startDate);
          }} />
      </div>
      

    </>
    
  );
}


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
        <DayPilotNavigator selectMode={"Week"}
        showMonths={3}
        skipMonths={3}
        onTimeRangeSelected={ args => {
          this.setState({
            startDate: args.day
          });
          getTaskWeek(args.day);
        }} />
      </div>
    
    );
}


export default RevisionWeeklyPage;