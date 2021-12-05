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
      sessionOpen: false,
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

    const onClick = async (e) => {
      console.log(e.target.className);

      if (e.target.className === 'Link') {
        if (e.target.id === 'clock') {
          this.setState({ timerView: false });
          this.setState({ sessionsView: false })
          this.setState({ clockView: true });
        }

        if (e.target.id === 'timer') {
          this.setState({ clockView: false });
          this.setState({ sessionsView: false });
          this.setState({ timerView: true });
        }

        if (e.target.id === 'sessions') {
          let sessions;
          await api.getAllSessions().then( allSessions => sessions = allSessions.data.data )
          this.setState({ timerSessions: sessions });

          this.setState({ clockView: false });
          this.setState({ timerView: false });
          this.setState({ sessionsView: true });
        }
      }

      if (e.target.className === 'removeSessionBtn') {
        await api.deleteSessionById(e.target.getAttribute('session')).then( session => alert('Session Deleted.') ).catch( err => this.setState({ timerSessions: '' }) );
        await api.getAllSessions().then( sessions => this.setState({ timerSessions: sessions.data.data }) ).catch( err => this.setState({ timerSessions: '' }) )
      }

      if (e.target.className === 'timerSessionCls') {
        this.setState({ currentSession: e.target.getAttribute('session') });
        this.setState({ sessionOpen: !this.state.sessionOpen })
      }

      if (e.target.className === 'timerSessionOpen') {
        this.setState({ currentSession: e.target.getAttribute('session') });
        this.setState({ sessionOpen: false });
      }
    } 

    console.log(this.state.sessionOpen)

    return (
      <div className="container">
        <Router>
          <div className='linkContainer'>
            <p className='indLink'><Link className='Link' id='clock' to='/' onClick={onClick}>Clock</Link></p>
            <p className='indLink'><Link className='Link' id='timer' to='/timer' onClick={onClick}>Timer</Link></p>
            <p className='indLink'><Link className='Link' id='sessions' to='/sessions' onClick={onClick}>Sessions</Link></p>
          </div>

          <Routes>
            <Route path='/' element={ <ClockView onClick={onClick} /> }/>
            <Route path='/timer' element={ <TimerView onClick={onClick} onChange={onChange}/> }/>
            <Route path='/sessions' element={ <TimerSSNSview currentSession={this.state.currentSession} isSessionOpen={this.state.isSessionOpen} sessions={this.state.timerSessions} onClick={onClick} onChange={onChange} /> }/>
          </Routes>

        </Router>
      </div>
    );
  }
}

export default App;
