const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { Usuarios } = require("../models/DAOs/usuarios/MongoDAOusuarios");
const logger = require("../logger/winston-logger");

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    logger.log("error", "error en auth");
    res.redirect("/login");
  }
}

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const iniciarPassport = () => {
  passport.use(
    "login",
    new LocalStrategy((username, password, done) => {
      Usuarios.findOne({ username }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          logger.log("info", "User Not Found with username");
          return done(null, false);
        }

        if (!isValidPassword(user, password)) {
          logger.log("info", "Invalid Password");
          return done(null, false);
        }

        return done(null, user);
      });
    })
  );

  passport.use(
    "signup",
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      (req, username, password, done) => {
        Usuarios.findOne({ username: username }, function (err, user) {
          if (err) {
            logger.log("error", "Error in SignUp ");
            return done(err);
          }

          if (user) {
            logger.log("error", "User already exists");
            return done(null, false);
          }

          const newUser = {
            username: username,
            password: createHash(password),
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            edad: req.body.edad,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            avatar: req.body.avatar,
            carritoactual: "empty",
          };
          Usuarios.create(newUser, (err, userWithId) => {
            if (err) {
              logger.log("error", "Error in Saving user in Usuarios ");
              return done(err);
            }

            logger.log("info", user);
            logger.log("info", "User Registration succesful");
            return done(null, userWithId);
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    Usuarios.findById(id, done);
  });
};

module.exports = { iniciarPassport, auth };
