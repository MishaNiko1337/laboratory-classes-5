const { MENU_LINKS } = require("../constants/navigation");
const Cart = require("../models/Cart");

exports.getHomeView = (req, res) => {
  const cartCount = Cart.getProductsQuantity();

  res.render("home.ejs", {
    headTitle: "Shop - Home",
    path: "/",
    activeLinkPath: "/",
    menuLinks: MENU_LINKS,
    cartCount
  });
};
