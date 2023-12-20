const express = require("express");
const customerServiceRoute = express.Router();
const {
  getCustomerServices,
  getOneCustomerService,
  postCustomerService,
  putCustomerService,
  deleteCustomerService,
} = require("../Controllers/customerServiceController");
customerServiceRoute.get("/customerservices", getCustomerServices);
customerServiceRoute.get("/customerservices/:id", getOneCustomerService);
customerServiceRoute.post("/customerservices", postCustomerService);
customerServiceRoute.put("/customerservices/:id", putCustomerService);
customerServiceRoute.delete("/customerservices/:id", deleteCustomerService);

module.exports = customerServiceRoute;
