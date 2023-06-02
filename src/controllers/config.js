const config = require("../configuration/config");

const MODE = config.MODE;
const DATABASEURL = config.DATABASEURL;
const PORT = config.PORT;
const HOST = config.HOST;
const PERSISTENCIA = config.PERSISTENCIA;
const PERSISTENCIAUSUARIOS = config.PERSISTENCIAUSUARIOS;
const ADMINMAIL = config.ADMINMAIL;
const ADMINWHATSAPP = config.ADMINWHATSAPP;
const NUMSANDBOX = config.NUMSANDBOX;
const TIEMPOEXPIR = config.TIEMPOEXPIR;

function getConfigController(req, res) {
  logger.log("info", "/config  -  GET");
  res.render("config", {
    MODE,
    DATABASEURL,
    PORT,
    HOST,
    PERSISTENCIA,
    PERSISTENCIAUSUARIOS,
    ADMINMAIL,
    ADMINWHATSAPP,
    NUMSANDBOX,
    TIEMPOEXPIR,
  });
}

module.exports = getConfigController;
