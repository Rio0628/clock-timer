import React, { Component } from 'react';
import api from './api';


class App extends Component {
  render () {

    console.log('mario')
    api.getAllSessions().then(sessions => console.log(sessions))
    return (
      <div className="container">
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
