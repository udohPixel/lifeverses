// import required libraries
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const key = require("../settings/settings.config");

// authenticate the user by jwt strategy
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.APP_PRIVATE_KEY;

// create payload
const payload = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          console.log("Error occurred in Jwt Strategy:- payload: " + err);
        });
    })
  );
};

// export jwt strategy
module.exports = payload;
