import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@mui/material";
import Draggable from "react-draggable";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as CSS from "./css.js";
import { useDispatch, useSelector } from "react-redux";
import * as REDUX from "../Redux/Reducers/LiveRoom/LiveRoomSlice.js";
import * as SOCKETREDUX from "../Redux/Reducers/Socket/SocketSlice.js";

// socket.io
import { selectRoomId } from "../Redux/Reducers/Socket/SocketSlice.js";
import { socket } from "../SocketClient/index.js";

// for firebase details of the user
import { auth } from "../Auth/Firebase/index.js";

const LiveRoomButton = () => {
	const dispatch = useDispatch();
	//console.log(user.uid);
	const showBackdrop = useSelector(REDUX.selectBackdropState);
	// for draggable
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
				socket.emit("send_user_liveroombutton_positions", {
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
			"receive_other_users_liveroombutton_positions",
			(settingsLastPosition) => {
				updatePosition(settingsLastPosition);
			}
		);
		socket.on("receive_room_message", (data) => {
			if (data.success !== null && data.success === true) {
				dispatch(REDUX.toggleBackdrop());
			}
		});
	}, [socket]);
	// // ----------------------------------------------Code for socket.io---------------------------------------------------------------------------
	return (
		<Fragment>
			<Draggable
				axis="both"
				handle="#LiveRoomButton"
				positionOffset={{
					x: 0,
					y: 0,
				}}
				position={currentPosition}
				defaultClassName="draggableLiveRoomButton"
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
					id="LiveRoomButtonContainer"
					style={{ ...CSS.LiveRoomButtonContainerStyle }}
				>
					<Button
						id="LiveRoomButton"
						variant="contained"
						onClick={(event) => {
							//sendMessage();
							//handleToggle();
							dispatch(REDUX.toggleBackdrop());
						}}
						onTouchEnd={() => {
							if (!isDragging) {
								dispatch(REDUX.toggleBackdrop());
							}
						}}
						disabled={isDragging}
						sx={{
							"&.MuiButton-root.Mui-disabled": {
								backgroundColor: "white",
							},
							"&.MuiButton-root:hover": {
								backgroundColor: "white",
							},
							color: "black",
							backgroundColor: "white",
						}}
					>
						Live Room
					</Button>
				</div>
			</Draggable>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={showBackdrop}
				//onClick={() => dispatch(REDUX.toggleBackdrop())}
			>
				<div
					id="RoomPopUpContainer"
					style={{ ...CSS.RoomPopUpContainerStyle }}
				>
					<IconButton
						sx={{ ...CSS.MinimizeButtonStyle }}
						onClick={() => dispatch(REDUX.toggleBackdrop())}
					>
						<CloseIcon fontSize="medium" />
					</IconButton>
					<JoinOthersContainer />
					<InviteOthersContainer />
					<SubmitButton />
				</div>
			</Backdrop>
		</Fragment>
	);
};
const SubmitButton = () => {
	const isJoinOthersSelected = useSelector(REDUX.selectShowJoinOthersInput);
	const isInviteOthersSelected = useSelector(REDUX.selectInviteOthersInput);
	const JoinOthersRoomId = useSelector(REDUX.selectJoinOthersInput);
	const InviteOthersRoomId = useSelector(REDUX.selectInviteOthersInput);
	const JoinOthersPassword = useSelector(REDUX.selectJoinOthersPassword);
	const InviteOthersPassword = useSelector(REDUX.selectInviteOthersPassword);
	const dispatch = useDispatch();
	return (
		<Button
			variant="outlined"
			sx={{ ...CSS.StartButtonStyle }}
			onClick={() => {
				if (isJoinOthersSelected) {
					dispatch(
						SOCKETREDUX.joinRoom({
							roomId: JoinOthersRoomId,
							password: JoinOthersPassword,
							// pass user data too
							user: {
								userId: auth.currentUser.uid,
								userAvatar: auth.currentUser.photoURL,
								userName: auth.currentUser.displayName,
							},
						})
					);
				} else if (isInviteOthersSelected) {
					// fix this in the future
					dispatch(
						SOCKETREDUX.createRoom({
							roomId: InviteOthersRoomId,
							password: InviteOthersPassword,
							// need to pass the user's data here too
							user: {
								userId: auth.currentUser.uid,
								userAvatar: auth.currentUser.photoURL,
								userName: auth.currentUser.displayName,
							},
						})
					);
				} else {
					// show error in the future
				}
			}}
		>
			Start
		</Button>
	);
};
const JoinOthersContainer = () => {
	const dispatch = useDispatch();
	const value = useSelector(REDUX.selectJoinOthersInput);
	const passwordValue = useSelector(REDUX.selectJoinOthersPassword);
	const isDisabled = useSelector(REDUX.selectShowJoinOthersInput);
	return (
		<div
			id="JoinOthersContainer"
			style={{ ...CSS.JoinOthersContainerStyle }}
		>
			<p id="JoinOthersHeading" style={{ ...CSS.JoinOthersHeadingStyle }}>
				{JoinOthersHeading}
			</p>
			<p className="RoomName" style={{ ...CSS.RoomNameStyle }}>
				Room Name
			</p>
			<TextField
				sx={{ ...CSS.RoomInputStyle }}
				size="small"
				value={value}
				onChange={(event) => {
					if (event.target.value !== "") {
						dispatch(REDUX.blockInput("InviteOthers"));
					}
					if (event.target.value == "") {
						dispatch(REDUX.unblockInput("InviteOthers"));
					}
					dispatch(REDUX.updateJoinOthersInput(event.target.value));
				}}
				disabled={!isDisabled}
			/>
			<p
				className="liveRoomPassword"
				style={{ ...CSS.RoomNameStyle, marginTop: "10px" }}
			>
				Password
			</p>
			<TextField
				sx={{ ...CSS.RoomInputStyle }}
				size="small"
				value={passwordValue}
				onChange={(event) => {
					if (event.target.value !== "") {
						dispatch(REDUX.blockInput("InviteOthers"));
					}
					if (event.target.value == "") {
						dispatch(REDUX.unblockInput("InviteOthers"));
					}
					dispatch(
						REDUX.updateJoinOthersPassword(event.target.value)
					);
				}}
				disabled={!isDisabled}
			/>
		</div>
	);
};

