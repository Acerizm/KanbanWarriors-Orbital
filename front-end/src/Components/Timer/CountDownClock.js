import React, {useEffect, useState} from 'react';

const CountDownClock = () => {
    const [timerSeconds, setTimerSeconds] = useState(25 * 60);

    
    let displayedTimerMin = timerSeconds / 60;
    let displayedTimerSec = timerSeconds % 60;

    useEffect(() => {
        setInterval(()=> {
            setTimerSeconds(timerSeconds-1)
        },1000)
    }, [timerSeconds]);

    return (
        <div>
            {displayedTimerMin}:{displayedTimerSec}
        </div>
    );
}


export default CountDownClock;