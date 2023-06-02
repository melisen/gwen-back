const logger = require("../../../logger/winston-logger");
const { MongoOrders, Orders } = require("./MongoDAOshopOrders");

class DAOFactoryShopOrders {
  constructor(PERSISTENCIA) {
    if (DAOFactoryShopOrders._instance) {
      logger.log(
        "error",
        "Singleton classes can't be instantiated more than once."
      );
      throw new Error(
        "Singleton classes can't be instantiated more than once."
      );
    }
    DAOFactoryShopOrders._instance = this;

    this.PERSISTENCIA = PERSISTENCIA;
    switch (this.PERSISTENCIA) {
      case "MONGO":
        return new MongoOrders(Orders);
      default:
        return new MongoOrders(Orders);
    }
  }
}

module.exports = DAOFactoryShopOrders;
