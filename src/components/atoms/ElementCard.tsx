import React from "react";
import {Button, CardHeader} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {ListElement} from "../../types/models/ListElement.model";


interface ElementCardProps {
    listElement: ListElement;
    onClick: () => void;
}


export default function ElementCard({listElement, onClick}: ElementCardProps) {

    return (
        <Card sx={{minHeigth: "100px", height: "100%"}}>
            <CardHeader title={listElement.title} />
            <CardContent>
                {listElement.text}
            </CardContent>
            <Button onClick={onClick} variant="contained">View List</Button>
        </Card>
    );
}
