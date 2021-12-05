import React from 'react';

const IndTimerSession = (props) => {
    let intervalIsOpen = false, previewIntervals = [], allIntervals = [];

    if (props.session.intervals.length === 1) {
        previewIntervals.push( <p className='intervalTime' key={'interval Time '}>{props.session.intervals[0] + " mins"}</p> )
    }
    else {
        for (let i = 0; i < 2; i++) {
            previewIntervals.push( <p className='intervalTime' key={'interval Time ' + i}>{props.session.intervals[i] + " mins"}</p> )
        }
    } 

    return (
        <div className='indTimerSession'>
            { !intervalIsOpen ?
                <div className='timerSessionCls' session={props.session._id} onClick={props.onClick}>
                    <div className='name-rmvBtnCntr'>
                        <p className='nameOfSession'>{props.session.name}</p>
                        <div className='removeSessionBtn' session={props.session._id}>Remove</div>
                    </div>

                    <div className='intervalsCntrCls'>
                        {previewIntervals}
                    </div>
                </div>
            : 
                <div className='timerSessionOpen' session={props.session._id} onClick={props.onClick}>
                    <div className='name-rmvBtnCntr'>
                        <p className='nameOfSessionOpen'>{props.session.name}</p>
                        <div className='removeSessionBtn' session={props.session._id}>Remove</div>
                    </div>

                    <p className='descriptionSession'>{props.session.description}</p>

                    <div className='intervalsCntrOpen'>
                      
                    </div>
                </div>
            }
        </div>
    );
}

export default IndTimerSession;