const express = require("express");
const userRoute = require("./Routes/userRoute");
const productRoute = require("./Routes/productRoute");
const customerServiceRoute = require("./Routes/customerServiceRoute");
const orderRoute = require("./Routes/orderRoute");
const restaurantRoute = require("./Routes/restaurantRoute");
const connectDb = require('./Configuration/connectDb');
const cors = require('cors');
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
        console.log(`Server is running on port ${port}`);
    }
});

app.use(express.json());
app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", customerServiceRoute);
app.use("/api", restaurantRoute);
app.use('/uploads', express.static('uploads'));
app.use("/api", orderRoute);
