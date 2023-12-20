const express = require("express");
const orderRoute = express.Router();
const {
  getOrders,
  getOneOrder,
  postOrder,
  putOrder,
  deleteOrder,
} = require("../Controllers/orderController");

const authMiddleware = require("../middleware/isAuth");
orderRoute.use(authMiddleware);
orderRoute.get("/orders", getOrders);
orderRoute.get("/orders/:id", getOneOrder);
orderRoute.post("/orders", postOrder);
orderRoute.put("/orders/:id", putOrder);
orderRoute.delete("/orders/:id", deleteOrder);

module.exports = orderRoute;
