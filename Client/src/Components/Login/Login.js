import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import TextField from '@mui/material/TextField'
import  { Card,CardContent, Grid, Button } from '@mui/material'

const Login = () => {
  const [user, setUser] = useState({
    email:'',
    password:''
  })

  const navigate = useNavigate()
  function handleSubmit(e){
    e.preventDefault()
    // auth.login(user)
    
    axios.post('/loginuser',{
      email:user.email,
      password:user.password
    }).then(res=>{
      console.log(res.data)
    if(res.data.status=='ok'){ 
    localStorage.setItem('token',res.data.data)
    localStorage.setItem('userId',res.data.userId)
    navigate('/');
    
  }else{
    alert('Incorrect email ID or Password')
  }
    // console.log(res)
  }).catch(err=>console.log(err))
  }
  return (
    <div className='login'>
       <h2>Login</h2>
        <Card className='login-card'>
          <CardContent>
          <Grid container spacing={1}>
       <Grid xs={12} sm={12} item>
                <TextField label="Email" value={user.email} onChange={e=>setUser({...user, email:e.target.value})}  placeholder="Enter Institute ID" className='login-input' variant="outlined" fullWidth/>
             
                </Grid>
                <Grid xs={12} sm={12} item>
                <TextField label="Password" value={user.password} onChange={e=>setUser({...user, password:e.target.value})}  placeholder="Enter Password" className='login-input' variant="outlined" type="password" fullWidth />
                </Grid>
                <Grid xs={12} sm={12} item>
                <Button variant="contained" color="success" onClick={handleSubmit} center>
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