import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import './App.css';
import { store } from "./configStore";
import * as Actions from "./actions";

import Routes from "./components/Routes";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="container">
              <Routes />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
