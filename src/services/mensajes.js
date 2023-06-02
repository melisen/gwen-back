const logger = require("../logger/winston-logger");
const config = require("../configuration/config");
const PERSISTENCIA = config.PERSISTENCIA;
const DAOFactoryMensajes = require("../models/DAOs/mensajes/DAOfactory-mensajes");
const DAOMensajes = new DAOFactoryMensajes(PERSISTENCIA);

const verUnMsg = async (_id) => {
  const mensaje = await DAOMensajes.findById(_id);
  return mensaje;
};

const verMsgUser = async (emailUser) => {
  const listaMensajes = await DAOMensajes.getAllFromAuthor(emailUser);
  return listaMensajes;
};

const guardarMsg = async (data) => {
  const guardado = await DAOMensajes.saveNew(data);
};

const verMsgGeneral = async () => {
  const msgGeneral = await DAOMensajes.getAllMsgs();
  return msgGeneral;
};

module.exports = { verMsgUser, guardarMsg, verMsgGeneral, verUnMsg };
