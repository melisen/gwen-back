const logger = require("../../../logger/winston-logger");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const authorSchema = new mongoose.Schema({
  email: { type: String, required: true, max: 100 },
  fecha: { type: String, required: true },
  mensaje: { type: String, required: true },
});

const MsgModel = mongoose.model("mensajes", authorSchema);

class MongoMensajes {
  constructor(modelo) {
    this.modelo = modelo;
  }

  async getAllMsgs() {
    const todosMensajes = await this.modelo.find({});
    return todosMensajes;
  }

  async getAllFromAuthor(emailUser) {
    const msgsFromAuthor = await this.modelo.find({ email: emailUser });
    return msgsFromAuthor;
  }

  async findByEmail(email) {
    const author = await this.modelo.find({ email: email });
    return author;
  }

  async findById(_id) {
    const mensaje = await this.modelo.find({ _id: _id });
    return mensaje;
  }

  async saveNew(data) {
    const newAuthorWithMsg = new this.modelo(data);
    const save = await newAuthorWithMsg.save();
    logger.log("info", "nuevo mensaje guardado");
  }
}

module.exports = { MsgModel, MongoMensajes };
