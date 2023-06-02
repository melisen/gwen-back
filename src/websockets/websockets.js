const logger = require("../logger/winston-logger");
const {
  guardarMsg,
  verMsgGeneral,
  verMsgUser,
} = require("../services/mensajes");

const websocketsConnection = async (io) => {
  io.on("connection", async (socket) => {
    logger.log("info", "io socket conectado");
    const msgGeneral = await verMsgGeneral();
    socket.emit("mensajesgeneral", msgGeneral);
    socket.on("new_msg", async (data) => {
      try {
        const guardado = await guardarMsg(data);
        const msgGeneral = await verMsgGeneral();
        io.sockets.emit("mensajesgeneral", msgGeneral);
      } catch {
        logger.log(
          "error",
          "error al escuchar mensajes general socket.on( new_msg"
        );
      }
    });
    socket.on("ver-mensajes-user", async (username) => {
      try {
        const emailUser = username.username;
        const msgUser = await verMsgUser(emailUser);
        socket.emit("mensajesUser", msgUser);
      } catch {
        logger.log("error", "error en ver-mensajes-user");
      }
    });
  });
};

module.exports = websocketsConnection;
