import React, { useEffect, useState, memo } from "react";
import {
    ButtonGroup,
    Button,
    ListGroupItem,
    Row,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
} from "reactstrap";
import { useTimer } from 'react-timer-hook'; // https://www.npmjs.com/package/react-timer-hook

import { BsSkipEnd } from "react-icons/bs";
import { RiPlantLine, RiPlantFill } from "react-icons/ri";

import { supabase } from "config/client";


// A component to display a list item
export function ListItem({title, progress, goal, id, setActive, active = false, deletedItem}) {

    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (!confirmed) return;
        
        const { data, error } = await supabase
            .from("revision")
            .delete()
            .eq("id", id);
        if (error) throw error;
        deletedItem();
    }

    const progressPlants = () => {
        const arr = [];
        for (let i = 0; i < progress; i++) {
            arr.push(<RiPlantFill key={i}/>);
        }
        return arr;
    }

    const goalPlants = () => {
        const arr = [];
        for (let i = 0; i < (goal - progress); i++) {
            arr.push(<RiPlantLine key={i}/>);
        }
        return arr;
    }

    return (
        <ListGroupItem onClick={setActive} active={active} style={{border: "2px solid #dadada", borderRadius: "7px"}}>
            <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <b style={{width: "100px"}}>{title}</b>
                {/* <p>{plants(progress)}<span class = "plant-div">/</span>{plants(goal)}</p> */}
                <p>{progressPlants()}{goalPlants()}</p>
                <Button onClick={handleDelete} color="danger">Delete</Button>
            </div>
        </ListGroupItem>

    );
}


// A component to display a timer
export const PomodoroTimer = ({ expiryTimestamp = Date.now() + 1000 * 60 * 25 , completed }) => {
    const [hasStarted, setHasStarted] = useState(false);
    const [option, setOption] = useState(1); // 1 = pomodoro, 2 = break, 3 = long break

    const {
      seconds,
      minutes,
      hours,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({ expiryTimestamp, autoStart: false });


    // Format the time values to add leading 0, if required
    var hoursString = hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    var minutesString = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    var secondsString = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})

    // When the timer is completed, call the completed function
    useEffect(() => {
        console.log("help")
        if (option === 2 && !isRunning) {
            completed();
        }
    }, [isRunning]);


    const handleStart = () => {
        setHasStarted(true);
        start();
    }

    const handleRestart = (minutes, num) => {
        if (num) { 
            setOption(num); // Set the option to the button that was clicked
        }
        const time = new Date();
        time.setSeconds(time.getSeconds() + minutes * 60);
        restart(time)
        pause()
        setHasStarted(false);
    }

    const handleSkip = () => {
        if (option === 1) {
            handleRestart(5, 2);
        } else if (option === 2) {
            handleRestart(25, 1);
        } else {
            handleRestart(25, 1);
        }
    }

    // Display the correct button depending on the state of the timer
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

            {/* Timer Length */}
            <div style={{margin: "10px 0 10px 0"}}>
                <ButtonGroup>
                    <Button size="sm" active={option === 1} onClick={() => handleRestart(25, 1)}>Pomodoro</Button>
                    <Button size="sm" active={option === 2} onClick={() => handleRestart(5, 2)}>Break</Button>
                    <Button size="sm" active={option === 3} onClick={() => handleRestart(15, 3)}>Long Break</Button>
                </ButtonGroup>
            </div>


            {/* Timer */}
            <div style={{marginBottom: "10px", fontSize: "50px"}}>
                <span>{hoursString}</span>:<span>{minutesString}</span>:<span>{secondsString}</span>
            </div>

            {/* Buttons */}
            <Row>
                {displayButton()}
                {hasStarted ? <Button style={{marginLeft: "10px"}} onClick={handleSkip}><BsSkipEnd/></Button> : null }
            </Row>

      </div>
    );
  };


// A component to display a revision card, for revision weekly page
export const RevisionCard = ({topic, date, goal, progress, id, deletedItem}) => {

      const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (!confirmed) return;
        
        const { data, error } = await supabase
            .from("revision")
            .delete()
            .eq("id", id);
        if (error) throw error;
        deletedItem();
    }
    

    const goalPlants = () => {
        const arr = [];
        for (let i = 0; i < (goal - progress); i++) {
            arr.push(<RiPlantLine key={i}/>);
        }
        return arr;
    }

    const progressPlants = () => {
        const arr = [];
        for (let i = 0; i < progress; i++) {
            arr.push(<RiPlantFill key={i}/>);
        }
        return arr;
    }

    return (

    <CardBody className="my-li">
      <CardTitle tag="h5">{topic}</CardTitle>
      <CardSubtitle className="mb-2 text-muted">Due: {date}</CardSubtitle>
      <CardText>
        {progressPlants()}{goalPlants()}
      </CardText>
      <Button onClick={handleDelete}>Delete</Button>
    </CardBody>

    );
}
