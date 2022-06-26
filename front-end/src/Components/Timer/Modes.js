import React from 'react';
import Popup from './Popup';
import { useSelector, useDispatch } from 'react-redux';
import { getPomodoroTime, getBreakTime, changeBreakTime, changePomodoroTime, getModesOpen, toggleModesOpen } from '../Redux/Reducers/PomodoroTimer/PomodoroTimerSlice';

// Styles 
import './Modes.css';
import Button from '@mui/material/Button';

const Modes = () => {
    const dispatch = useDispatch();

    const pomodoroTime = useSelector(getPomodoroTime);
    const breakTime = useSelector(getBreakTime);
    const isModesOpen = useSelector(getModesOpen)

    const OnBreakChange = (event) => {
        dispatch(changeBreakTime({
            breakTime: event.target.value,
        }))
        
    }

    const OnPomodoroChange = (event) => {
        dispatch(changePomodoroTime({
            pomodoroTime: event.target.value
        }))
    }

    const buttonClick = ()=>{
        dispatch(toggleModesOpen());
    }

    return {isModesOpen} ? (
        <Popup trigger= {isModesOpen} >
            <main className='Modes-main'>
                <header className='modes-header'>
                    <h2 id="SettingsTitle">SETTINGS</h2>
                </header>
                <section className='Modes-section'>
                    <span className='Modes-middle-portion'>
                        <p id="TimeTitle">TIME (MINUTES)</p>
                        <div className='modes-time-container'>
                            <div className= 'modes-time'>
                                <h5 id="pomodoroTitle">Pomodoro</h5>
                                <input 
                                    className ="inputBoxes"
                                    type="number" 
                                    min="1" 
                                    max="60"
                                    onChange={(event) =>OnPomodoroChange(event)}
                                    value={pomodoroTime} 
                                />
                            </div>
                            <div className= 'modes-time'>
                                <h5 id="breakTitle" >Break</h5>
                                <input
                                    className ="inputBoxes"
                                    type="number" 
                                    min="0" 
                                    max="60" 
                                    step="1" 
                                    onChange={(event)=>OnBreakChange(event)}
                                    value = {breakTime}
                                />
                            </div>
                        </div>
                    </span>
                    <Button 
                        variant="contained"
                        onClick={() =>buttonClick()}
                        size='small'
                        className ="modes-applyButton"
                        >Apply</Button>
                </section>
            </main>
        </Popup>
        ):'';
    }
    
    export default Modes;