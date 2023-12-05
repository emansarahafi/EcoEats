const dotenv = require("dotenv"); 
dotenv.config();
const url = process.env.URL;

const mongoose = require("mongoose"); 
const connectDb = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB Atlas successfully.");
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed:', error);
    } 
};
module.exports = connectDb;