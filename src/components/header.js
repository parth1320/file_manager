import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="heade">
      <h1 className="brand-logo center">File Upload and Download</h1>
      <nav>
        <NavLink activeClassName="activ" to="/home" exact={true}>
          Home
        </NavLink>
        <NavLink activeClassName="activ" to="/list">
          Files-List
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
