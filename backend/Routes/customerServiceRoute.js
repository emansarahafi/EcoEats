const express = require("express");
const customerServiceRoute = express.Router();
const {
  getCustomerServices,
  getOneCustomerService,
  postCustomerService,
  putCustomerService,
  deleteCustomerService,
} = require("../Controllers/customerServiceController");

customerServiceRoute.get("/customer-services", getCustomerServices);
customerServiceRoute.get("/customer-services/:id", getOneCustomerService);
customerServiceRoute.post("/customer-services", postCustomerService);
customerServiceRoute.put("/customer-services/:id", putCustomerService);
customerServiceRoute.delete("/customer-services/:id", deleteCustomerService);

module.exports = customerServiceRoute;
