import React from "react";

const ClientItem = props => (
    <a className="btn waves-effect waves-light" onClick={props.client}>{props.lastName}, {props.firstName}</a>
);

export default ClientItem;