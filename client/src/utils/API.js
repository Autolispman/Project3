import axios from "axios";

function signUpAdmin(loginCredentials) {
  console.log(loginCredentials)
  axios
    .post("/api/signup", {
      username: loginCredentials.username,
      password: loginCredentials.password
    })
    .then(function(data) {
      window.location = "/";
      // If there's an error, log the error
    })
    .catch(function(err) {
      console.log(err);
    });
}

function loginUser(loginCredentials) {
  console.log(loginCredentials)
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

function createAppointment(appointmentData) {
  axios.post("/api/createAppointment", {
    id: appointmentData.id,
    firstName: appointmentData.firstName,
    lastName: appointmentData.lastName,
    street1: appointmentData.street1,
    street2: appointmentData.street2,
    city: appointmentData.city,
    state: appointmentData.state,
    zipCode: appointmentData.zipCode,
    startDate: appointmentData.startDate,
    endDate: appointmentData.endDate,
    typeOfAppointment: appointmentData.typeOfAppointment
    })
    .then(function(data, error) {
      window.location = "/calendar";
    })
}

function getAllAppointments() {
  let p = new Promise(function(data, error) {
    axios.get("/api/allAppointments").then(function(result, err) {
      if (result) {
        data(result);
      } else {
        error("");
      }
    })
  })
  return p
}

function deleteAppointment(appointId) {
  let p = new Promise(function(data, error) {
    axios.delete("/api/deleteAppointment/" + appointId).then(function(result, err) {
      if (result) {
        data(result);
      } else {
        error("");
      }
    })
  })
  return p
}

function getUserByFirstAndLastName(firstAndLastName) {
  //console.log(firstAndLastName)
  let p = new Promise(function(data, error) {
    axios.post("/api/getUserByFirstAndLastName", firstAndLastName).then(function(result, err) {
      if (result) {
        data(result);
      } else {
        error("");
      }
    })
  })
  return p
}


export default {
  loginUser: loginUser,
  createAppointment: createAppointment,
  getAllAppointments: getAllAppointments,
  deleteAppointment: deleteAppointment,
  getUserByFirstAndLastName: getUserByFirstAndLastName,
  signUpAdmin: signUpAdmin
};
