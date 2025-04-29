const ProductModel = require("../models/Product");
const CartModel = require("../models/Cart");

exports.addProductToCart = (req, res) => {
  try {
    const { name } = req.body;
    CartModel.add(name);
    res.redirect(302, "/products/new");
  } catch (err) {
    res.status(404).send("Product not found");
  }
};

exports.getProductsCount = (_req, res) => {
  res.status(200).json({ count: CartModel.getProductsQuantity() });
};