import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="text-center pt-5">React Version</h1>
        <div className="text-center display-2">{React.version}</div>
      </div>
    );
  }
}

export default App;
