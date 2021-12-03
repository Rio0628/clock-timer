import React from 'react';

const IndTimerSession = () => {
    return (
        <div className='indTimerSession'>
            <div className='timerSessionCls'>
                <div className='name-rmvBtnCntr'>
                    <p className='nameOfSession'>Session Name</p>
                    <div className='removeSessionBtn'>Remove</div>
                </div>

                <div className='intervalsCntrCls'>
                    <p className='intervalTime'>00:00 mins</p>
                    <p className='intervalTime'>00:00 mins</p>
                </div>
            </div>

            <div className='timerSessionOpen'>
                <div className='name-rmvBtnCntr'>
                    <p className='nameOfSessionOpen'>Session Name</p>
                    <div className='removeSessionBtn'>Remove</div>
                </div>

                <p className='descriptionSession'>This is a simple description of the session.</p>

                <div className='intervalsCntrOpen'>
                    <div className='indInterval'>
                        <p className='sessionInterval'>Interval 1</p>
                        <p className='intervalTimeOpen'>00:00 mins</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndTimerSession;