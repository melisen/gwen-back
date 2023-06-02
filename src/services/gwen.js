const logger = require("../logger/winston-logger");
const {
  getAllProducts,
  saveNewProd,
  getProduct,
  findProductAndUpdate,
  deleteProdFromDB,
} = require("./productos");

const allProductsGwen = async () => {
  const products = await getAllProducts();
  return products;
};

module.exports = {
  allProductsGwen,
};
