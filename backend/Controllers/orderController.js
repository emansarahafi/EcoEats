const Order = require("../models/Order");

// Get all orders
const getOrders = async (request, response) => {
  try {
    const userId = request.user.id;
    const orders = await Order.find({ userId }).populate('products');
    response.status(200).json({ orders: orders });
  } catch (error) {
    response.status(500).json({ msg: "Error on getting orders" });
  }
};

// Get one order
const getOneOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const foundOrder = await Order.findById(id).populate('products').populate('user');
    if (foundOrder) {
      res.status(200).json({ order: foundOrder });
    } else {
      res.status(404).json({ msg: "No order found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error on retrieving the order" });
  }
};

// Post one order
const postOrder = async (req, res) => {
  try {
    const user = req.user;
    const { products, totalPrice } = req.body;
    const newOrder = new Order({
      userId: user.id,
      products: products,
      totalPrice: totalPrice,
    });

    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error while creating order.");
  }
};

// Update one order
const putOrder = async (req, res) => {
  const id = req.params.id;
  const order = req.body;
  try {
    await Order.findByIdAndUpdate(id, order);
    res.status(200).json({ msg: "Update success" });
  } catch (error) {
    res.status(500).json({ msg: "Error on updating order" });
  }
};

// Delete one order
const deleteOrder = async (req, res) => {
  const id = req.params.id;
  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json({ msg: "Delete done" });
  } catch (error) {
    res.status(500).json({ msg: "Error on deleting order" });
  }
};

module.exports = { getOrders, postOrder, putOrder, deleteOrder, getOneOrder };
