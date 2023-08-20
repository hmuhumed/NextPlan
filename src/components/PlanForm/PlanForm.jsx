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

  const handleSubmit = () => {
    const newTask = {
      task: task,
      comments: comments,
    };

    // Dispatch an action to create a new task
    dispatch({ type: "CREATE_TASK", payload: newTask });

    // Redirect the user back to the UserPage after creating the task
    history.push("/user");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4">Create New Task</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Task"
          value={task}
          onChange={handleTaskChange}
          fullWidth
          required
        />
        <TextField
          label="Comments"
          value={comments}
          onChange={handleCommentsChange}
          fullWidth
          multiline
        />
        <Button type="submit">Create Task</Button>
      </form>
    </Box>
  );
}

export default PlanForm;
