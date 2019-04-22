import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, condition, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      condition === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default PrivateRoute;
