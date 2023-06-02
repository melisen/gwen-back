
const  {mongoose}  = require("mongoose");
const config = require("../configuration/config");
const logger = require("../logger/winston-logger");

class conectarDB{
    constructor(){
      if (conectarDB._instance) {
        logger.log("error", "Singleton classes can't be instantiated more than once.")
      }
      conectarDB._instance = this;

      this.DBurl = config.DATABASEURL
    }
    
    conectarDBMA(){
        mongoose
        .connect(this.DBurl)
        .then(() => logger.log("info", "Connected to DB"))
        .catch((e) => {
          console.error(e);
          throw "cannot connect to DB";
        });
    }
}

module.exports = conectarDB