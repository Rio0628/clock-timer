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
      sessionClosed: true,
    }
  }

  render () {

    // console.log('mario')
    // api.getAllSessions().then(sessions => console.log(sessions))
    
    const setClock = async (region) => {
      let date = new Date(), finalDate, timezone = region;

      if (region === 'eastern') { timezone = 'America/New_York' };
      if (region === 'central') { timezone = 'America/Denver' };
      if (region === 'pacific') { timezone = 'America/Los_Angeles' };

      finalDate = await date.toLocaleString(('en-US'), { timeZone: this.state.timezone })
      finalDate = finalDate.split(' ');
      finalDate = `${finalDate[1]} ${finalDate[2]}`
      // console.log(finalDate)
      // console.log(region)

      this.setState({ timeClock: finalDate});
      let clockTimeout = setTimeout( () => setClock(), 1000 )
      
      if (!this.state.clockView) { clearTimeout(clockTimeout) };
    }

    // console.log(this.state.timeClock)

    const onChange = async (e) => {
      console.log(e.target)

      if (e.target.className === 'sessionNameInput') { this.setState({ nameSessionInput: e.target.value }); }
      
      if (e.target.className === 'inputHours') { this.setState({ hoursInput: e.target.value }); }
      
      if (e.target.className === 'inputMinutes') { this.setState({ minutesInput: e.target.value }); }
      
      if (e.target.className === 'inputSeconds') { this.setState({ secondsInput: e.target.value }); }

      if (e.target.className === 'searchbar') {
        const searchResult = this.state.timerSessions.filter( session => session.name.toLowerCase().search(e.target.value) !== -1 )
        this.setState({ timerSessions: searchResult });
        
        if (e.target.value.length < 1) {
          await api.getAllSessions().then( sessions => this.setState({ timerSessions: sessions.data.data }));
        }
      }
    
    }

    const onClick = async (e) => {
      console.log(e.target.className);

      if (e.target.className === 'Link') {
        if (e.target.id === 'clock') {
          await this.setState({ timezone: 'America/New_York'});
          setClock('America/New_York');

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
        this.setState({ currentSession: '' });
        this.setState({ sessionClosed: !this.state.sessionClosed });
      }

      if (e.target.className === 'indTimezone') {
        await this.setState({ timezone: e.target.getAttribute('timezone') });
        setClock('lol');
      }
    } 

    // console.log(this.state.sessionOpen)

    return (
      <div className="container">
        <Router>
          <div className='linkContainer'>
            <p className='indLink'><Link className='Link' id='clock' to='/' onClick={onClick}>Clock</Link></p>
            <p className='indLink'><Link className='Link' id='timer' to='/timer' onClick={onClick}>Timer</Link></p>
            <p className='indLink'><Link className='Link' id='sessions' to='/sessions' onClick={onClick}>Sessions</Link></p>
          </div>

          <Routes>
            <Route path='/' element={ <ClockView currentTimezone={this.state.timezone} clockTime={this.state.timeClock} onClick={onClick} /> }/>
            <Route path='/timer' element={ <TimerView onClick={onClick} onChange={onChange}/> }/>
            <Route path='/sessions' element={ <TimerSSNSview currentSession={this.state.currentSession} isSessionOpen={this.state.isSessionOpen} isSessionClosed={this.state.sessionClosed} sessions={this.state.timerSessions} onClick={onClick} onChange={onChange} /> }/>
          </Routes>

        </Router>
      </div>
    );
  }
}

export default App;
