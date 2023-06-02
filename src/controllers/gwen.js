const logger = require("../logger/winston-logger");
const { allProductsGwen } = require("../services/gwen");

const allProductsGwenController = async (req, res) => {
  const productos = await allProductsGwen();
  res.json(productos);
  logger.log("info", "/api/gwen - GET");
};

module.exports = {
  allProductsGwenController,
};
