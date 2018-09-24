import React from "react";

const AppointmentButton = props => (
    <div>
      <header className="App-header">
          <button onClick={props.newAppointment}>New Appiontment</button>
        </header>
    </div>
  );
  
  export default AppointmentButton;
  