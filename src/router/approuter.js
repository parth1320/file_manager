import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "../components/navbar";
import Register from "../components/register";
import Login from "../components/login";
import Dashboard from "../admin_component/dashboard";
import App from "../components/app";
import FilesList from "../components/fileslist";

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          {localStorage.getItem("role") === "true" ? (
            <Route exact path="/dashboard" component={Dashboard} />
          ) : (
            <>
              <Route exact path="/home" component={App} />
              <Route exact path={"/list"} component={FilesList} />
            </>
          )}
        </div>
      </Router>
    );
  }
}
export default AppRouter;

// import React from "react";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
// import Header from "../components/header";
// import App from "../components/app";
// import Navbar from "../components/navbar";
// import Landing from "../components/landing";
// import Login from "../components/login";
// import Register from "../components/register";
// import FilesList from "../components/fileslist";

// const AppRouter = () => (
//   <BrowserRouter>
//     <div className="container">
//       <div className="main-content">
//         <Switch>
//           <Route exact path="/" component={Landing} />
//           <Route exact path="/register" component={Register} />
//           <Route exact path="/login" component={Login} />
//         </Switch>
//       </div>
//     </div>
//   </BrowserRouter>
// );

// export default AppRouter;
