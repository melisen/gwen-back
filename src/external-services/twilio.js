const logger = require("../logger/winston-logger");
const twilio = require("twilio");
const config = require("../configuration/config");
const accountSid = config.ACCOUNTSIDTWILIO;
const authToken = config.AUTHTOKENTWILIO;
const client = twilio(accountSid, authToken);

const whatsappADMIN = config.ADMINWHATSAPP;
const numeroSandbox = config.NUMSANDBOX;

const SendOrderWhatsappToAdmin = async (user) => {
  const whatsappBody = `Nuevo pedido de ${user.nombre} ( ${user.username} )`;
  try {
    const message = await client.messages.create({
      body: whatsappBody,
      from: numeroSandbox,
      to: whatsappADMIN,
    });
    logger.log("info", message);
  } catch (error) {
    logger.log("error", error);
  }
};

const sendOrderSMSToUser = async (user, idCompra) => {
  const telUSER = user.telefono;
  try {
    const message = await client.messages.create({
      body: `Su pedido ${idCompra} ha sido recibido y se encuentra en proceso`,
      from: "+12707137190",
      to: telUSER,
    });
    logger.log("info", message);
  } catch (error) {
    logger.log("error", error);
  }
};

module.exports = { SendOrderWhatsappToAdmin, sendOrderSMSToUser };
