import React, { Component } from "react";
import API from "../../utils/API.js";
import { Link } from "react-router-dom";
import "../Items/appointment.css";

class Pet extends Component {
  state = {
    id: "",
    petName: "",
    breed: "",
    birthday: null,
    gender: "",
    fixed: "",
    crateTrained: "",
    houseTrained: "",
    feedingInstructions: "",
    medications: "",
    healthIssues: "",
    foodAllergies: "",
    notes: "",
    userId: ""
  };

  componentDidMount() {
    let userData = window.localStorage.getItem("petInfo");
    userData = JSON.parse(userData);
    this.setState(
      {
        id: userData.id,
        userId: userData.userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        petName: userData.petName
      },
      () => {
        console.log(userData.petName);
        this.queryForRepeatPet();
      }
    );

    //   let prom = API.getPetByIdAndUserId(userData);
    //   prom.then(result => {
    //     console.log(result);
    //     this.setState({
    //       id: result.data.id,
    //       petName: result.data.petName,
    //       breed: result.data.breed,
    //       age: result.data.age,
    //       feedingInstructions: result.data.feedingInstructions,
    //       medications: result.data.medications,
    //       healthIssues: result.data.healthIssues,
    //       foodAllergies: result.data.foodAllergies,
    //       notes: result.data.notes,
    //       userId: result.data.userId
    //     });
    //   });
    //   window.localStorage.setItem("petName", "");
    //   window.localStorage.setItem("userId", "");
  }

  createPet = event => {
    event.preventDefault();
    const userData = {
      id: this.state.id,
      petName: this.state.petName,
      breed: this.state.breed,
      birthday: this.state.birthday,
      gender: this.state.gender,
      fixed: this.state.fixed,
      crateTrained: this.state.crateTrained,
      houseTrained: this.state.houseTrained,
      feedingInstructions: this.state.feedingInstructions,
      medications: this.state.medications,
      healthIssues: this.state.healthIssues,
      foodAllergies: this.state.foodAllergies,
      notes: this.state.notes,
      userId: this.state.userId
    };
    window.localStorage.setItem("firstName", this.state.firstName);
    window.localStorage.setItem("lastName", this.state.lastName);
    console.log(userData)
    let prom = API.updatePet(userData);
    prom.then(result => {
      window.location = "/user";
    });
  };

  deletePet = () => {
    let conf = window.confirm(
      `Do you really want to delete ${this.state.petName}`
    );
    if (conf) {
      let prom = API.deletePet(this.state.id);
      prom.then(data => {
        window.location.pathname = "/user";
      });
    }
  };

  queryForRepeatPet = () => {
    let petData = {
      petName: this.state.petName,
      userId: this.state.userId
    };
    let prom = API.getPetByNameAndUserId(petData);
    prom.then(results => {
       console.log(results.data.crateTrained)
      // console.log(results.data.feedingInstructions)
      // console.log(this.state.feedingInstructions)
      if (this.state.petName !== "") {
        this.setState({ id: results.data.id });
        if (this.state.breed === "" || this.state.breed === undefined) {
          this.setState({ breed: results.data.breed });
        }
        if (this.state.birthday === null || this.state.birthday === undefined) {
          this.setState({ birthday: results.data.birthday });
        }
        if (this.state.gender === "" || this.state.gender === undefined) {
          this.setState({
            gender: results.data.gender
          });
        }
        if (this.state.fixed === "" || this.state.fixed === undefined) {
          this.setState({
            fixed: results.data.fixed
          });
        }
        if (
          this.state.crateTrained === "" ||
          this.state.crateTrained === undefined
        ) {
          this.setState({
            crateTrained: results.data.crateTrained
          });
        }
        if (
          this.state.houseTrained === "" ||
          this.state.houseTrained === undefined
        ) {
          this.setState({
            houseTrained: results.data.houseTrained
          });
        }
        if (
          this.state.feedingInstructions === "" ||
          this.state.feedingInstructions === undefined
        ) {
          this.setState({
            feedingInstructions: results.data.feedingInstructions
          });
        }
        if (
          this.state.medications === "" ||
          this.state.medications === undefined
        ) {
          this.setState({ medications: results.data.medications });
        }
        if (
          this.state.healthIssues === "" ||
          this.state.healthIssues === undefined
        ) {
          this.setState({ healthIssues: results.data.healthIssues });
        }
        if (
          this.state.foodAllergies === "" ||
          this.state.foodAllergies === undefined
        ) {
          this.setState({ foodAllergies: results.data.foodAllergies });
        }
        if (this.state.notes === "" || this.state.notes === undefined) {
          this.setState({ notes: results.data.notes });
        }
      }
    });
  };

