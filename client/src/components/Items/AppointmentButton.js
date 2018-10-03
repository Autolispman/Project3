import React from "react";

const AppointmentButton = props => (
    <button className="btn waves-effect waves-light" onClick={props.newAppointment}>New Appointment</button>
);

export default AppointmentButton;
