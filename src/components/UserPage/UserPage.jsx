import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography, Button, Box} from "@mui/material";
import { func } from "prop-types";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const plan = useSelector((store) => store.getPlanReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "GET_PLAN" });
  }, []);


  function createPlan() {
    console.log("create plan clicked");
    history.push("/plan");
  }

  return (
    <>
   <Card>
    <CardContent display="flex" sx={{ m: 5 }} flexDirection="row" alignItems="center">
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
                <Typography>{task.location}</Typography>
                <Typography> {new Date(task.date_time).toLocaleString()}</Typography>
                <br />
                <Button style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', marginRight: "10px"}} onClick={() => dispatch({type: "UPDATE_TASK", payload: parseInt(task.id)})}>Completed</Button>
                <Button style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'}} onClick={() => dispatch({type: "DELETE_TASK", payload: task.id})}>Delete</Button>
              </CardContent>
            </Card>
            <br />
          </div>
        ))}
      </CardContent>
      <Button style={{boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', marginRight: "10px", backgroundColor: "rgb(100, 149, 237)", color: "white"}} onClick={createPlan}>Create New Task</Button>
      </CardContent>
   </Card>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
