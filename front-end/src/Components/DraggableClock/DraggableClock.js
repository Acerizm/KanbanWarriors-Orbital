import React, { useEffect, useState } from "react";
import "./DraggableClock.css";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from "react-redux";

// socket.io
import { selectRoomId } from "../Redux/Reducers/Socket/SocketSlice.js";
import { socket } from "../SocketClient/index.js";

function DraggableClock() {
	const [clockState, setClockState] = useState();
	const [textColor, setTextColor] = useState("black");

	const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
	const handleChangeTextColor = (e) => {
		setTextColor(randomColor);
		// added additional code here for socket.io
		socket.emit("send_user_clock_color", {
			color: randomColor,
			roomId: roomId,
		});
	};

	useEffect(() => {
		setInterval(() => {
			const date = new Date();
			setClockState(date.toLocaleTimeString());
		}, 1000);
	}, []);
	// ----------------------------------------------Code for socket.io---------------------------------------------------------------------------
	const [isDragging, updateDraggingStatus] = React.useState(false);
	const eventControl = (event, data) => {
		if (event.type === "mousedown" || event.type === "touchmove") {
			// do nothing
		}
		if (event.type === "mouseup" || event.type === "touchend") {
			// setTimeout so that user can click it after drag :p
			setTimeout(() => {
				updateDraggingStatus(false);
			}, 100);
		}
		if (event.type === "mousemove") {
			updateDraggingStatus(true);
			updatePosition({
				x: data.x,
				y: data.y,
			});
			//also update positions for other users!
			if (selectRoomId !== null) {
				socket.emit("send_user_clock_positions", {
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
			"receive_other_users_clock_positions",
			(settingsLastPosition) => {
				updatePosition(settingsLastPosition);
			}
		);
		socket.on("receive_other_users_clock_color", (textColor) => {
			setTextColor(textColor);
		});
	}, [socket]);
	// ------------------------------------------------------------------------------------------------------------------------------
	return (
		<Draggable
			axis="both"
			handle=".clockHandle"
			position={currentPosition}
			defaultClassName="draggableClock"
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
			<div
				className="clock clockHandle"
				onClick={() => {
					if (!isDragging) {
						handleChangeTextColor();
					}
				}}
				style={{ color: textColor }}
			>
				{clockState}
			</div>
		</Draggable>
	);
}

export default DraggableClock;
