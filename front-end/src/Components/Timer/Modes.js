import React from 'react';
import iconClose from './assets/icon-close.svg';
import arrowUp from './assets/icon-arrow-up.svg';
import arrowDown from './assets/icon-arrow-down.svg';


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
                        <div>
                            <div>
                                <h5>Pomodoro</h5>
                                <input type="number" min="1" max="60" readOnly />
                                <div>
                                    <img src={arrowUp} alt="arrow-up" onClick={() => console.log('add one')} />
                                    <img src={arrowDown} alt="arrow-down" onClick={() => console.log('minus one')} />
                                </div>
                            </div>
                            <div>
                                <h5>Short break</h5>
                                <input type="number" min="1" max="99" step="1" readOnly />
                                <div>
                                    <img src={arrowUp} alt="arrow-up" onClick={() => console.log('add one')} />
                                    <img src={arrowDown} alt="arrow-down" onClick={() => console.log('minus one')} />
                                </div>
                            </div>
                            <div>
                                <h5>Long break</h5>
                                <input type="number" min="1" max="99" step="1" readOnly />
                                <div>
                                    <img src={arrowUp} alt="arrow-up" onClick={() => console.log('add one')} />
                                    <img src={arrowDown} alt="arrow-down" onClick={() => console.log('minus one')} />
                                </div>
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