const InviteOthersContainer = () => {
	const [label, updateLabel] = useState("Lock Room");
	const toggleLabel = () => {
		if (label === "Lock Room") {
			updateLabel("Unlock Room");
		} else {
			updateLabel("Lock Room");
		}
	};
	const dispatch = useDispatch();
	const value = useSelector(REDUX.selectInviteOthersInput);
	const passwordValue = useSelector(REDUX.selectInviteOthersPassword);
	const isDisabled = useSelector(REDUX.selectShowInviteOthersInput);
	return (
		<div
			id="InviteOthersContainer"
			style={{ ...CSS.InviteOthersContainerStyle }}
		>
			<p
				id="InviteOthersHeading"
				style={{ ...CSS.InviteOthersHeadingStyle }}
			>
				Invite Others
			</p>
			<p className="RoomName" style={{ ...CSS.RoomNameStyle }}>
				Room Name
			</p>
			<TextField
				sx={{ ...CSS.RoomInputStyle }}
				size="small"
				value={value}
				onChange={(event) => {
					if (event.target.value !== "") {
						dispatch(REDUX.blockInput("JoinOthers"));
					}
					if (event.target.value == "") {
						dispatch(REDUX.unblockInput("JoinOthers"));
					}
					dispatch(REDUX.updateInviteOthersInput(event.target.value));
				}}
				disabled={!isDisabled}
			/>
			<p
				className="liveRoomPassword"
				style={{ ...CSS.RoomNameStyle, marginTop: "10px" }}
			>
				Password
			</p>
			<TextField
				sx={{ ...CSS.RoomInputStyle }}
				size="small"
				value={passwordValue}
				onChange={(event) => {
					if (event.target.value !== "") {
						dispatch(REDUX.blockInput("JoinOthers"));
					}
					if (event.target.value == "") {
						dispatch(REDUX.unblockInput("JoinOthers"));
					}
					dispatch(
						REDUX.updateInviteOthersPassword(event.target.value)
					);
				}}
				disabled={!isDisabled}
			/>
		</div>
	);
};
const JoinOthersHeading = "Join Others";
export default LiveRoomButton;
