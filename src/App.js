import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClockView from './components/ClockView';
import TimerView from './components/TimerView';
import TimerSSNSview from './components/TimerSSNSview';
import api from './api';


class App extends Component {
  render () {

    console.log('mario')
    // api.getAllSessions().then(sessions => console.log(sessions))
    
    
    return (
      <div className="container">
        <Router>
          <div className='linkContainer'>
            <p className='indLink'><Link className='Link' to='/'>Clock</Link></p>
            <p className='indLink'><Link className='Link' to='/timer'>Timer</Link></p>
            <p className='indLink'><Link className='Link' to='/sessions'>Sessions</Link></p>
          </div>

          <Routes>
            <Route path='/' element={ <ClockView /> }/>
            <Route path='/timer' element={ <TimerView /> }/>
            <Route path='/sessions' element={ <TimerSSNSview /> }/>
          </Routes>

        </Router>
      </div>
    );
  }
}

export default App;
