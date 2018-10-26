import React from "react";

const ClientItem = props => (
    <a className="btn waves-effect waves-light" data-firstname={props.firstName} data-lastname={props.lastName} onClick={props.editClient}>{props.lastName}, {props.firstName}</a>
);

export default ClientItem;