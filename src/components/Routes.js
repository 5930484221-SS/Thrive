import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {  } from "./auth";

import NotFound from "./NotFound";

export default () => (
  <Switch>
    <Route component={NotFound} />
  </Switch>
);
