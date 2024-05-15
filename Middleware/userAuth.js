const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
var usermodel = require("../schema/UserSchema");

passport.use(
  "usersignup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { name, ph, role, address } = req.body;
      try {
        const user = await usermodel.create({
          email,
          password,
          name,
          ph,
          role,
          address
        });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "userlogin",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await usermodel.findOne({ email});

        if (!user) {
          return done(null, false, {
            message: "User not found",
          });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.admin , token.vendor,token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport.authenticate("jwt", { session: false });
