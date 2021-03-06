import React from 'react';
import IndTimerSession from './IndTimerSession';

const TimerSSNSview = (props) => {
    let indSessionCntr = [];

    // Will show all of the ind sessions within the database
    if (props.sessions) {
        for (let i = 0; i < props.sessions.length; i++) {
            indSessionCntr.push( <IndTimerSession currentSession={props.currentSession} isSessionOpen={props.isSessionOpen} isSessionClosed={props.isSessionClosed} session={props.sessions[i]} onClick={props.onClick} key={'Session ' + i}/> )
        }
    }

    return (
        <div className='timerSsnsView'>
            <p className='timerSsnsHdng'>Saved Timer Sessions</p>

            <input className='searchbar' onChange={props.onChange} placeholder='Search Saved Session...'/> 

            <div className='timerSsnsCntr'>
                {indSessionCntr}
            </div>

        </div>
    );
}

export default TimerSSNSview;