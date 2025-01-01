const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const optionalJWTAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);
    req.user = user || null; // Assign user if authenticated, null otherwise
    next();
  })(req, res, next);
};

//local-strategy for login
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: "User not found" });

      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword)
        return done(null, false, {
          message: "Either Incorrect Username or Password",
        });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Extract token
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayLoad, done) => {
      try {
        const user = await User.findById(jwtPayLoad.userId);
        if (!user) return done(null, false);

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = { passport, optionalJWTAuth };
