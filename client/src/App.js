import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Login from "./components/pages/Login.js"
import CalendarPage from "./components/pages/CalendarPage.js"
import Appointment from "./components/Items/Appointment.js"
import Client from "./components/pages/Client.js"
import User from "./components/pages/User.js"
import Pet from "./components/pages/Pet.js"
import firebase from "./config/firebase.js"

class App extends Component {
  state = {
    currentInfo: "AppComponent",
    user: {}
  };

  componentDidMount() {
    this.authListener()
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
      else {
        this.setState({ user: null })
      }
    })
  }


  // handleInputChange = event => {
  //   // Destructure the name and value properties off of event.target
  //   // Update the appropriate state
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  // handleFormSubmit = event => {
  //   // When the form is submitted, prevent its default behavior, get recipes update the recipes state
  //   event.preventDefault();
  //   API.getRecipes(this.state.recipeSearch)
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({ recipes: res.data });
  //     })
  //     .catch(err => console.log(err));
  // };

  render() {
    return (
      <div>
        {this.state.user ? 
      (<Router>
          <Switch>
            <Route exact path="/" component={CalendarPage} />
            <Route exact path ="/calendar" component ={CalendarPage}/>
            <Route exact path ="/appointment" component ={Appointment}/>
            <Route exact path ="/client" component ={Client}/>
            <Route exact path ="/user" component ={User}/>
            <Route exact path ="/pet" component ={Pet}/>
          </Switch>
        </Router>) : (<Login/>)}
      </div>
    );
  }
}

export default App;
