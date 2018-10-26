import axios from "axios";

// function signUpAdmin(loginCredentials) {
//   console.log(loginCredentials);
//   axios
//     .post("/api/signup", {
//       username: loginCredentials.username,
//       password: loginCredentials.password
//     })
//     .then(function(data) {
//       window.location = "/";
//       // If there's an error, log the error
//     })
//     .catch(function(err) {
//       console.log(err);
//     });
// }

function loginUser(loginCredentials) {
  console.log(loginCredentials);
  axios
    .post("/api/login", {
      loginCredentials
    })
    .then(function(data) {
      window.location = "/calendar";
      // If there's an error, log the error
    })
    .catch(function(err) {
      console.log(err);
    });
}

// function createUser(userData) {
//   let p = new Promise(function(data, error) {
//   axios
//     .post("/api/createUser", {
//       id: userData.id,
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       street1: userData.street1,
//       street2: userData.street2,
//       city: userData.city,
//       state: userData.state,
//       zipCode: userData
//     })
//     .then(function(result, err) {
//       if (result) {
//         data(result);
//       } else {
//         error(err);
//       }
//     });
//   })
//   return p;
// }

function updateUser(userData) {
  let p = new Promise(function(data, error) {
  axios
    .post("/api/updateUser", {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      street1: userData.street1,
      street2: userData.street2,
      city: userData.city,
      state: userData.state,
      zipCode: userData.zipCode,
      cellPhone: userData.cellPhone,
      email: userData.email,
      vetClinicName: userData.vetClinicName,
      vetName: userData.vetName,
      vetPhone: userData.vetPhone,
      keyInstructions: userData.keyInstructions,
      gateCode: userData.gateCode,
      doorCode: userData.doorCode,
      alarmCode: userData.alarmCode,
      wifiPassword: userData.wifiPassword,
      notes: userData.notes
    })
    .then(function(result, err) {
      if (result) {
        data(result);
      } else {
        error(err);
      }
    });
  })
  return p;
}

function updateAppointment(userAppointment) {
  let p = new Promise(function(data, error) {
  axios
    .post("/api/updateAppointment", {
      id: userAppointment.id,
      startDate: userAppointment.startDate,
        endDate: userAppointment.endDate,
        typeOfAppointment: userAppointment.typeOfAppointment,
        user_id: userAppointment.user_id
    })
    .then(function(result, err) {
      if (result) {
        data(result);
      } else {
        error(err);
      }
    });
  })
  return p;
}

// function createAppointment(appointmentData) {
//   let p = new Promise(function(data, error) {
//     axios
//       .post("/api/createAppointment", {
//         id: appointmentData.id,
//         startDate: appointmentData.startDate,
//         endDate: appointmentData.endDate,
//         typeOfAppointment: appointmentData.typeOfAppointment
//       })
//       .then(function(data, error) {
//         window.location = "/calendar";
//       });
//   });
//   return p;
// }

function getAllAppointments() {
  let p = new Promise(function(data, error) {
    axios.get("/api/allAppointments").then(function(result, err) {
      if (result) {
        data(result);
      } else {
        error(err);
      }
    });
  });
  return p;
}

function getAllUsers() {
  let p = new Promise(function(data, error) {
    axios.get("/api/allUsers").then(function(result, err) {
      if (result) {
        data(result);
      } else {
        error(err);
      }
    });
  });
  return p;
}

function deleteAppointment(appointId) {
  let p = new Promise(function(data, error) {
    axios
      .delete("/api/deleteAppointment/" + appointId)
      .then(function(result, err) {
        if (result) {
          data(result);
        } else {
          error("");
        }
      });
  });
  return p;
}

function getUserByFirstAndLastName(firstAndLastName) {
  //console.log(firstAndLastName)
  let p = new Promise(function(data, error) {
    axios
      .post("/api/getUserByFirstAndLastName", firstAndLastName)
      .then(function(result, err) {
        if (result) {
          data(result);
        } else {
          error("");
        }
      });
  });
  return p;
}

export default {
  loginUser: loginUser,
  getAllAppointments: getAllAppointments,
  deleteAppointment: deleteAppointment,
  getUserByFirstAndLastName: getUserByFirstAndLastName,
  updateUser: updateUser,
  updateAppointment: updateAppointment,
  getAllUsers: getAllUsers
};
