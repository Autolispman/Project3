const router = require("express").Router();
var db = require("../models");

router.post("/login", function(req, res) {
  console.log(req.body);
  //send the user the route so it'll be redirected in the front end (can't post into a GET request from a POST)
  res.json("/calendar");
}),
  router.post("/signup", function(req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
    db.Admin.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function() {
        //res.redirect(307, "/");
        res.send("Success");
      })
      .catch(function(err) {
        res.json(err);
      });
  });

router.get("/allAppointments", function(req, res) {
  //console.log("hello");
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

router.get("/allUsers", function(req, res) {
  //console.log("hello");
  db.User.findAll({
    order: ["lastName"]
  }).then(function(data) {
    if (data) {
      res.send(data);
    } else {
      res.send("error");
    }
  });
});

// router.post("/createUser", function(req, res) {
//   db.User.findOrCreate({
//     where: { firstName: req.body.firstName, lastName: req.body.lastName },
//     defaults: {
//       street1: req.body.street1,
//       street2: req.body.street2,
//       city: req.body.city,
//       state: req.body.state,
//       zipCode: req.body.zipCode
//     }
//   }).then(function(data, error) {
//     if (data) {
//       res.json(data);
//     } else {
//       res.json(error);
//     }
//   });
// });

router.post("/updateUser", function(req, res) {
  db.User.findOne({
    where: { firstName: req.body.firstName, lastName: req.body.lastName }
  }).then(data => {
    if (data) {
      data
        .update({
          street1: req.body.street1,
          street2: req.body.street2,
          city: req.body.city,
          state: req.body.state,
          zipCode: req.body.zipCode,
          cellPhone: req.body.cellPhone,
          email: req.body.email,
          vetClinicName: req.body.vetClinicName,
          vetName: req.body.vetName,
          vetPhone: req.body.vetPhone,
          keyInstructions: req.body.keyInstructions,
          gateCode: req.body.gateCode,
          doorCode: req.body.doorCode,
          alarmCode: req.body.alarmCode,
          wifiPassword: req.body.wifiPassword,
          notes: req.body.notes
        })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        street1: req.body.street1,
        street2: req.body.street2,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        cellPhone: req.body.cellPhone,
        email: req.body.email,
        vetClinicName: req.body.vetClinicName,
        vetName: req.body.vetName,
        vetPhone: req.body.vetPhone,
        keyInstructions: req.body.keyInstructions,
        gateCode: req.body.gateCode,
        doorCode: req.body.doorCode,
        alarmCode: req.body.alarmCode,
        wifiPassword: req.body.wifiPassword,
        notes: req.body.notes
      })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.json(err);
        });
    }
  });
});

router.post("/updateAppointment", function(req, res) {
  console.log(req.body.id);
  db.Appointment.findOne({
    where: { id: req.body.id }
  }).then(data => {
    console.log(data);
    if (data) {
      console.log("update");
      data.update({
        typeOfAppointment: req.body.typeOfAppointment,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        UserId: req.body.user_id,
        user_id: req.body.user_id
      });
      res.json(data);
    } else {
      console.log("create");
      db.Appointment.create({
        typeOfAppointment: req.body.typeOfAppointment,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        UserId: req.body.user_id,
        user_id: req.body.user_id
      });
      res.json("");
    }
  });
});

// router.post("/createAppointment", function(req, res) {
//   db.Appointment.findOrCreate({
//     where: {
//       id: req.body.id
//     },
//     defaults: {
//       typeOfAppointment: req.body.typeOfAppointment,
//       startDate: req.body.startDate,
//       endDate: req.body.endDate,
//       user_id: req.body.id
//     }
//   }).then(function(data, error) {
//     if (data) {
//       res.json(data);
//     } else {
//       res.json(error);
//     }
//   });
// });

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
