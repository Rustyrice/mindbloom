import React, { Component } from "react";
import { Button, ListGroupItem } from "reactstrap"

export function ListItem({title, progress, goal}) {
    return(
    <ListGroupItem>
        <div style={{flexDirection: "row", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <b style={{width: "100px"}}>{title}</b>
            <p>{progress}/{goal}</p>
            <Button color="danger">Delete</Button>
        </div>
    </ListGroupItem>
    );
}