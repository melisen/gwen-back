const express = require("express");
const { Router } = express;
const adminRouter = Router();
const {
  allProductsAdminController,
  addProductAdminController,
  prodToUpdateAdminController,
  UpdateProductAdminController,
  deleteProdAdminController,
} = require("../controllers/admin");

const middlewareAdmin = require("../middlewares/isAdmin");

adminRouter.use(middlewareAdmin);

adminRouter.get("/", allProductsAdminController);

adminRouter.post("/", addProductAdminController);

adminRouter.post("/select-prod-update", prodToUpdateAdminController);

adminRouter.put("/update", UpdateProductAdminController);

adminRouter.delete("/delete", deleteProdAdminController);

module.exports = adminRouter;
