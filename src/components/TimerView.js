import React from 'react';

const TimerView = (props) => {
    let hoursCntr = [], minutesCntr = [], secondsCntr = [];

    for (let i = 0; i <= 24; i++) {
        hoursCntr.push( <option key={i}>{i}</option>)
    }

    for (let i = 0; i <= 60; i++) {
        minutesCntr.push( <option key={i}>{i}</option>)
    }

    for (let i = 0; i <= 60; i++) {
        secondsCntr.push( <option key={i}>{i}</option>)
    }

    return (
        <div className='timerCntr'>
            <p className='timerCntrHdng'>Timer</p>
        
            {/* <div className='saveBtn'>Save Session</div> */}

            <div className='saveSessionCntr'>
                <input className='sessionNameInput' placeholder='Session Name' onChange={props.onChange}/>
                <div className='saveSessionBtn' onClick={props.onClick}>Save</div>
            </div>

            {/* <p className='mainTimer'>00:00:00</p> */}

            <div className='inputTimer'>
                <select className='inputHours' onChange={props.onChange}>{hoursCntr}</select>
                <p>hrs</p>
                <select className='inputMinutes' onChange={props.onChange}>{minutesCntr}</select>
                <p>mins</p>
                <select className='inputSeconds' onChange={props.onChange}>{secondsCntr}</select>
                <p>sec</p>
            </div>

            <div className='timerBtnsCntr'>
                <div className='cancelBtn' onClick={props.onClick}>Cancel</div>
                <div className='startPauseBtn' onClick={props.onClick}>Start</div>
            </div>
 
            <div className='crntTimersCntr'>
                <div className='indTimer'>20:20 min<p id='removeTimerBtn' onClick={props.onClick}>X</p></div>
            </div>
        </div>
    );
}

export default TimerView;