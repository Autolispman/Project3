import React from "react";

const ClientItem = props => (
    <a className="btn waves-effect waves-light" onClick={props.client}>{props.lastName}</a>
);

export default ClientItem;