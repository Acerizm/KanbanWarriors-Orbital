import React, { useEffect, useState } from 'react';

// Components
import Settings from './Settings';
import Modes from './Modes';
import CountDownClock from './CountDownClock';
import Buttons from './Buttons';

// styles
import './DraggableTimer.css'

function DraggableTimer() {
    const [pomodoroTime, setPomodoroTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [ModesOpen, setModeOpen] = useState(false);

    const onSettingsButtonClicked = ()=> {
        setModeOpen(ModesOpen? false: true);
        console.log("clicked setting");
    }

    const onCloseButtonClicked = () => {
        setModeOpen(false);
    }


    const OnPomodoroChange = (event) => {
        console.log("Pomodoro:", event.target.value)
        setPomodoroTime(event.target.value);
        console.log("pomodorotime:", pomodoroTime)
    }
    const OnBreakChange = (event) => {
        console.log("break:", event.target.value)
        setBreakTime(event.target.value);
    }

    const newPomodoroTime = pomodoroTime;
    const newBreakTime = breakTime;
    
    return (
        <div className='timer timerHandle'>
            <Settings 
                buttonClick = {onSettingsButtonClicked}
            />
            <Modes 
                pomodoroChange={OnPomodoroChange} 
                breakChange={OnBreakChange}
                isModesOpen = {ModesOpen}
                buttonClick = {onCloseButtonClicked}
            />
            <CountDownClock
                className = 'CountdownClockComponent' 
                pomodoroTime={newPomodoroTime} 
                breakTime={newBreakTime} 
            />
            <Buttons/>
        </div>
    )
}

export default DraggableTimer;