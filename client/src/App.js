import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

import Login from "./components/pages/Login.js"
import CalendarPage from "./components/pages/CalendarPage.js"
import Appointment from "./components/Items/Appointment.js"
import API from "./utils/API";

class App extends Component {
  state = {
    
  };


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
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path ="/calendar" component ={CalendarPage}/>
            <Route exact path ="/appointment" component ={Appointment}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
