const logger = require("../logger/winston-logger");

const getMsgController = async (req, res) => {
  const email = req.params;
  const username = email.email;
  res.render("chat-user", { username });
};

const getGeneralMsgController = async (req, res) => {
  const username = req.user.username;
  res.render("chat-general", { username });
};

module.exports = { getMsgController, getGeneralMsgController };
