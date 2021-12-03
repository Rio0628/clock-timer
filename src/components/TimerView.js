import React from 'react';

const TimerView = () => {
    let hoursCntr = [], minutesCntr = [], secondsCntr = [];

    for (let i = 1; i <= 24; i++) {
        hoursCntr.push( <option>{i}</option>)
    }

    for (let i = 1; i <= 60; i++) {
        minutesCntr.push( <option>{i}</option>)
    }

    for (let i = 1; i <= 60; i++) {
        secondsCntr.push( <option>{i}</option>)
    }

    return (
        <div className='timerCntr'>
            <p className='timerCntrHdng'>Timer</p>
        
            <div className='saveBtn'>Save Session</div>

            {/* <div className='saveSessionCntr'>
                <input className='sessionNameInput'/>
                <div className='saveSessionBtn'>Save</div>
            </div> */}

            <p className='mainTimer'>00:00:00</p>

            {/* <div className='inputTimer'>
                <select className='inputHours'>{hoursCntr}</select>
                <select className='inputMinutes'>{minutesCntr}</select>
                <select className='inputSeconds'>{secondsCntr}</select>
            </div> */}

            <div className='timerBtnsCntr'>
                <div className='cancelBtn'>Cancel</div>
                <div className='startPauseBtn'>Start</div>
            </div>

            <div className='crntTimersCntr'>
                <div className='indTimer'>20:20 min<p id='removeTimerBtn'>X</p></div>
            </div>
        </div>
    );
}

export default TimerView;