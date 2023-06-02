const logger = require("../logger/winston-logger");
const {
  allProductsAdmin,
  saveProd,
  getProductAdmin,
  updateProdAdmin,
  deleteProdAdmin,
} = require("../services/admin");

const allProductsAdminController = async (req, res) => {
  const { username, password, nombre } = req.user;
  const user = { username, password, nombre };
  const productos = await allProductsAdmin();
  res.render("adminstracion-productos", { user, productos });
  logger.log("info", "/api/admin - GET");
};

const addProductAdminController = async (req, res) => {
  const newProd = {
    category: req.body.category,
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
  };
  const save = saveProd(newProd);
  res.redirect("/api/admin");

  logger.log("info", "/api/admin - POST");
};

const prodToUpdateAdminController = async (req, res) => {
  const { idprod } = req.body;
  const producto = await getProductAdmin(idprod);
  res.render("update-prod", { producto });

  logger.log("info", "/api/admin/update - POST");
};

const UpdateProductAdminController = async (req, res) => {
  const obj = {
    idprod: req.body.idprod,
    newTitle: req.body.title,
    newPrice: req.body.price,
    newThumbnail: req.body.thumbnail,
    newCategory: req.body.category,
  };
  const updatedProd = await updateProdAdmin(obj);
  res.redirect(303, "/api/admin");
  logger.log("info", "/api/admin/update-prod PUT");
};

const deleteProdAdminController = async (req, res) => {
  const { idprod } = req.body;
  const productoEliminado = await deleteProdAdmin(idprod);
  logger.log("info", productoEliminado);
  logger.log("info", "/api/admin/delete - DELETE");
  res.redirect("/api/admin");
};

module.exports = {
  allProductsAdminController,
  addProductAdminController,
  prodToUpdateAdminController,
  UpdateProductAdminController,
  deleteProdAdminController,
};
