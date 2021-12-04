import React from 'react';

const ClockView = (props) => {
    return (
        <div className='clockViewCntr'>
            <p className='clockViewHeading'>Clock</p>

            <p className='mainClock'>00:00:00 <span>am</span></p>

            <div className='timeZoneCntr'>
                <p className='indTimezone' onClick={props.onClick}>Eastern</p>
                <p className='indTimezone' onClick={props.onClick}>Central</p>
                <p className='indTimezone' onClick={props.onClick}>Pacific</p>
            </div>
        </div>
    );
}

export default ClockView;