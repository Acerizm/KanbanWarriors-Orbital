import React, { Fragment, useEffect, useState } from "react";
import io from "socket.io-client";
import { Button } from "@mui/material";
import Draggable from "react-draggable";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as CSS from "./css.js";
import { useDispatch, useSelector } from "react-redux";
import * as REDUX from "../Redux/Reducers/LiveRoom/LiveRoomSlice.js";
import { toggleJoinRoomNotification } from "../Redux/Reducers/Notifications/NotificationsSlice.js";
import * as SOCKETREDUX from "../Redux/Reducers/Socket/SocketSlice.js";

const LiveRoomButton = () => {
	const dispatch = useDispatch();
	const showBackdrop = useSelector(REDUX.selectBackdropState);
	// for draggable
	const [isDragging, updateDraggingStatus] = React.useState(false);
	const eventControl = (event) => {
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
		}
	};
	return (
		<Fragment>
			<Draggable
				axis="both"
				handle="#LiveRoomButton"
				position={null}
				defaultClassName="draggableLiveRoomButton"
				scale={1}
				onStart={(event) => {
					eventControl(event);
				}}
				onStop={(event) => {
					eventControl(event);
				}}
				onDrag={(event) => {
					eventControl(event);
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
					<JoinOthersContainer />
					<InviteOthersContainer />
					<SubmitButton />
				</div>
			</Backdrop>
		</Fragment>
	);
};
const SubmitButton = () => {
	const joinRoom = (socket, roomId) => {
		socket.emit("join_room", roomId);
	};
	const createRoom = (socket, roomId) => {
		socket.emit("create_room", roomId);
	};
	const isJoinOthersSelected = useSelector(REDUX.selectShowJoinOthersInput);
	const isInviteOthersSelected = useSelector(REDUX.selectInviteOthersInput);
	const JoinOthersRoomId = useSelector(REDUX.selectJoinOthersInput);
	const InviteOthersRoomId = useSelector(REDUX.selectInviteOthersInput);
	const dispatch = useDispatch();
	return (
		<Button
			variant="outlined"
			sx={{ ...CSS.StartButtonStyle }}
			onClick={() => {
				if (isJoinOthersSelected) {
					dispatch(
						SOCKETREDUX.joinRoom({ roomId: JoinOthersRoomId })
					);
					dispatch(toggleJoinRoomNotification());
					dispatch(REDUX.toggleBackdrop());
				} else if (isInviteOthersSelected) {
					// fix this in the future
					dispatch(
						SOCKETREDUX.createRoom({ roomId: JoinOthersRoomId })
					);
					dispatch(toggleJoinRoomNotification());
					dispatch(REDUX.toggleBackdrop());
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
			<FormControlLabel
				control={<Switch defaultChecked />}
				label={label}
				sx={{ color: "black", width: "70%" }}
				onClick={() => toggleLabel()}
			/>
		</div>
	);
};
const JoinOthersHeading = "Join Others";
export default LiveRoomButton;
