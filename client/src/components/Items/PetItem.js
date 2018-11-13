import React from "react";

const PetItem = props => (
  <div>
    <button>+</button>
    <span>{props.petName}</span>
    <button
      type="text"
      className="btn waves-effect waves-light"
      onClick={props.editPet}
      data-petname={props.petName}
      data-petid={props.petId}
    >
      Edit Pet
    </button>
    <button
      type="text"
      className="btn waves-effect red"
      onClick={props.deletePet}
      data-petname={props.petName}
      data-petid={props.petId}
    >
      Delete Pet
    </button>
  </div>
  // <a className="btn waves-effect waves-light" data-firstname={props.firstName} data-lastname={props.lastName}onClick={props.editClient}>{props.lastName}, {props.firstName}</a>
);

export default PetItem;
