import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });

  const history = useHistory();

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.id]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
    };

    axios.post(`${API_URL}/register`, newUser);
    history.push("/");
    console.log(newUser);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Register</b>
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account?<Link to="/">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={handleOnSubmit}>
            <div className="input-field col s12">
              <input
                onChange={handleInputChange}
                value={state.name || ""}
                error={state.errors.name}
                id="name"
                type="text"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={handleInputChange}
                value={state.email}
                error={state.errors.email}
                id="email"
                type="email"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={handleInputChange}
                value={state.password}
                error={state.errors.password}
                id="password"
                type="password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-field col s12">
              <input
                onChange={handleInputChange}
                value={state.password2}
                error={state.errors.password2}
                id="password2"
                type="password"
              />
              <label htmlFor="password2">Confirm Password</label>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// class Register extends Component {
//   constructor() {
//     super();
//     this.state = {
//       name: "",
//       email: "",
//       password: "",
//       password2: "",
//       errors: {},
//     };
//   }
//   onChange = (e) => {
//     this.setState({ [e.target.id]: e.target.value });
//   };
//   onSubmit = (e) => {
//     e.preventDefault();
//     const newUser = {
//       name: this.state.name,
//       email: this.state.email,
//       password: this.state.password,
//       password2: this.state.password2,
//     };
//     console.log(newUser);
//   };
//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col s8 offset-s2">
//             <Link to="/" className="btn-flat waves-effect">
//               <i className="material-icons left">keyboard_backspace</i> Back to
//               home
//             </Link>
//             <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//               <h4>
//                 <b>Register</b> below
//               </h4>
//               <p className="grey-text text-darken-1">
//                 Already have an account? <Link to="/login">Log in</Link>
//               </p>
//             </div>
//             <form noValidate onSubmit={this.onSubmit}>
//               <div className="input-field col s12">
//                 <input
//                   onChange={this.onChange}
//                   value={this.state.name}
//                   error={errors.name}
//                   id="name"
//                   type="text"
//                 />
//                 <label htmlFor="name">Name</label>
//               </div>
//               <div className="input-field col s12">
//                 <input
//                   onChange={this.onChange}
//                   value={this.state.email}
//                   error={errors.email}
//                   id="email"
//                   type="email"
//                 />
//                 <label htmlFor="email">Email</label>
//               </div>
//               <div className="input-field col s12">
//                 <input
//                   onChange={this.onChange}
//                   value={this.state.password}
//                   error={errors.password}
//                   id="password"
//                   type="password"
//                 />
//                 <label htmlFor="password">Password</label>
//               </div>
//               <div className="input-field col s12">
//                 <input
//                   onChange={this.onChange}
//                   value={this.state.password2}
//                   error={errors.password2}
//                   id="password2"
//                   type="password"
//                 />
//                 <label htmlFor="password2">Confirm Password</label>
//               </div>
//               <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//                 <button
//                   style={{
//                     width: "150px",
//                     borderRadius: "3px",
//                     letterSpacing: "1.5px",
//                     marginTop: "1rem",
//                   }}
//                   type="submit"
//                   className="btn btn-large waves-effect waves-light hoverable blue accent-3"
//                 >
//                   Sign up
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default Register;
