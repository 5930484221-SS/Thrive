import React, { Component } from "react";

class Logout extends Component {
  state = {};
  render() {
    return <Route path="/" component={Listing} />;
  }
}

export default Logout;
