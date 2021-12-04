import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClockView from './components/ClockView';
import TimerView from './components/TimerView';
import TimerSSNSview from './components/TimerSSNSview';
import api from './api';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: true,
    }
  }

  render () {

    // console.log('mario')
    // api.getAllSessions().then(sessions => console.log(sessions))
    
    const onChange = (e) => {
      console.log(e.target)

      if (e.target.className === 'sessionNameInput') { this.setState({ nameSessionInput: e.target.value }); }
      if (e.target.className === 'inputHours') { this.setState({ hoursInput: e.target.value }); }
      if (e.target.className === 'inputMinutes') { this.setState({ minutesInput: e.target.value }); }
      if (e.target.className === 'inputSeconds') { this.setState({ secondsInput: e.target.value }); }
      if (e.target.className === 'searchbar') { this.setState({ searchInput: e.target.value }) }
    }

    const onClick = (e) => {
      console.log(e.target.className);
    } 


    return (
      <div className="container">
        <Router>
          <div className='linkContainer'>
            <p className='indLink'><Link className='Link' to='/'>Clock</Link></p>
            <p className='indLink'><Link className='Link' to='/timer'>Timer</Link></p>
            <p className='indLink'><Link className='Link' to='/sessions'>Sessions</Link></p>
          </div>

          <Routes>
            <Route path='/' element={ <ClockView onClick={onClick} /> }/>
            <Route path='/timer' element={ <TimerView onClick={onClick} onChange={onChange}/> }/>
            <Route path='/sessions' element={ <TimerSSNSview onClick={onClick} onChange={onChange} /> }/>
          </Routes>

        </Router>
      </div>
    );
  }
}

export default App;
