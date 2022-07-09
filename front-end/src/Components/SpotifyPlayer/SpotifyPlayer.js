import React,{ useEffect } from 'react';

// Components
import Draggable from "react-draggable";
import Dashboard from './Dashboard';
import Login from './Login';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getPlayerState, displayMusicPlayerOn } from '../Redux/Reducers/SpotifyPlayer/SpotifyPlayerSlice';


// socket.io
import { selectRoomId } from "../Redux/Reducers/Socket/SocketSlice.js";
import { socket } from "../SocketClient/index.js";


const code = new URLSearchParams(window.location.search).get('code')

const DisplayedComponent = () => {
	const dispatch = useDispatch();
	if (code) {
		dispatch(displayMusicPlayerOn())
	}
    return code ? 
        <Dashboard code = {code}/> : <Login/>
}

const InitialPlayer = () => {
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
				socket.emit("send_user_spotify_positions", {
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
			"receive_other_users_spotify_positions",
			(settingsLastPosition) => {
				updatePosition(settingsLastPosition);
			}
		);
	}, [socket]);
    return(
        <Draggable
            axis="both"
            handle=".playerHandle"
            position={currentPosition}
			defaultClassName="draggablePlayer"
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
            <div className="playerHandle" style={{ padding: "10px", color: "pink"}}>
                <DisplayedComponent/>
            </div>
        </Draggable>
    )
}

const SpotifyPlayer = () => {
    const playerClicked = useSelector(getPlayerState);
    return(
        <React.Fragment>{playerClicked ? <InitialPlayer /> : null}</React.Fragment>
    )
}

export default SpotifyPlayer;