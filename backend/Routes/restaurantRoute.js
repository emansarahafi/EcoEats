const express = require("express");
const restaurantRoute = express.Router();
const {
  getRestaurants,
  getRestaurantProducts,
  getOneRestaurant,
  postRestaurant,
  putRestaurant,
  deleteRestaurant,
} = require("../Controllers/restaurantController");

restaurantRoute.get("/restaurants", getRestaurants);
restaurantRoute.get("/restaurants/:id/products", getRestaurantProducts);
restaurantRoute.get("/restaurants/:id", getOneRestaurant);
restaurantRoute.post("/restaurants", postRestaurant);
restaurantRoute.put("/restaurants/:id", putRestaurant);
restaurantRoute.delete("/restaurants/:id", deleteRestaurant);

module.exports = restaurantRoute;
