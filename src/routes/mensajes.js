const express = require("express");
const { Router } = express;
const mensajesRouter = Router();
const {
  getMsgController,
  getGeneralMsgController,
} = require("../controllers/mensajes");

mensajesRouter.get("/:email", getMsgController);

mensajesRouter.get("/", getGeneralMsgController);

module.exports = mensajesRouter;
