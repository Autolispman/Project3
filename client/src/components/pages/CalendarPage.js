import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
//import { BrowserRouter as Router, Route } from "react-router-dom";

import "../../App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import Appointment from "../Items/Appointment.js";

import AppointmentButton from "../Items/AppointmentButton.js";
import API from "../../utils/API";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

const DnDCalendar = withDragAndDrop(Calendar);

let allViews = Object.keys(Calendar.Views).map(k => Calendar.Views[k]);

class CalendarPage extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        //end: "",
        title: ""
      }
    ],
    message: "Hello"
  };

  componentDidMount() {
    let prom = API.getAllAppointments();
    let array = [];
    prom.then(results => {
      for (let i = 0; i < results.data.length; i++) {
        let obj = {
          start: new Date(results.data[i].startDate),
          end: new Date(results.data[i].endDate),
          title: results.data[i].typeOfAppointment + " " + results.data[i].User.firstName + " " + results.data[i].User.lastName,
          info: results.data[i]
        };
        //console.log(obj);

        array.push(obj);
      }
      this.setState({ events: array });
    });
  }

  onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  };

  newAppointment = () => {
    let curDate = moment(Date.now())
    .format("YYYY-MM-DDTHH:mm:ss") + ".000Z"
    let currentInfo = {
      //start: "2018-09-27T00:00:00.000Z",
      start: new Date(Date.now()),
      end: curDate
    }
    window.localStorage.setItem("currentInfo", JSON.stringify(currentInfo))
    window.location.pathname = "/appointment"
  };

  selectedEvent = event => {
    // this.setState(this.props.currentInfo: event),
    // () => console.log(this.props.currentInfo)
    console.log(event)
    window.localStorage.setItem("currentInfo", JSON.stringify(event))
    window.location.pathname = "/appointment"
    // window.localStorage.setItem("currentInfo", event)
    // window.localStorage.setItem("currentInfo", JSON.stringify({
    //   "firstName": event.info.User.firstName
    // }))
      // lastName : this.state.lastName,
      // street1 : this.state.street1,
      // street2 : this.state.street2,
      // city : this.state.city ,
      // state : this.state.state,
      // zipCode : this.state.zipCode,
      // startDate : this.state.startDate,
      // endDate : this.state.endDate,
      // typeOfAppointment : this.state.typeOfAppointment
      //console.log(event)
  }

  render() {
    return (
      <div className="container">
      <div>
        <AppointmentButton newAppointment={this.newAppointment} />
        <DnDCalendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "100vh" }}
          views={allViews}
          onSelectEvent={this.selectedEvent}
        />
      </div>
      </div>
    );
  }
}

export default CalendarPage;
