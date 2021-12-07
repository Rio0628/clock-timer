import React from 'react';

const TimerView = (props) => {
    let hoursCntr = [], minutesCntr = [], secondsCntr = [], intervalsCntr = [];

    // For functions to populate the select elements to allow the user to choose time 
    for (let i = 0; i <= 24; i++) {
        hoursCntr.push( <option key={i}>{i}</option>)
    }
    for (let i = 0; i <= 60; i++) {
        minutesCntr.push( <option key={i}>{i}</option>)
    }
    for (let i = 0; i <= 60; i++) {
        secondsCntr.push( <option key={i}>{i}</option>)
    }

    // Function to show the current intervals that have been completed
    for (let i = 0; i < props.intervals.length; i++) {
        intervalsCntr.push( <div className='indTimer' key={'Interval ' + i}>{props.intervals[i].time}<p id='removeTimerBtn' interval={props.intervals[i].interval} onClick={props.onClick}>X</p></div> );
    }

    return (
        <div className='timerCntr'>
            <p className='timerCntrHdng'>Timer</p>
        
            {props.isSaveOn ?
               <div className='saveSessionCntr'>
                    <input className='sessionNameInput' placeholder='Session Name' onChange={props.onChange}/>
                    <div className='saveSessionBtn' onClick={props.onClick}>Save</div>
                </div>
            : <div className='saveBtn' onClick={props.onClick}>Save Session</div> }
            
            {props.isSaveOn ? <input className='descriptionInput' placeholder='Session Description' onChange={props.onChange}></input> : null }

            { props.timerInUse ?
                <p className='mainTimer'>{props.timerValue}</p> 
            :
                <div className='inputTimer'>
                    <select className='inputHours' onChange={props.onChange}>{hoursCntr}</select>
                    <p>hrs</p>
                    <select className='inputMinutes' onChange={props.onChange}>{minutesCntr}</select>
                    <p>mins</p>
                    <select className='inputSeconds' onChange={props.onChange}>{secondsCntr}</select>
                    <p>sec</p>
                </div>
            }           

            <div className='timerBtnsCntr'>
                <div className='cancelBtn' onClick={props.onClick}>Cancel</div>
                <div className='startPauseBtn' current={props.statusBtn} onClick={props.onClick}>{ props.statusBtn === 'start' ? 'Start' : props.statusBtn === 'pause' ? 'Pause' : null }</div>
            </div>
 
            <div className='crntTimersCntr'>
                {intervalsCntr}
            </div>
        </div>
    );
}

export default TimerView;