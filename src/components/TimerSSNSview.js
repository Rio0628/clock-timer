import React from 'react';
import IndTimerSession from './IndTimerSession';

const TimerSSNSview = (props) => {
    return (
        <div className='timerSsnsView'>
            <p className='timerSsnsHdng'>Saved Timer Sessions</p>

            <input className='searchbar' onChange={props.onChange} placeholder='Search Saved Session...'/> 

            <div className='timerSsnsCntr'>
                <IndTimerSession />
            </div>

        </div>
    );
}

export default TimerSSNSview;