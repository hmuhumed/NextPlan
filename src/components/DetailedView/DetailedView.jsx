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
        <h2>Hello Bastardsss</h2>
        </>
    )
}

export default DetailedView;