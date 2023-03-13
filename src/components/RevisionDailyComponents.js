import React, { useState } from "react";
import { Button, ListGroupItem } from "reactstrap";
import { useTimer } from 'react-timer-hook'; // https://www.npmjs.com/package/react-timer-hook
import {ReactComponent as Plant} from 'assets/img/plant-1573.svg';

export function ListItem({title, progress, goal}) {
    const arr = [];
    const arr1 = [<Plant/>, <Plant/>, <Plant/>];
    for (let i = 0; i < progress; i++) {
        arr.push(<Plant key={i}/>);
    }
    return(
    <ListGroupItem>
        <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <b style={{width: "100px"}}>{title}</b>
            <p>{arr}<span class = "plant-div">/</span>{arr1}</p>
            <Button color="danger">Delete</Button>
        </div>
    </ListGroupItem>
    );
}


export function PomodoroTimer({ expiryTimestamp }) {
    const [hasStarted, setHasStarted] = useState(false);

    const {
      seconds,
      minutes,
      hours,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => console.warn('onExpire called') });

    // Format the time values to add leading 0, if required
    var hoursString = hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    var minutesString = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    var secondsString = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})

    const handleStart = () => {
        setHasStarted(true);
        start();
    }

    const handleRestart = () => {
        // Restarts to 25 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 25 * 60);
        restart(time)
        pause()
        setHasStarted(false);
    }

    const displayButton = () => {
        if (!hasStarted) {
            return <Button onClick={handleStart}>Start</Button>
        } else if (isRunning) {
            return <Button onClick={pause}>Pause</Button>
        } else {
            return <Button onClick={resume}>Resume</Button>
        }
    }
  
  
    return (
        <div style={{backgroundColor: "white", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "0px 50px 10px 50px"}}>

        <div style={{marginBottom: "10px", fontSize: "50px"}}>
          <span>{hoursString}</span>:<span>{minutesString}</span>:<span>{secondsString}</span>
        </div>

        {displayButton()}

        {hasStarted ? <Button style={{marginTop: "10px"}} onClick={handleRestart}>Restart</Button> : null }

        {/* <button onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time)
        }}>Restart</button> */}
      </div>
    );
  }
