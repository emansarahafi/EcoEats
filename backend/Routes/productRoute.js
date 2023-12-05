const express = require("express");
const upload = require('../uploads/multerConfiguration');
const productRoute = express.Router();
const {
    getProducts,
    postProduct,
    putProduct,
    deleteProduct,
    getOneProduct,
} = require("../Controllers/productController");

productRoute.get("/products", getProducts);
productRoute.get("/products/:id", getOneProduct);
productRoute.post("/products/uploads", upload.single('file'), postProduct);
productRoute.put("/products/:id", putProduct);
productRoute.delete("/products/:id", deleteProduct);

module.exports = productRoute;
