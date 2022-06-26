import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { getPomodoroTime, getBreakTime } from '../Redux/Reducers/PomodoroTimer/PomodoroTimerSlice';

// styles
import './CountDownClock.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const CountDownClock = () => {
    
    const [displayMessage, setDisplayMessage] = useState(false)
    const [paused, setPaused] = useState(false);
    
    const pomodoroTime = useSelector(getPomodoroTime);
    const breakTime = useSelector(getBreakTime);
    const [timerSeconds, setTimerSeconds] = useState(pomodoroTime * 60);
    let displayedTimerMin = Math.floor(timerSeconds / 60);
    let displayedTimerSec = timerSeconds % 60;

    displayedTimerMin = displayedTimerMin < 10 ? `0${displayedTimerMin}` : displayedTimerMin;
    displayedTimerSec = displayedTimerSec < 10 ? `0${displayedTimerSec}` : displayedTimerSec;

    useEffect(() => {
        let interval = setInterval(()=> {
            clearInterval(interval);
            if (paused) {
                
            } else if ( timerSeconds === 0) {
                let minutes = displayMessage ? pomodoroTime : breakTime;
                
                setTimerSeconds(minutes * 60);
                setDisplayMessage(!displayMessage);
            } else {
                setTimerSeconds(timerSeconds => timerSeconds - 1)
            }
        },1000)
    }, [timerSeconds,paused]);

    return (
        <div className ='CountDownClock'>
            <div className='clockTime'>
                <div className='div-clock-text'>
                    {displayMessage && <div>Take a break!</div>}
                </div>
                <div className='div-clock-time'>
                    {displayedTimerMin}:{displayedTimerSec}
                </div>
            </div>
            <Box
                className='startEndbuttons'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                    m: 1,
                    },
                }}
            >
                <ButtonGroup fullWidth={true} variant="text" aria-label="text button group">
                    <Button
                        className='start-button sAndEButtons'
                        onClick={()=>setPaused(false)}>Start</Button>
                    <Button
                        className='end-button sAndEButtons'
                        onClick={()=>setPaused(true)}>Pause</Button>
                </ButtonGroup>
            </Box>
        </div>
    );
}


export default CountDownClock;