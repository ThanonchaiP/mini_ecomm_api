const config = require("../config/index");
const passport = require("passport");
const Customer = require("../models/customer");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const customer = await Customer.findById(jwt_payload.id);
      if (!customer) {
        return done(new Error("ไม่พบผู้ใช้งานนี้ในระบบ"), null);
      }

      return done(null,customer);

    } catch (error) {
      done(error);
    }
  })
);

module.exports.isLogin = passport.authenticate('jwt', { session: false })
