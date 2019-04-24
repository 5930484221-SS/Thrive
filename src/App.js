import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Listing from "./components/courseListing/Listing";
import CourseCreation from "./components/courseCreation/CourseCreation";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Profile from "./components/dropDown/Profile";
import MyCourses from "./components/dropDown/MyCourses";
import Setting from "./components/dropDown/Setting";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Dashboard from "./components/admin/Dashboard";
import SearchUser from "./components/admin/SearchUser";
import PrivateRoute from "./components/admin/PrivateRoute";
import NavAdmin from "./components/admin/NavAdmin";
import Register from "./components/Register";

import "./App.css";
import { store } from "./configStore";
import * as Actions from "./actions";

class App extends Component {
  render() {
    let nav;
    const is_admin = localStorage.getItem("is_admin") === "true";
    console.log("is_admin", is_admin);
    if (is_admin) {
      nav = <NavAdmin />;
    } else if (localStorage.getItem("token") === null) {
      nav = <NavBar auth={false} />;
    } else {
      nav = <NavBar auth={true} />;
    }
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {localStorage.getItem("token") === null ? (
              <NavBar auth={false} />
            ) : (
              // <NavBar auth={true} />
              <NavAdmin />
            )}
            <div className="container">
              <Switch>
                <Route path="/listing" component={Listing} />
                <Route path="/create_course" component={CourseCreation} />
                <Route path="/profile" component={Profile} />
                <Route path="/myCourses" component={MyCourses} />
                <Route path="/setting" component={Setting} />
                <Route path="/register" component={Register} />
                <PrivateRoute
                  path="/admin/dashboard"
                  condition={is_admin}
                  component={Dashboard}
                />
                <PrivateRoute
                  path="/admin/searchUser"
                  condition={is_admin}
                  component={SearchUser}
                />
                <Route path="/" component={Login} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
