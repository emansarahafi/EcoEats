const Restaurant = require("../models/Restaurant");
const Product = require("../models/Product");

// Get all restaurants
const getRestaurants = async (request, response) => {
  try {
    const restaurants = await Restaurant.find();
    response.status(200).json({ restaurants: restaurants });
  } catch (error) {
    response.status(500).json({ msg: "Error on getting restaurants" });
  }
};

// Get one restaurant
const getOneRestaurant = async (req, res) => {
  const id = req.params.id;
  try {
    const foundRestaurant = await Restaurant.findById(id).populate('products');
    if (foundRestaurant) {
      res.status(200).json({ restaurant: foundRestaurant });
    } else {
      res.status(404).json({ msg: "No restaurant found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error on retrieving the restaurant" });
  }
};

// Get products of a specific restaurant
const getRestaurantProducts = async (req, res) => {
  const id = req.params.id;
  try {
    const products = await Product.find({ restaurant: id });
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ msg: "Error on getting restaurant products" });
  }
};

// Post one restaurant
const postRestaurant = async (req, res) => {
  try {
    const { name, description, rating, logo, foundingDate, address, products } = req.body;

    const newRestaurant = new Restaurant({
      name: name,
      description: description,
      rating: rating,
      logo: logo,
      foundingDate: foundingDate,
      address: address,
      products: products,
    });

    await newRestaurant.save();

    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while creating restaurant.");
  }
};

// Update one restaurant
const putRestaurant = async (req, res) => {
  const id = req.params.id;
  const restaurant = req.body;
  try {
    await Restaurant.findByIdAndUpdate(id, restaurant);
    res.status(200).json({ msg: "Update success" });
  } catch (error) {
    res.status(500).json({ msg: "Error on updating restaurant" });
  }
};

// Delete one restaurant
const deleteRestaurant = async (req, res) => {
  const id = req.params.id;
  try {
    await Restaurant.findByIdAndDelete(id);
    res.status(200).json({ msg: "Delete done" });
  } catch (error) {
    res.status(500).json({ msg: "Error on deleting restaurant" });
  }
};

module.exports = {
  getRestaurants,
  getOneRestaurant,
  getRestaurantProducts,
  postRestaurant,
  putRestaurant,
  deleteRestaurant,
};
