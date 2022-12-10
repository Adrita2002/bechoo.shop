require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('./db/conn')

const User = require('./db/models/userDetails')

app.use(express.json())
const port = process.env.PORT || 8000

//Create users through registration
app.post('/registeruser',async(req, res)=>{
    try {
        console.log(req.body)
    const user = new User(req.body)
    console.log(user)
    // await user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((err)=>res.status(400).send(err))
    await user.save()
    res.send(user)
    }catch(err){
        console.log(err)
    }
    
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});

mongoose.set('strictQuery', false);