  handleOnChange = event => {
    let { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        <nav className="nav-extended indigo lighten-2">
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo center">
              <h5>Sam's Pet Care</h5>
            </a>
          </div>
        </nav>
        <div className="container">
          <form
            method=""
            action=""
            className="sm-col-12"
            onSubmit={this.createPet}
          >
            <label className="modalLabel">Pet Name</label>
            <input
              name="petName"
              type="text"
              id="petNameInputId"
              className=""
              placeholder="petName"
              required="true"
              value={this.state.petName}
              onChange={this.handleOnChange}
              onBlur={this.queryForRepeatPet}
            />
            <br />
            <label className="modalLabel">Breed</label>
            <input
              name="breed"
              type="text"
              id="breedInputId"
              className=""
              placeholder="breed"
              value={this.state.breed}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Birthday</label>
            <input
              name="birthday"
              type="text"
              id="birthdayInputId"
              className=""
              placeholder="birthday"
              required={false}
              value={this.state.birthday}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Gender</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  //defaultValue="PetTaxiPickUpDropOff"
                  onChange={this.handleOnChange}
                  value="Male"
                  checked={this.state.gender === "Male"}
                  required={true}
                />
                <span>Male</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  //defaultValue="PetTaxiPickUpDropOff"
                  onChange={this.handleOnChange}
                  value="Female"
                  checked={this.state.gender === "Female"}
                  required={true}
                />
                <span>Female</span>
              </label>
            </div>
            <hr></hr>
            <label>Fixed?</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="fixed"
                  //defaultValue="PetTaxiPickUpDropOff"
                  onChange={this.handleOnChange}
                  value="Spayed"
                  checked={this.state.fixed === "Spayed"}
                  required={true}
                />
                <span>Spayed</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="fixed"
                  //defaultValue="PetTaxiPickUpDropOff"
                  onChange={this.handleOnChange}
                  value="Neutered"
                  checked={this.state.fixed === "Neutered"}
                  required={true}
                />
                <span>Neutered</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="fixed"
                  //defaultValue="PetTaxiPickUpDropOff"
                  onChange={this.handleOnChange}
                  value="Neither"
                  checked={this.state.fixed === "Neither"}
                  required={true}
                />
                <span>Neither</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="fixed"
                  //defaultValue="PetTaxiPickUpDropOff"
                  onChange={this.handleOnChange}
                  value="Unknown"
                  checked={this.state.fixed === "Unknown"}
                  required={true}
                />
                <span>Unknown</span>
              </label>
            </div>
            <hr></hr>
            <label>Crate Trained</label>
            <textarea
              name="crateTrained"
              type="text"
              id="crateTrainedInputId"
              className=""
              placeholder="crateTrained"
              required={false}
              value={this.state.crateTrained}
              onChange={this.handleOnChange}
            />
            <br />
            <label>House Trained</label>
            <textarea
              name="houseTrained"
              type="text"
              id="houseTrainedInputId"
              className=""
              placeholder="houseTrained"
              required={false}
              value={this.state.houseTrained}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Feeding Instructions</label>
            <input
              name="feedingInstructions"
              type="text"
              id="feedingInstructionsInputId"
              className=""
              placeholder="feedingInstructions"
              required={false}
              value={this.state.feedingInstructions}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Medications</label>
            <input
              name="medications"
              type="text"
              id="medicationsInputId"
              className=""
              placeholder="medications"
              required={false}
              value={this.state.medications}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Health Issues</label>
            <input
              name="healthIssues"
              type="text"
              id="healthIssuesInputId"
              className=""
              placeholder="healthIssues"
              required={false}
              value={this.state.healthIssues}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Allergies</label>
            <input
              name="foodAllergies"
              type="text"
              id="foodAllergiesCodeId"
              className=""
              placeholder="foodAllergies"
              required={false}
              value={this.state.foodAllergies}
              onChange={this.handleOnChange}
            />
            <br />
            <label>Pet Notes</label>
            <textarea
              name="notes"
              type="text"
              id="notesId"
              className=""
              placeholder="notes"
              required={false}
              value={this.state.notes}
              onChange={this.handleOnChange}
            />
            <br />
            <br />
            <button type="text" className="btn waves-effect waves-light">
              Create/Update Pet
            </button>
          </form>
          <br />
          <div className="grid-example col s12 m6">
            <button
              type="text"
              className="btn waves-effect red"
              onClick={this.deletePet}
            >
              Delete Pet
            </button>
            <Link to="/client" className="btn waves-effect yellow darken-2">
              Disregard Changes
            </Link>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

export default Pet;
