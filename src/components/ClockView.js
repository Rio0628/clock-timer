import React from 'react';

const ClockView = () => {
    return (
        <div className='clockViewCntr'>
            <p className='clockViewHeading'>Clock</p>

            <p className='mainClock'>00:00:00 <span>am</span></p>

            <div className='timeZoneCntr'>
                <p className='indTimezone'>Eastern</p>
                <p className='indTimezone'>Central</p>
                <p className='indTimezone'>Pacific</p>
            </div>
        </div>
    );
}

export default ClockView;