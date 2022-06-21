import React, {useEffect, useState} from 'react';

const CountDownClock = ({pomodoroTime, breakTime}) => {
    const [timerSeconds, setTimerSeconds] = useState(pomodoroTime * 60);
    const [displayMessage, setDisplayMessage] = useState(false)
    
    let displayedTimerMin = Math.floor(timerSeconds / 60);
    let displayedTimerSec = timerSeconds % 60;

    displayedTimerMin = displayedTimerMin < 10 ? `0${displayedTimerMin}` : displayedTimerMin;
    displayedTimerSec = displayedTimerSec < 10 ? `0${displayedTimerSec}` : displayedTimerSec;

    useEffect(() => {
        let interval = setInterval(()=> {
            clearInterval(interval);
            if ( timerSeconds === 0) {
                let minutes = displayMessage ? pomodoroTime : breakTime;
                
                setTimerSeconds(minutes * 60);
                setDisplayMessage(!displayMessage);
            } else {
                setTimerSeconds(timerSeconds => timerSeconds - 1)
            }
        },1000)
    }, [timerSeconds]);

    return (
        <div>
            <div>
                {displayMessage && <div>Break time! New session starts in:</div>}
            </div>
            <div>
                {displayedTimerMin}:{displayedTimerSec}
            </div>
        </div>
    );
}


export default CountDownClock;