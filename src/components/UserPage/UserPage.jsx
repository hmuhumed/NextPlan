import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography, Button} from "@mui/material";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const plan = useSelector((store) => store.getPlanReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_PLAN" });
  }, []);

  return (
    <>
      <Typography variant="h4">Welcome, {user.username}!</Typography>
      <br />
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Upcoming Tasks
      </Typography>
      <br />

      <CardContent>
        {plan.map((task, i) => (
          <div key={i}>
            <Card elevation={4}>
              <CardContent>
                <Typography>{task.task}</Typography>
                <Typography>{task.comments}</Typography>
              </CardContent>
            </Card>
            <br />
          </div>
        ))}
      </CardContent>
      <Button style={{boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'}} onClick={() => console.log("Button Clicked")}>Create New Task</Button>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
