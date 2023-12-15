const Product = require("../models/Product");

// Get all products
const getProducts = async (request, response) => {
  try {
    const products = await Product.find().populate('restaurant');
    response.status(200).json({ products: products });
  } catch (error) {
    response.status(500).json({ msg: "Error on getting products" });
  }
};

// Get one product
const getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const foundProduct = await Product.findById(id).populate('restaurant');
    if (foundProduct) {
      res.status(200).json({ product: foundProduct });
    } else {
      res.status(404).json({ msg: "No product found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error on retrieving the product" });
  }
};

// Post one product
const postProduct = async (req, res) => {
  try {
    console.log(req.body); // Log the request body to check its structure
    const { name, description, rating, price, qte, image, restaurantId } = req.body;

    const newProduct = new Product({
      name: name,
      description: description,
      rating: rating,
      price: price,
      qte: qte,
      image: image,
      restaurant: restaurantId,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error while creating product.");
  }
};

// Update one product
const putProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  try {
    await Product.findByIdAndUpdate(id, product);
    res.status(200).json({ msg: "Update success" });
  } catch (error) {
    res.status(500).json({ msg: "Error on updating product" });
  }
};

// Delete one product
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "Delete done" });
  } catch (error) {
    res.status(500).json({ msg: "Error on deleting product" });
  }
};

module.exports = { getProducts, postProduct, putProduct, deleteProduct, getOneProduct };
