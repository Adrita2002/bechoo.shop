require('dotenv').config()
const mongoose = require('mongoose')

main().catch(err=>console.log(err));

async function main(){
    await mongoose.connect(`mongodb+srv://adrita2403:ana2403@bechoodetails.f0dgp6e.mongodb.net/?retryWrites=true&w=majority`,()=>{
        console.log("Connected to Database")
    } )
}