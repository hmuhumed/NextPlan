import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";

function PlanForm() {
  const [task, setTask] = useState("");
  const [comments, setComments] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newTask = {
      task: task,
      comments: comments,
    };

    //dispatches the new task to the saga
    dispatch({ type: "CREATE_TASK", payload: newTask });


    // sends the user back to the UserPage after creating the task
    history.push("/user");
  };

  return (
    <Box display="flex" sx={{ m: 5 }} flexDirection="column" alignItems="center">
      <Typography variant="h4">Create New Task</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Task"
          value={task}
          margin="normal"
          onChange={handleTaskChange}
          fullWidth
          required
          autoComplete="off"
        />
        <TextField
          label="Comments"
          value={comments}
          margin="none"
          onChange={handleCommentsChange}
          fullWidth
          multiline
        />
        <Box display="flex" justifyContent="flex-end">
        <Button type="submit" alignItems="">Create Task</Button>
        </Box>
      </form>
    </Box>
  );
}

export default PlanForm;
