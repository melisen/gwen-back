const express = require("express");
const logger = require("../logger/winston-logger");
const { allProductsGwen, saveProdGwen } = require("../services/gwen");

const allProductsGwenController = async (req, res) => {
  const productos = await allProductsGwen();
  res.json(productos);
  logger.log("info", "/api/gwen - GET");
};

const addProductAdminController = async (req, res) => {
  const data = req.body;
  const newProd = {
    category: data.category,
    title: data.title,
    price: data.price,
    thumbnail: data.thumbnail,
    description: data.description,
    stock: data.stock,
  };
  const save = await saveProdGwen(newProd);
  res.send({ respuesta: "producto guardado" });
  logger.log("info", "/api/gwen - POST");
};

module.exports = {
  allProductsGwenController,
  addProductAdminController,
};
