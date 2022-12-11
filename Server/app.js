require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken')
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('./db/conn')
const protect = require('./middleware')
const User = require('./db/models/userDetails');
const { JWT_SECRET } = require('./utils')
const { createSearchParams } = require('react-router-dom');

app.use(express.json())
const port = process.env.PORT || 8000


//-----Authentication-----
//Create users through registration
app.post('/registeruser',async(req, res)=>{
    const encryptedPassword = await bcrypt.hash(req.body.password,10)
    try {
        // console.log(req.body)
        // const oldUser = await User.find({email:req.body.email});
        // if(oldUser) return res.send('User exists');
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:encryptedPassword
    })
    console.log(user)
    // await user.save().then(()=>{
    //     res.status(201).send(user)
    // }).catch((err)=>res.status(400).send(err))
    
    await user.save()
    res.json(user)
    }catch(err){
        console.log(err)
    }
    
})

//Login User
app.post('/loginuser',async(req,res)=>{
    const {email, password} = req.body;
try{
    const user = await User.findOne({email});
    if(!user){
        return res.send("User does not Exist")
    }
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({user}, JWT_SECRET) ;
        if(res.status(201)){return res.json({
            status:'ok',
            data:token
        })}else{
            return res.json({error:'error'})
        }
    }
    res.json({status:'error',error:"Invalid Password"})

}catch(err){
    console.log(err)
}
    
})

//After login
app.get('/user/info',protect,async (req,res)=>{
    try{
     const userID = req.user._id;
     const user = await User.findById(userID) ;
     if(!user){
        return res.status(400).json({
            status:'Fail',
            message:'User details not found'
        })
     } 
     return res.status(200).json({
        status:'Success',
        data:user
     })
    
    }catch(err){
        res.status(400).json({
            status:"Fail",
            message:err
        });
        console.log(err);
    }
})



app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});

mongoose.set('strictQuery', false);