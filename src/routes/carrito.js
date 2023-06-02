const express = require("express");
const { Router } = express;
const carritoRouter = Router();

const {
  createCartController,
  deleteCartController,
  getProductsController,
  addProductToCartController,
  deleteProdFromCartController,
  confirmOrderController,
} = require("../controllers/carrito");

carritoRouter.post("/", createCartController);

carritoRouter.post("/:id/productos", addProductToCartController);

carritoRouter.get("/:id/productos", getProductsController);

carritoRouter.delete("/delcart", deleteCartController);

carritoRouter.delete("/productos", deleteProdFromCartController);

carritoRouter.post("/confirmar-pedido", confirmOrderController);

module.exports = carritoRouter;
