import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useHistory } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const onChange = (e) => {
    setUser({
      ...user, //spread operator
      [e.target.id]: e.target.value,
    });
  };

  const onclick = (e) => {
    history.push("/list");
  };

  const onSubmit = (e) => {
    axios
      .post(`${API_URL}/login`, user)
      .then((value) => {
        console.log(value.data);
        localStorage.setItem("token", value.data.token);
        localStorage.setItem("user", value.data.id);
        localStorage.setItem("role", value.data.role);
        if (localStorage.getItem("role") === "true") {
          history.push("/dashboard");
        } else {
          history.push("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.email}
                error={user.errors.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={onChange}
                value={user.password}
                error={user.errors.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                onClick={(e) => {
                  onSubmit(e);
                }}
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                onClick={(e) => {
                  onclick(e);
                }}
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                For Guest User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
