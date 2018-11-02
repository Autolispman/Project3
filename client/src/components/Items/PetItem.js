import React from "react";

const PetItem = props => (
    <div>
    <button>+</button>
    <span>{props.petName}</span>
    </div>
    // <a className="btn waves-effect waves-light" data-firstname={props.firstName} data-lastname={props.lastName}onClick={props.editClient}>{props.lastName}, {props.firstName}</a>
);

export default PetItem;