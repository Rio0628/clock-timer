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
      statusBtn: 'start',
      hoursInput: 0,
      minutesInput: 0,
      secondsInput: 0,
      crntSessionIntrvls: [],
    }
  }

  render () {
    
    const setClock = async () => {
      // Function to set the time for the clock view according to the value of the timezone state as long as the clock view is the current view
      let date = new Date(), finalDate;
      finalDate = await date.toLocaleString(('en-US'), { timeZone: this.state.timezone })
      finalDate = finalDate.split(' ');
      finalDate = `${finalDate[1]} ${finalDate[2]}`

      this.setState({ timeClock: finalDate});
      let clockTimeout = setTimeout( () => setClock(), 1000 )
      
      if (!this.state.clockView) { clearTimeout(clockTimeout) };
    }

    const currentTimer = () => {
      // Set the new timer according to the values of the hours, minutes, and seconds input states and runs the timer 
      let crntHours = parseInt(this.state.hoursInput), crntMinutes = parseInt(this.state.minutesInput), crntSecs = parseInt(this.state.secondsInput); 

      // Main timer countdown code 
      if (crntSecs > 0) {
        crntSecs = crntSecs - 1;
        this.setState({ secondsInput: crntSecs });
      }
      else if (crntSecs === 0) {
        if (crntMinutes > 0) {
          crntMinutes = crntMinutes - 1;
          crntSecs = 59;
          this.setState({ minutesInput: crntMinutes});
          this.setState({ secondsInput: crntSecs });
        }
        else if (crntMinutes === 0) {
          if (crntHours > 0) {
            crntHours = crntHours - 1;
            crntMinutes = 59;
            crntSecs = 59;
            this.setState({ hoursInput: crntHours }); 
            this.setState({ minutesInput: crntMinutes }); 
            this.setState({ secondsInput: crntSecs }); 
          }
        }
      }
      this.setState({ timerValue: `${crntHours}:${crntMinutes}:${crntSecs}`});

      let timer = setTimeout(() => currentTimer(), 1000 );

      if (this.state.intervalCanceled) { 
        this.setState({ hoursInput: 0 });
        this.setState({ minutesInput: 0 });
        this.setState({ secondsInput: 0 });
      }
      
      if ( (crntHours === 0 && crntMinutes === 0 && crntSecs === 0) || this.state.timerPaused) { 
        clearTimeout(timer) 
        if (!this.state.timerPaused) { this.setState({ timerInUse: false }); }
      };

      if (crntHours === 0 && crntMinutes === 0 && crntSecs === 0 && !this.state.intervalCanceled) {
        this.setState({ statusBtn: 'start'});
        alert('Interval Finished!')
        let intervalTime = this.state.initialTime, timeAcr;
        intervalTime = intervalTime.split(':');
        
        // Sets the timer value to look a certain way according to the inputs provided 
        if (intervalTime[0] === '0') {
          if (intervalTime[1] === '0') {
            intervalTime = intervalTime[2];
            timeAcr = 'Sec'
          } else {
            intervalTime = `${intervalTime[1]}:${intervalTime[2]}`;
            timeAcr = 'Min'
          }
        } else {
          intervalTime = this.state.initialTime;
          timeAcr = 'Hour'
        }
        
        // Interval object to display each time the timer finishes a countdown 
        const interval = {time: `${intervalTime} ${timeAcr}`, interval: `interval ${this.state.crntSessionIntrvls.length}`};
        this.setState(prevState => ({ crntSessionIntrvls: [...prevState.crntSessionIntrvls, interval ] }))
      }
    }

    const onChange = async (e) => {
      // Main onChange function that gathers all of the values for input and select elements and sets them on their corresponding states

      if (e.target.className === 'sessionNameInput') { this.setState({ nameSessionInput: e.target.value }); }
      
      if (e.target.className === 'inputHours') { this.setState({ hoursInput: e.target.value }); }
      
      if (e.target.className === 'inputMinutes') { this.setState({ minutesInput: e.target.value }); }
      
      if (e.target.className === 'inputSeconds') { this.setState({ secondsInput: e.target.value }); }

      if (e.target.className === 'descriptionInput') { this.setState({ descriptionInput: e.target.value });}

      if (e.target.className === 'searchbar') {
        // Searchbar function to filter out the timer sessions according to the value of the search input element
        const searchResult = this.state.timerSessions.filter( session => session.name.toLowerCase().search(e.target.value) !== -1 )
        this.setState({ timerSessions: searchResult });
        
        if (e.target.value.length < 1) {
          await api.getAllSessions().then( sessions => this.setState({ timerSessions: sessions.data.data }));
        }
      }
    
    }

    const onClick = async (e) => {
      // Main onClick function 
      if (e.target.className === 'Link') {
        // Sets the current view state on according to which route is clicked
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
        // Removes a certain session from the database
        await api.deleteSessionById(e.target.getAttribute('session')).then( session => alert('Session Deleted.') ).catch( err => this.setState({ timerSessions: '' }) );
        await api.getAllSessions().then( sessions => this.setState({ timerSessions: sessions.data.data }) ).catch( err => this.setState({ timerSessions: '' }) )
      }

      if (e.target.className === 'timerSessionCls') {
        // Takes cares of showing the open view of a individual session
        this.setState({ currentSession: e.target.getAttribute('session') });
        this.setState({ sessionOpen: !this.state.sessionOpen })
      }

      if (e.target.className === 'timerSessionOpen') {
        // Takes cares of showing the closed view of a individual session
        this.setState({ currentSession: '' });
        this.setState({ sessionClosed: !this.state.sessionClosed });
      }

      if (e.target.className === 'indTimezone') {
        // Changes the clock view according to the timezone value of each element 
        await this.setState({ timezone: e.target.getAttribute('timezone') });
        setClock();
      }

      if (e.target.className === 'startPauseBtn') {
        // Function to start and pause the timer according to the attribute of the start pause button 
        this.setState({ intervalCanceled: false });
        if (e.target.getAttribute('current') === 'start') { 
          // The code will only run as long as there is a value for one of the time input states
          if (this.state.hoursInput > 0 || this.state.minutesInput > 0 || this.state.secondsInput > 0) {
            await this.setState({ initialTime: `${this.state.hoursInput}:${this.state.minutesInput}:${this.state.secondsInput}`});
            await this.setState({ timerPaused: false });
            currentTimer();

            this.setState({ timerInUse: true });            
            this.setState({ statusBtn: 'pause' }); 
          } else { alert('Enter time value for the timer to begin'); } 
        }
        else if (e.target.getAttribute('current') === 'pause') {
          currentTimer();
          this.setState({ timerInUse: true })
          this.setState({ timerPaused: true });
          this.setState({ statusBtn: 'start' });
        }

      }
      if (e.target.className === 'cancelBtn') {
        // Cancels the current timer interval 
        this.setState({ statusBtn: 'start' });
        this.setState({ timerInUse: false });
        this.setState({ timerPaused: false });
        this.setState({ intervalCanceled: true });
        this.setState({ timerInUse: false });
      }

      if (e.target.id === 'removeTimerBtn') {
        // Removes a certain interval from the current timer session 
        const updatedList = this.state.crntSessionIntrvls.filter( interval => interval.interval !== e.target.getAttribute('interval'))
        this.setState({ crntSessionIntrvls: updatedList });
      }

      // Takes care of showing the open view of the save session element 
      if (e.target.className === 'saveBtn') { this.setState({ saveSessionOn: true }); }

      if (e.target.className === 'saveSessionBtn') {
        // Saves a the current timer session into the database 
        let object, descriptionInput, intervals = []; 

        if (!this.state.descriptionInput) {
          descriptionInput = 'n/a';
        } else descriptionInput = this.state.descriptionInput;
        
        await this.state.crntSessionIntrvls.forEach( interval => intervals.push(interval.time))

        object = await {name: this.state.nameSessionInput, intervals: intervals, description: descriptionInput};
        await api.insertSession(object).then( obj => alert('Session Added!') ).catch( err => alert('Error Occurred: Name of session and or intervals') );

        this.setState({ saveSessionOn: false });
      }
    } 

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

            <Route path='/timer' element={ <TimerView isSaveOn={this.state.saveSessionOn} intervals={this.state.crntSessionIntrvls} timerValue={this.state.timerValue} timerInUse={this.state.timerInUse} statusBtn={this.state.statusBtn} onClick={onClick} onChange={onChange}/> }/>
            
            <Route path='/sessions' element={ <TimerSSNSview currentSession={this.state.currentSession} isSessionOpen={this.state.isSessionOpen} isSessionClosed={this.state.sessionClosed} sessions={this.state.timerSessions} onClick={onClick} onChange={onChange} /> }/>
          </Routes>

        </Router>
      </div>
    );
  }
}

export default App;
