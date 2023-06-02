const express = require("express");
const { Server: HTTPServer } = require("http");
const { Server: IOServer } = require("socket.io");
const handlebars = require("express-handlebars");
const logger = require("./src/logger/winston-logger");
const config = require("./src/configuration/config");
const passport = require("passport");
const { configSession } = require("./src/middlewares/session-mongo");
const conectarDB = require("./src/models/conectarDB");
const { iniciarPassport } = require("./src/middlewares/passport");
const rootRouter = require("./src/routes/root");
const usuariosRouter = require("./src/routes/usuarios");
const carritoRouter = require("./src/routes/carrito.js");
const productosRouter = require("./src/routes/productos.js");
const adminRouter = require("./src/routes/admin.js");
const MensajesRouter = require("./src/routes/mensajes.js");
const configRouter = require("./src/routes/config.js");
const gwenRouter = require("./src/routes/gwen.js");
const websocketsConnection = require("./src/websockets/websockets");
const methodOverride = require("method-override");

const app = express();

const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);
websocketsConnection(io);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static((__dirname, "views")));
app.use(methodOverride("_method"));

app.set("views", "./views/");
const hbs = handlebars.engine({
  defaultLayout: "index.hbs",
  extname: "hbs",
  layoutsDir: "./views/layouts/",
  partialsDir: "./views/partials",
});
app.engine("hbs", hbs);
app.set("view engine", "hbs");

app.use(configSession);

const connectToDB = new conectarDB();
connectToDB.conectarDBMA();

iniciarPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", rootRouter);
app.use("/api/usuarios", usuariosRouter);
app.use("/api/carrito", carritoRouter);
app.use("/api/productos", productosRouter);
app.use("/api/admin", adminRouter);
app.use("/chat", MensajesRouter);
app.use("/config", configRouter);
app.use("/api/gwen", gwenRouter);

httpServer.listen(config.PORT, config.HOST, () => {
  logger.log("info", `server listening on port ${config.PORT}`);
});
