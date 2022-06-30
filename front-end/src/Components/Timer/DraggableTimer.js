import React, { Fragment,useEffect } from 'react';

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

// socket.io
import { selectRoomId } from "../Redux/Reducers/Socket/SocketSlice.js";
import { socket } from "../SocketClient/index.js";

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
         // ----------------------------------------------Code for socket.io---------------------------------------------------------------------------
        const [isDragging, updateDraggingStatus] = React.useState(false);
        const eventControl = (event, data) => {
            if (event.type === "mousedown" || event.type === "touchstart") {
                // do nothing
            }
            if (event.type === "mouseup" || event.type === "touchend") {
                // setTimeout so that user can click it after drag :p
                setTimeout(() => {
                    updateDraggingStatus(false);
                }, 100);
            }
            if (event.type === "mousemove" || event.type === "touchmove") {
                updateDraggingStatus(true);
                updatePosition({
                    x: data.x,
                    y: data.y,
                });
                //also update positions for other users!
                if (selectRoomId !== null) {
                    socket.emit("send_user_pomodoro_positions", {
                        position: currentPosition,
                        roomId: roomId,
                    });
                }
            }
        };
        const [currentPosition, updatePosition] = React.useState({
            x: 0,
            y: 0,
        });
        const roomId = useSelector(selectRoomId);
        useEffect(() => {
            // change code here for other components!
            socket.on(
                "receive_other_users_pomodoro_positions",
                (settingsLastPosition) => {
                    updatePosition(settingsLastPosition);
                }
            );
        }, [socket]);
        // ------------------------------------------------------------------------------------------------------------------------------

        return (
            <Draggable
                axis="both"
                handle=".timerHandle"
                position={currentPosition}
                defaultClassName="draggableTimer"
                scale={1}
                onStart={(event, data) => {
                    eventControl(event, data);
                }}
                onStop={(event, data) => {
                    eventControl(event, data);
                }}
                onDrag={(event, data) => {
                    eventControl(event, data);
                }}
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