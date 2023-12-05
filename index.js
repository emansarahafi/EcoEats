const express = require("express");
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute"); 
const connectDb = require('./Configuration/connectDb');
var cors = require('cors');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
connectDb();
app.use(cors());

app.listen(port, (er) => {
    if (er) {
        console.log(er);
    } else {
        console.log(`server is running on port ${port}`);
    }
});

app.use(express.json());
app.use("/api", userRoute); 
app.use("/api/products", productRoute); 
app.use('/uploads', express.static('uploads'));
