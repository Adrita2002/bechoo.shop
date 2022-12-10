import React from 'react'
import './Login.css'
import TextField from '@mui/material/TextField'
import  { Card,CardContent, Grid, Button } from '@mui/material'
const Login = () => {
  return (
    <div className='login'>
       <h2>Login</h2>
        <Card className='login-card'>
          <CardContent>
          <Grid container spacing={1}>
       <Grid xs={12} sm={12} item>
                <TextField label="Email" placeholder="Enter Institute ID" className='login-input' variant="outlined" fullWidth/>
             
                </Grid>
                <Grid xs={12} sm={12} item>
                <TextField label="Password" placeholder="Enter Password" className='login-input' variant="outlined" type="password" fullWidth helperText='Forgot Password?'/>
                </Grid>
                <Grid xs={12} sm={12} item>
                <Button variant="contained" color="success" center>
  Submit
</Button>
<br/>
  Need an account? 
                </Grid>
      
  </Grid>
          </CardContent>
        </Card>
    </div>
  )
}

export default Login