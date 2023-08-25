import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box} from "@mui/material";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const plan = useSelector((store) => store.getPlanReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    dispatch({ type: "GET_PLAN" });
  }, []);


  function createPlan() {
    console.log("create plan clicked");
    history.push("/plan");
  }
console.log("this is the plan reducer",plan);
  return (
    <>
   <Card>
    <CardContent>
   <Typography variant="h4">Welcome, {user.username}!</Typography>
      <br />
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Upcoming Tasks
      </Typography>
      <br />
      <CardContent >
        {plan.map((task, i) => (
          <div key={i}>
            <Card elevation={4} sx={{ display: 'flex',flexDirection: 'row',justifyContent:'space-evenly'}} onClick={() => history.push(`/${task.id}`)}>
              <CardContent>
                <Typography variant="h5"></Typography>
                <Typography>{task.task}</Typography>
                <Typography>{task.comments}</Typography>
                <Typography>{task.location}</Typography>
                <Typography> {new Date(task.date_time).toLocaleString()}</Typography>
                <br />
                <Button style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', marginRight: "10px"}} onClick={() => dispatch({type: "UPDATE_TASK", payload: parseInt(task.id)})}>Completed</Button>
                <Button style={{ boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'}} onClick={() => dispatch({type: "DELETE_TASK", payload: task.id})}>Delete</Button>
              </CardContent>
              <CardContent >
                    <CardContent >
                      <Typography variant="h5" style={{marginRight:'200px'}}>Current Weather in {task.location}</Typography>
                      <Box>
                        {/* <Typography variant="h3">{task.weather.main.temp}℉</Typography> */}
                        <img src={`http://openweathermap.org/img/w/${task.weather.weather[0].icon}.png`} alt="weather icon" />
                        <br />
                        <Typography>its currently {task.weather.main.temp}℉ in {task.location}</Typography>
                      </Box>
                      <Typography>{task.weather.weather[0].description}</Typography>
                      <Typography>Humidity{task.weather.main.humidity}%</Typography>
                      <Typography>wind speed {task.weather.wind.speed}mph</Typography>
                    </CardContent>
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
