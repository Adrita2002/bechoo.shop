require('dotenv').config()
const mongoose = require('mongoose')

main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect(`mongodb+srv://Ana123:xPNApZxlmCFpYJCw@bechoodetails.f0dgp6e.mongodb.net/bechooDetails?retryWrites=true&w=majority`,()=>{
        console.log("Connected to Database")
    } )
}