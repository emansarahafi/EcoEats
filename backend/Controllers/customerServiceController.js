const CustomerService = require("../models/CustomerService");

// Get all customer services
const getCustomerServices = async (request, response) => {
  try {
    const customerServices = await CustomerService.find().populate('user');
    response.status(200).json({ customerServices: customerServices });
  } catch (error) {
    response.status(500).json({ msg: "Error on getting customer services" });
  }
};

// Get one customer service
const getOneCustomerService = async (req, res) => {
  const id = req.params.id;
  try {
    const foundCustomerService = await CustomerService.findById(id).populate('user');
    if (foundCustomerService) {
      res.status(200).json({ customerService: foundCustomerService });
    } else {
      res.status(404).json({ msg: "No customer service found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error on retrieving the customer service" });
  }
};

// Post one customer service
const postCustomerService = async (req, res) => {
  try {
    const { user, email, name, message } = req.body;

    const newCustomerService = new CustomerService({
      user: user,
      email: email,
      name: name,
      message: message,
    });

    await newCustomerService.save();

    res.status(201).json(newCustomerService);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while creating customer service inquiry.");
  }
};

// Update one customer service
const putCustomerService = async (req, res) => {
  const id = req.params.id;
  const customerService = req.body;
  try {
    await CustomerService.findByIdAndUpdate(id, customerService);
    res.status(200).json({ msg: "Update success" });
  } catch (error) {
    res.status(500).json({ msg: "Error on updating customer service" });
  }
};

// Delete one customer service
const deleteCustomerService = async (req, res) => {
  const id = req.params.id;
  try {
    await CustomerService.findByIdAndDelete(id);
    res.status(200).json({ msg: "Delete done" });
  } catch (error) {
    res.status(500).json({ msg: "Error on deleting customer service" });
  }
};

module.exports = {
  getCustomerServices,
  postCustomerService,
  putCustomerService,
  deleteCustomerService,
  getOneCustomerService,
};