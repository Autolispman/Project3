import React from "react";

const AppointmentButton = props => (
  <div>
    <nav>
      <div className="nav-wrapper indigo lighten-2">
        <a href="#!" className="brand-logo center"><h5>Sam's Pet Care</h5></a>
        <header className="App-header">
          <button className="btn waves-effect waves-light" onClick={props.newAppointment}>New Appointment</button>
        </header>
      </div>
    </nav>
  </div>
);

export default AppointmentButton;
