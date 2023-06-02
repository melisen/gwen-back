const config = require("../configuration/config");
const adminUser = config.ADMINMAIL;
const logger = require("../logger/winston-logger");

const middlewareAdmin = (req, res, next) => {
  const { username } = req.user;
  if (username === adminUser) {
    next();
  } else {
    logger.log("error", "ruta y método no autorizados");
    res.render("fail-auth");
  }
};

module.exports = middlewareAdmin;
