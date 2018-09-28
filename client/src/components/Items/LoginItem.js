import React from "react";

const LoginItem = props => (
  // <div classNameName="container">
  //   <form method="post" onSubmit={""}>
  //     <div classNameName="form-group col-md-offset-3 col-md-12">
  //       <label htmlFor="topic" classNameName="text-center">Topic</label>
  //       <input type="text" classNameName="form-control text-center" id="topic" onChange={props.handleSearchChange} name="topic" value={props.topic} />
  //     </div>

  //     <br />

  //     <div classNameName="form-group col-md-offset-3 col-md-12">
  //       <label htmlFor="startYear">Start Year</label>
  //       <input type="text" classNameName="form-control text-center" id="startYear" onChange={props.handleSearchChange} name="startYear" value={props.startYear} />
  //     </div>

  //     <br />

  //     <div classNameName="form-group col-md-offset-3 col-md-12">
  //       <label htmlFor="endYear">End Year</label>
  //       <input type="text" classNameName="form-control text-center" id="endYear" onChange={props.handleSearchChange}name="endYear" value={props.endYear} />
  //     </div>
  //     <br />

  //     <button type="submit" classNameName="btn btn-info col-md-offset-5 col-md-2" id="searchBtn">Search</button>

  //   </form>
  // </div>
  <div className="container">
  <div>
    <label>{props.message}</label>
    <form className="col s12" onSubmit={props.processAdminLogin}>
      <div className="row">
        <div className="input-field col s6">
          <input id="adminUserName" name="adminUserName" type="text" className="validate" value={props.adminUserName} onChange={props.handleLoginChange} />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-field col s6">
          <input id="adminPW" name="adminPW" type="password" className="validate" value={props.adminPW} onChange={props.handleLoginChange} />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <button className="btn waves-effect waves-light" id="adminSubBtn">Log in</button>
    </form>
  </div>
  </div>
);

export default LoginItem;
