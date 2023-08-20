import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import {Card, CardContent, Typography} from '@mui/material';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      <Typography variant='h2'>Welcome, {user.username}!</Typography>
      <br />
      <LogOutButton className="btn" />
      
      <Card className="container" style={{borderRadius: "px"}}  elevation={6}>
      <Typography variant='h2' style={{textAlign: "center"}} >Upcoming Tasks</Typography>
        <CardContent>
          <Card style={{maxWidth: "50%", height: "200px"}} elevation={4}>
            <CardContent>
              <Typography>
                Hi, my name is JavaScript and I am a task. I am due on 10/10/2021.
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
    </Card>
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
