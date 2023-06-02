const express = require("express");
const { Router } = express;
const gwenRouter = Router();
const { allProductsGwenController } = require("../controllers/gwen");
const allowCrossDomain = require("../middlewares/cross-domain.js");

/*
gwenRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
*/

gwenRouter.use(allowCrossDomain);

gwenRouter.get("/", allProductsGwenController);

module.exports = gwenRouter;
