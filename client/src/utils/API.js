import axios from "axios";

function loginUser(loginCredentials) {
  axios
    .post("/api/login", {
      loginCredentials
    })
    .then(function(data) {
      window.location = "/calendar";
      // If there's an error, log the error
    })
    .catch(function(err) {
      alert("error");
      console.log(err);
    });
}

function createAppointment(appointmentData) {
  axios.post("/api/createAppointment", {    
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
    .then(function(data) {
      window.location = "/calendar";
    })
}

export default {
  loginUser: loginUser,
  createAppointment: createAppointment
};
