const axios = require("axios");
const router = require("express").Router();
var passport = require("../services/passportStrategy");
var db = require("../models");

// router.get("/recipes", (req, res) => {
//   axios
//     .get("http://www.recipepuppy.com/api/", { params: req.query })
//     .then(({ data: { results } }) => res.json(results))
//     .catch(err => res.status(422).json(err));
// });

// router.post("/login", passport.authenticate("local"), function(req, res) {
//   console.log(res)
//   //send the user the route so it'll be redirected in the front end (can't post into a GET request from a POST)
//   res.json("");
// }),

router.post("/login", function(req, res) {
  //send the user the route so it'll be redirected in the front end (can't post into a GET request from a POST)
  res.json("");
}),
  router.post("/signup", function(req, res) {
    db.Admin.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  }),
  router.get("/allAppointments", function(req, res) {
    db.Appointment.findAll({
      include: [db.User]
    }).then(function(data) {
      res.json(data)
    });
  });

router.post("/createAppointment", function(req, res) {
  //console.log(req.body);
  db.User.findOne({
    where: { firstName: req.body.firstName, lastName: req.body.lastName }
  }).then(function(data) {
    if (data) {
      db.User.update(
        {
          street1: req.body.street1,
          street2: req.body.street2,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode
        },
        {
          where: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
          }
        }
      ).then(function() {
        //console.log(req.body);
        db.Appointment.findOne({
          where: {
            typeOfAppointment: req.body.typeOfAppointment,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            user_id: data.id
          }
        }).then(function(appData) {
          if (appData === null) {
            db.Appointment.create({
              typeOfAppointment: req.body.typeOfAppointment,
              startDate: req.body.startDate,
              endDate: req.body.endDate,
              user_id: data.id
            }).catch(function(err) {
              console.log(err);
            });
          }
          res.json("");
        });
      });
    } else {
      db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        street1: req.body.street1,
        street2: req.body.street2,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode
      }).then(function(data) {
        //console.log("create");
        //console.log(data.id)
        db.Appointment.findOne({
          where: {
            typeOfAppointment: req.body.typeOfAppointment,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            user_id: data.id
          }
        }).then(function(appData) {
          if (appData === null) {
            db.Appointment.create({
              typeOfAppointment: req.body.typeOfAppointment,
              startDate: req.body.startDate,
              endDate: req.body.endDate,
              user_id: data.id
            }).catch(function(err) {
              console.log(err);
            });
          }
          res.json("");
        });
      });
    }
  });
});

module.exports = router;
