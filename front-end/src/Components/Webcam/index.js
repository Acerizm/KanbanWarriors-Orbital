import React, { Fragment, useEffect } from "react";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import Draggable from "react-draggable";
import { socket } from "../SocketClient";
import { useSelector } from "react-redux";
import { selectRoomId } from "../Redux/Reducers/Socket/SocketSlice";

const videoConstraints = {
	width: 200,
	height: 200,
	facingMode: "user",
};

const WebcamComponent = () => {
	//const [isPlaying, toggleWebCam] = React.useState(false);
	const webCamRef = React.useRef(null);
	const [buttonText, setButtonText] = React.useState("Play");
	const toggleVideo = () => {
		if (buttonText == "Pause") {
			setButtonText("Play");
			webCamRef.current.video.pause();
		} else {
			setButtonText("Pause");
			webCamRef.current.video.play();
		}
	};
	return (
		<Fragment>
			<Webcam
				ref={webCamRef}
				audio={false}
				style={{
					zIndex: "10",
					borderRadius: "10px",
					border: "2px solid black",
				}}
				videoConstraints={videoConstraints}
				id="Webcam"
				autoPlay={false}
			></Webcam>
			<Button
				variant="outlined"
				sx={{ width: "100%" }}
				onClick={() => toggleVideo()}
			>
				{buttonText}
			</Button>
		</Fragment>
	);
};

// this is the draggable WebCam
// Purpose: to isolate the states and prevent react from re-rendering the components that are not supposed to re-render
const WebCam = () => {
	// ----------------------------------------------Code for socket.io---------------------------------------------------------------------------
	const [isDragging, updateDraggingStatus] = React.useState(false);
	const [currentPosition, updatePosition] = React.useState({
		x: 0,
		y: 0,
	});
	const roomId = useSelector(selectRoomId);
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
				socket.emit("send_user_webcam_positions", {
					position: currentPosition,
					roomId: roomId,
				});
			}
		}
	};
	useEffect(() => {
		// change code here for other components!
		// socket.on(
		// 	"receive_other_users_clock_positions",
		// 	(settingsLastPosition) => {
		// 		updatePosition(settingsLastPosition);
		// 	}
		// );
		//socket.on("receive_other_users_clock_color", (textColor) => {});
	}, [socket]);
	// ------------------------------------------------------------------------------------------------------------------------------
	return (
		<Draggable
			axis="both"
			handle="#DraggableWebCamera"
			position={currentPosition}
			defaultClassName="draggableWebCamera"
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
			{/* <WebcamComponent /> */}
			<div
				id="DraggableWebCamera"
				style={{
					gridRow: "1 / 2",
					gridColumn: "1 / 1",
					height: "200px",
					width: "200px",
					//border: "2px solid red",
				}}
			>
				<WebcamComponent />
			</div>
		</Draggable>
	);
};

export default WebCam;
