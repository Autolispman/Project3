import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

//import { BrowserRouter as Router, Route } from "react-router-dom";

import "./calendarPage.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import AppointmentButton from "../Items/AppointmentButton.js";
import Logout from "../Items/Logout.js";
import ClientButton from "../Items/ClientButton.js";
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
          start: new Date(moment(results.data[i].startDate).add(5, "hours")),
          end: new Date(moment(results.data[i].endDate).add(5, "hours")),
          title:
            results.data[i].typeOfAppointment +
            " " +
            results.data[i].User.firstName +
            " " +
            results.data[i].User.lastName +
            " " +
            results.data[i].petsToSit,
          info: results.data[i]
        };
        console.log(obj);

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
    let curDate = moment(Date.now()).format("YYYY-MM-DDTHH:mm:ss") + ".000Z";
    let currentInfo = {
      //start: "2018-09-27T00:00:00.000Z",
      start: new Date(Date.now()),
      end: curDate
    };
    window.localStorage.setItem("currentInfo", JSON.stringify(currentInfo));
    window.location.pathname = "/appointment";
  };

  selectedEvent = event => {
    // this.setState(this.props.currentInfo: event),
    // () => console.log(this.props.currentInfo)
    //console.log(event)
    window.localStorage.setItem("currentInfo", JSON.stringify(event));
    window.location.pathname = "/appointment";
  };

  client = () => {
    window.location.pathname = "/client";
  };

  render() {
    return (
      <div>
        <nav className="nav-extended indigo lighten-2">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo center">
              <h5>Sams Pet Care</h5>
            </a>
          </div>
          <div className="nav-content">
            <ul className="buttons tabs tabs-transparent">
              <Logout />
              <AppointmentButton newAppointment={this.newAppointment} />
              <ClientButton client={this.client} />
            </ul>
          </div>
        </nav>
        <div className="calendar container">
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
