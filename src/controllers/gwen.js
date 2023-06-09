const logger = require("../logger/winston-logger");
const { allProductsGwen, saveProdGwen } = require("../services/gwen");

const allProductsGwenController = async (req, res) => {
  const productos = await allProductsGwen();
  res.json(productos);
  logger.log("info", "/api/gwen - GET");
};

const addProductAdminController = async (req, res) => {
  const newProd = {
    category: req.body.category,
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    description: req.body.description,
    stock: req.body.stock,
  };
  const save = saveProdGwen(newProd);
  res.redirect("/api/gwen");
  logger.log("info", "/api/gwen - POST");
};

module.exports = {
  allProductsGwenController,
  addProductAdminController,
};
