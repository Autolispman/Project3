import React from "react";

const AppointmentButton = props => (
    <div>
      <header className="App-header">
          <button className="btn waves-effect waves-light" onClick={props.newAppointment}>New Appointment</button>
        </header>
    </div>
  );
  
  export default AppointmentButton;
  