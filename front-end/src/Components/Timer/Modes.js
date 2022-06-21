import React from 'react';
import Popup from './Popup';

// Styles 
import './Modes.css';

const Modes = ({pomodoroChange, breakChange, isModesOpen, buttonClick}) => {
    return {isModesOpen} ? (
        <Popup trigger= {isModesOpen} buttonClick= {buttonClick} >
            <div className='Modes-div'>
                <main className='Modes-main'>
                    <header className='modes-header'>
                        <h2>Settings</h2>
                    </header>
                    <section>
                        <span >
                            <p>TIME (MINUTES)</p>
                            <div className='modes-time-container'>
                                <div className= 'modes-time'>
                                    <h5>Pomodoro</h5>
                                    <input 
                                        type="number" 
                                        min="1" 
                                        max="60"
                                        onChange={pomodoroChange} 
                                    />
                                </div>
                                <div className= 'modes-time'>
                                    <h5>Break</h5>
                                    <input 
                                        type="number" 
                                        min="0" 
                                        max="60" 
                                        step="1" 
                                        onChange={breakChange}
                                    />
                                </div>
                            </div>
                        </span>
                        <button 
                            onClick={() => console.log('Applied')}
                            className ="modes-applyButton"
                        >Apply</button>
                    </section>
                </main>
            </div>
        </Popup>
        ):'';
    }
    
    export default Modes;