const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username and password
passport.use(
  new LocalStrategy(
    // // Our user will sign in using an email, rather than a "username"
    // {
    //   usernameField: "username"
    // },
    function(username, password, done) {
      // When a user tries to sign in this code runs
      db.Admin.findOne({
        where: {
          username: username
        }
      }).then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect username."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;

//previous auth strategy

// Hooks the JWT Strategy.
// function hookJWTStrategy(passport) {
//   const options = {};

//   options.secretOrKey = config.keys.secret;
//   options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//   options.ignoreExpiration = false;

//   passport.use(
//     new JWTStrategy(options, function(JWTPayload, callback) {
//       models.Admin.findOne({ where: { username: JWTPayload.username } }).then(
//         function(user) {
//           if (!user) {
//             callback(null, false);
//             return;
//           }
//           callback(null, user);
//         }
//       );
//     })
//   );
//   passport.serializeUser(function(user, cb) {
//     cb(null, user);
//   });
//   passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
//   });
// }

// module.exports = hookJWTStrategy;
