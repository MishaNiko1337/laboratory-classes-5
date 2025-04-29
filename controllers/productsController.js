const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { MENU_LINKS } = require("../constants/navigation");

exports.getProductsView = (req, res) => {
  const products = Product.getAll();
  const cartCount = Cart.getProductsQuantity();

  res.render("products.ejs", {
    headTitle: "Shop - Products",
    path: "/",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products",
    products,
    cartCount
  });
};

exports.getAddProductView = (req, res) => {
  const cartCount = Cart.getProductsQuantity();

  res.render("add-product.ejs", {
    headTitle: "Shop - Add product",
    path: "/add",
    menuLinks: MENU_LINKS,
    activeLinkPath: "/products/add",
    cartCount
  });
};

exports.addNewProduct = (req, res) => {
  const { name, description, price } = req.body;
  const product = new Product(name, description, price);
  Product.add(product);
  res.redirect("/products");
};

exports.getNewProductView = (req, res) => {
  const newestProduct = Product.getLast();
  const cartCount = Cart.getProductsQuantity();

  res.render("new-product.ejs", {
    headTitle: "Shop - New product",
    path: "/new",
    activeLinkPath: "/products/new",
    menuLinks: MENU_LINKS,
    newestProduct,
    cartCount
  });
};

exports.getProductView = (req, res) => {
  const name = req.params.name;
  const product = Product.findByName(name);
  const cartCount = Cart.getProductsQuantity();

  res.render("product.ejs", {
    headTitle: "Shop - Product",
    path: `/products/${name}`,
    activeLinkPath: `/products/${name}`,
    menuLinks: MENU_LINKS,
    product,
    cartCount
  });
};

exports.deleteProduct = (req, res) => {
  const name = req.params.name;
  Product.deleteByName(name);
  res.status(200).json({ success: true });
};
