const express = require("express");
const { Router } = express;
const gwenRouter = Router();
const {
  allProductsGwenController,
  addProductAdminController,
} = require("../controllers/gwen");
const allowCrossDomain = require("../middlewares/cross-domain.js");

gwenRouter.use(allowCrossDomain);

gwenRouter.get("/", allProductsGwenController);

gwenRouter.post("/", addProductAdminController);

module.exports = gwenRouter;
