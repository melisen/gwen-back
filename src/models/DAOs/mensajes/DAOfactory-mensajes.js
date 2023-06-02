const logger = require("../../../logger/winston-logger");
const { MongoMensajes, MsgModel } = require("./MongoDAOmensajes");

class DAOFactoryMensajes {
  constructor(PERSISTENCIA) {
    if (DAOFactoryMensajes._instance) {
      logger.log(
        "error",
        "Singleton classes can't be instantiated more than once."
      );
      throw new Error(
        "Singleton classes can't be instantiated more than once."
      );
    }
    DAOFactoryMensajes._instance = this;

    this.PERSISTENCIA = PERSISTENCIA;
    switch (this.PERSISTENCIA) {
      case "MONGO":
        return new MongoMensajes(MsgModel);
      default:
        return new MongoMensajes(MsgModel);
    }
  }
}

module.exports = DAOFactoryMensajes;
