import React from 'react';

const ClockView = (props) => {

    console.log(props.timezone)
    const clickedTimezoneE = () => props.currentTimezone === 'America/New_York' ? ' clicked' : '' ;
    const clickedTimezoneC = () => props.currentTimezone === 'America/Denver' ? ' clicked' : '' ;
    const clickedTimezoneP = () => props.currentTimezone === 'America/Los_Angeles' ? ' clicked' : '' ;

    return (
        <div className='clockViewCntr'>
            <p className='clockViewHeading'>Clock</p>

            <p className='mainClock'>{props.clockTime}</p>

            <div className='timeZoneCntr'>
                <p className={'indTimezone' + clickedTimezoneE()} timezone='America/New_York' onClick={props.onClick}>Eastern</p>
                <p className={'indTimezone' + clickedTimezoneC()} timezone='America/Denver' onClick={props.onClick}>Central</p>
                <p className={'indTimezone' + clickedTimezoneP()}timezone='America/Los_Angeles'onClick={props.onClick}>Pacific</p>
            </div>
        </div>
    );
}

export default ClockView;