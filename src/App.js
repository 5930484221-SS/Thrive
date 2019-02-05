import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Listing from './components/Listing';
import CourseCreation from './components/CourseCreation';
import Login from './components/Login';
import NotFound from './components/NotFound';

import NavBar from './components/NavBar';

import './App.css';
import { store } from './configStore';
import * as Actions from './actions';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            {localStorage.getItem('token') === null ? <NavBar /> : ''}

            <div className="container">
              <Switch>
                <Route path="/listing" component={Listing} />
                <Route path="/create_course" component={CourseCreation} />
                <Route path="/" component={Login} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
