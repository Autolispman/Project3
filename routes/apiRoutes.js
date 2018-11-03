const router = require("express").Router();
var db = require("../models");

router.post("/login", function(req, res) {
  //send the user the route so it'll be redirected in the front end (can't post into a GET request from a POST)
  res.json("/calendar");
}),
  router.post("/signup", function(req, res) {
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
  db.Appointment.findAll({
    include: [db.User]
  }).then(function(data, error) {
    if (data) {
      res.send(data);
    } else {
      res.send(error);
    }
  });
});

router.get("/allUsers", function(req, res) {
  db.User.findAll({
    order: ["lastName"]
  }).then(function(data, error) {
    if (data) {
      res.send(data);
    } else {
      res.send(error);
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
      data.update({
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

router.post("/updatePet", function(req, res) {
  console.log("updatPet")
  console.log(req.body.id)
  console.log(req.body.userId)
  db.Pet.findOne({
    where: { id: req.body.id, UserId: req.body.userId }
  }).then(data => {
    if (data) {
      data.update({
          petName: req.body.petName,
          breed: req.body.breed,
          age: req.body.age,
          feedingInstructions: req.body.feedingInstructions,
          medications: req.body.medications,
          healthIssues: req.body.healthIssues,
          foodAllergies: req.body.foodAllergies,
          notes: req.body.notes,          
          UserId: req.body.userId,
          //user_id: req.body.userId,
        })
        .then(result => {
          res.json(result);
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      console.log("db.Pet.create")
      console.log(req.body)
      db.Pet.create({
        petName: req.body.petName,
        breed: req.body.breed,
        age: req.body.age,
        feedingInstructions: req.body.feedingInstructions,
        medications: req.body.medications,
        healthIssues: req.body.healthIssues,
        foodAllergies: req.body.foodAllergies,
        notes: req.body.notes,        
        UserId: req.body.userId,
        //user_id: req.body.userId,
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
  db.Appointment.findOne({
    where: { id: req.body.id }
  }).then(data => {
    if (data) {
      data.update({
        typeOfAppointment: req.body.typeOfAppointment,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        UserId: req.body.user_id,
        user_id: req.body.user_id,
        appointmentNotes: req.body.appointmentNotes
      });
      res.json(data);
    } else {
      db.Appointment.create({
        typeOfAppointment: req.body.typeOfAppointment,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        UserId: req.body.user_id,
        user_id: req.body.user_id,
        appointmentNotes: req.body.appointmentNotes
      });
      res.json("");
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

router.delete("/deleteUser/:id", function(req, res) {
  db.User.destroy({
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
  }).then(function(data, error) {
    if (data) {
      res.send(data);
    } else {
      res.send(error);
    }
  });
});

router.post("/getPetByNameAndUserId", function(req, res) {
  db.Pet.findOne({
    where: { petName: req.body.petName, UserId: req.body.userId},
    include: [db.User]
  }).then(function(data, error) {
    if (data) {
      res.send(data);
    } else {
      res.send(error);
    }
  });
});

router.post("/getPetsByUserId", function(req, res) {
  db.Pet.findAll({
    where: { UserId: req.body.userId},
  }).then(function(data, error) {
    if (data) {
      res.send(data);
    } else {
      res.send(error);
    }
  });
});

module.exports = router;
