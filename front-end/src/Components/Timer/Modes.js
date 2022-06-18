import React from 'react';
import iconClose from './assets/icon-close.svg';
import arrowUp from './assets/icon-arrow-up.svg';
import arrowDown from './assets/icon-arrow-down.svg';

// Styles 
import './Modes.css';

const Modes = () => {
    return (
        <div>
            <main>
                <header>
                    <h2>Settings</h2>
                    <img src={iconClose} onClick={() => console.log('closed modes')} alt="closing-icon" />
                </header>
        
                <section>
                    <div >
                        <p>TIME (MINUTES)</p>
                        <div className='modes-time-container'>
                            <div className= 'modes-time'>
                                <h5>Pomodoro</h5>
                                <input type="number" min="1" max="60" />
                            </div>
                            <br></br>
                            <div className= 'modes-time'>
                                <h5>Break</h5>
                                <input type="number" min="0" max="60" step="1" />
                            </div>
                        </div>
                    </div>
                    <button onClick={() => console.log('Applied')}>Apply</button>
                </section>
            </main>
        </div>
        );
    }
    
    export default Modes;