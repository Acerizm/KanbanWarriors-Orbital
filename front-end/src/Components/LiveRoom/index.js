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

const socket = io.connect("http://localhost:4000");

const LiveRoomPage = () => {
	// useEffect(() => {
	// 	socket.on("receive_message", (data) => {
	// 		alert(data.message);
	// 	});
	// }, [socket]);
	const sendMessage = () => {
		socket.emit("send_message", { message: "Hello" });
	};
	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};
	const isJoinOthersSelected = useSelector(REDUX.selectShowJoinOthersInput);
	return (
		<div>
			<Draggable>
				<Button
					variant="contained"
					onClick={() => {
						//sendMessage();
						handleToggle();
					}}
				>
					Test Socket IO
				</Button>
			</Draggable>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={open}
				//onClick={handleClose}
			>
				<div
					id="RoomPopUpContainer"
					style={{ ...CSS.RoomPopUpContainerStyle }}
				>
					<JoinOthersContainer />
					<InviteOthersContainer />
					<Button
						variant="outlined"
						sx={{ ...CSS.StartButtonStyle }}
						onClick
					>
						Start
					</Button>
				</div>
			</Backdrop>
		</div>
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
export default LiveRoomPage;
