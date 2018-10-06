import React from "react";

const AppointmentButton = props => (
    <a className="btn waves-effect waves-light" onClick={props.newAppointment}>New Appointment</a>
);

export default AppointmentButton;
