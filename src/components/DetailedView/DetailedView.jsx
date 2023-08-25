import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";

function DetailedView() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    useEffect(() => {
        dispatch({ type: "GET_PLAN", payload: params.id });
    }, [params.id]);

    const plan = useSelector((store) => store.getPlanReducer.find((task) => task.id == params.id));
    console.log("this is the plan reducer on Detailed view", plan);



    return (
        <>
        <Typography variant="h3" sx={{textAlign: "center"}} >Plan</Typography>
        <br />
        <Card>
            <CardContent>
                <Typography variant="h5">{plan.task}</Typography>
                <Typography>{plan.comments}</Typography>
                <Typography>{plan.location}</Typography>
                <Typography>{new Date(plan.date_time).toLocaleString()}</Typography>
                <br />
                <Button style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', marginRight: "10px" }} onClick={() => dispatch({ type: "UPDATE_TASK", payload: parseInt(plan.id) })}>Completed</Button>
                <Button style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)' }} onClick={() => dispatch({ type: "DELETE_TASK", payload: plan.id })}>Delete</Button>
            </CardContent>
        </Card>
        </>
    )
}

export default DetailedView;