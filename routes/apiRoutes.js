const router = require("express").Router();
var db = require("../models");

router.post("/login", function(req, res) {
  console.log(req.body)
  //send the user the route so it'll be redirected in the front end (can't post into a GET request from a POST)
  res.json("/calendar");
}),

router.post("/signup", function(req, res) {
  console.log(req.body.username)
  console.log(req.body.password)
  db.Admin.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(function() {
      //res.redirect(307, "/");
      res.send("Success")
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.get("/allAppointments", function(req, res) {
  console.log("hello")
  db.Appointment.findAll({
    include: [db.User]
  }).then(function(data) {
    if (data) {
      res.send(data);
    } else {
      res.send("error");
    }
  });
});

router.post("/createAppointment", function(req, res) {
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
        if (req.body.id !== undefined) {
          db.Appointment.update(
            {
              typeOfAppointment: req.body.typeOfAppointment,
              startDate: req.body.startDate,
              endDate: req.body.endDate,
              user_id: data.id
            },
            {
              where: {
                id: req.body.id
              }
            }
          );
        } else {
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
        if (req.body.id !== undefined) {
          db.Appointment.update(
            {
              typeOfAppointment: req.body.typeOfAppointment,
              startDate: req.body.startDate,
              endDate: req.body.endDate,
              user_id: data.id
            },
            {
              where: {
                id: req.body.id
              }
            }
          );
        } else {
          db.Appointment.create({
            typeOfAppointment: req.body.typeOfAppointment,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            user_id: data.id
          }).catch(function(err) {
            res.json(err);
          });
        }
      });
      res.send("");
    }
  });
});

router.delete("/deleteAppointment/:id", function(req, res) {
  db.Appointment.destroy({
    where: { id: req.params.id }
  }).then(function(data, error) {
    if (data) {
      res.json(data);
    } else {
      res.json(error);
    }
  });
});

router.post("/getUserByFirstAndLastName", function(req, res) {
  db.User.findOne({
    where: { firstName: req.body.firstName, lastName: req.body.lastName }
  }).then(function(data) {
    if (data) {
      res.send(data);
    } else {
      res.send("error");
    }
  });
});

module.exports = router;
