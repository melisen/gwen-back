const express = require("express");
const { Router } = express;
const configRouter = Router();
const getConfigController = require("../controllers/config");

configRouter.get("/", getConfigController);

module.exports = configRouter;
