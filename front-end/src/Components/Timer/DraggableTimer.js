import React, { Fragment } from 'react';

// Redux
import { useSelector } from 'react-redux';
import { getModesOpen,getTimerState } from '../Redux/Reducers/PomodoroTimer/PomodoroTimerSlice';

// Components
import Settings from './Settings';
import Modes from './Modes';
import CountDownClock from './CountDownClock';
import Draggable from 'react-draggable';

// styles
import './DraggableTimer.css'

const DraggableTimer = () => {
    
    const timerClicked = useSelector(getTimerState);
    const mod = useSelector(getModesOpen);

    const DisplayedTimer = () => {
        return (
            <Fragment>
             {
                mod ? <div className='timer timerHandle'>
                <Modes/>
            </div> :
            <div className='timer timerHandle'>
                <Settings/>
                <CountDownClock/>
            </div>
            
             }
               </Fragment>
        )
    }

    const DraggableDisplayedTimer = () => {
        return (
            <Draggable
                axis="both"
                handle=".timerHandle"
                position={null}
                defaultClassName="draggableTimer"
                scale={1}
                >
                <div>
                    <DisplayedTimer/>
                </div>
            </Draggable>
        )
    }

    // you can only return a react component 
    // any JS variable must be declared in JSX {} tag after return
    return  (
        <Fragment>
            {
                timerClicked ? <DraggableDisplayedTimer/> : null
            }
        </Fragment>
    ) ;
}

export default DraggableTimer;