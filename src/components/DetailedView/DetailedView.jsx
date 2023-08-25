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



    return (
        <>
        <h2>Hello Bastardsss</h2>
        </>
    )
}

export default DetailedView;