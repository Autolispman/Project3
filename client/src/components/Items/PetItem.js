import React, { Component } from "react";

class PetItem extends Component {
  state = {
    showDetails: false,
    plusOrMinus: "+",
    checked: false
  };

  componentDidMount() {
    this.setState({checked: this.props.checked})
  }

  toggleShowDetails = () => {
    this.setState(
      {
        showDetails: !this.state.showDetails
      },
      () =>
        this.state.showDetails
          ? this.setState({ plusOrMinus: "-" })
          : this.setState({ plusOrMinus: "+" })
    );
  };

  handleCheckChange = event => {
    this.setState({ checked: !this.state.checked }, () => {
      for (let i = 0; i < this.props.petsAndMore.length; i++) {
        if (this.props.petsAndMore[i].petName === this.props.petName) {
          this.props.petsAndMore[i].checked = this.state.checked;
        }
      }
      //console.log(this.props.petsAndMore)
    });
  };

  render() {
    return (
      <div>
        <div>
          {this.props.showButtons ? (
            <div>
              <button onClick={this.toggleShowDetails}>
                {this.state.plusOrMinus}
              </button>
              <span>{this.props.petName}</span>
              <button
                type="text"
                className="btn waves-effect waves-light"
                onClick={this.props.editPet}
                data-petname={this.props.petName}
                data-petid={this.props.petId}
              >
                Edit Pet
              </button>
              <button
                type="text"
                className="btn waves-effect red"
                onClick={this.props.deletePet}
                data-petname={this.props.petName}
                data-petid={this.props.petId}
              >
                Delete Pet
              </button>
              {this.state.showDetails ? (
                <ul>
                  <li>Breed: {this.props.breed}</li>
                  <li>Birthday: {this.props.birthday}</li>
                  <li>Gender: {this.props.gender}</li>
                  <li>Fixed: {this.props.fixed}</li>
                  <li>Crate Trained: {this.props.crateTrained}</li>
                  <li>House Trained: {this.props.houseTrained}</li>
                  <li>
                    Feeding Instructions: {this.props.feedingInstructions}
                  </li>
                  <li>Medications: {this.props.medications}</li>
                  <li>Health Issues: {this.props.healthIssues}</li>
                  <li>Notes: {this.props.notes}</li>
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
        {this.props.showCheckbox ? (
          <div>
            <label>
              <input
                type="checkbox"
                name="pet"
                checked={this.state.checked}
                onChange={this.handleCheckChange}
              />
              <span>{this.props.petName}</span>
            </label>
          </div>
        ) : null}
      </div>
      // <a className="btn waves-effect waves-light" data-firstname={props.firstName} data-lastname={props.lastName}onClick={props.editClient}>{props.lastName}, {props.firstName}</a>
    );
  }
}

export default PetItem;
