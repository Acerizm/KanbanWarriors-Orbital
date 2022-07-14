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
	const [webcamUsers, updateWebcamUsers] = React.useState([
		{
			socketId: socket.id,
			x: 0,
			y: 0,
		},
	]);
	const updateCurrentUserPosition = (userId, x, y) => {
		const newState = webcamUsers.map((user) => {
			if (user.socketId === userId) {
				return { ...user, x: x, y: y };
			}
			return user;
		});
		updateWebcamUsers(newState);
	};
	const roomId = useSelector(selectRoomId);
	const eventControl = (event, data, userId) => {
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
			updateCurrentUserPosition(userId, data.x, data.y);
			//also update positions for other users!
			if (selectRoomId !== null) {
				socket.emit("send_user_webcam_positions", {
					//position: currentPosition,
					webcamUsers: webcamUsers,
					roomId: roomId,
				});
			}
		}
	};
	let draggableWebcam = webcamUsers.map((user) => {
		let userId = "DraggableWebCamera-" + user.socketId;
		let handleId = "#" + userId;
		return (
			<Draggable
				key={user.socketId}
				axis="both"
				handle={handleId}
				position={{
					x: user.x,
					y: user.y,
				}}
				//defaultClassName="draggableWebCamera"
				scale={1}
				onStart={(event, data) => {
					eventControl(event, data, user.socketId);
				}}
				onStop={(event, data) => {
					eventControl(event, data, user.socketId);
				}}
				onDrag={(event, data) => {
					eventControl(event, data, user.socketId);
				}}
			>
				<div
					id={userId}
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
	});
	useEffect(() => {
		// change code here for other components!
		socket.on(
			"receive_other_users_webcam_positions",
			(updatedWebcamUsers) => {
				// check if you are inside the array
				webcamUsers.map((user) => {});
				let checkCurrentUserInside = updatedWebcamUsers.map((user) => {
					if (user.socketId === socket.id) {
						return true;
					}
				});
				if (checkCurrentUserInside) {
					updateWebcamUsers(updatedWebcamUsers);
				} else {
					// when the user is not inside
					// need to add the current user into the array
					let newWebCamUsers = updatedWebcamUsers;
					//newWebCamUsers
				}
			}
		);
		//socket.on("receive_other_users_clock_color", (textColor) => {});
	}, [socket]);
	// ------------------------------------------------------------------------------------------------------------------------------
	return <Fragment>{draggableWebcam}</Fragment>;
};

export default WebCam;
