const MongoStore = require("connect-mongo");
const session = require("express-session");
const config = require("../configuration/config");

const configSession = session({
  store: MongoStore.create({
    mongoUrl: config.DATABASEURL,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    socket: {
      port: config.PORT,
      host: config.HOST,
    },
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: config.TIEMPOEXPIR,
    },
  }),
  secret: "secreto",
  resave: false,
  saveUninitialized: false,
});

module.exports = { configSession };
