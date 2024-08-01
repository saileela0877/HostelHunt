const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1/HH"

const connectMongo=async()=>{
    await mongoose.connect(url);
    console.log("Connected to Mongo");

}

module.exports = connectMongo;