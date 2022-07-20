import ChatIcon from "@mui/icons-material/Chat";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Tooltip from "@mui/material/Tooltip";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import VideocamIcon from "@mui/icons-material/Videocam";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import Divider from "@mui/material/Divider";
import MicOffIcon from "@mui/icons-material/MicOff";
import HeadsetIcon from "@mui/icons-material/Headset";

// for signal
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

// for avatar
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

// for list
import { Virtuoso } from "react-virtuoso";

//for messages
import { socket } from "../../SocketClient/index.js";
import { selectRoomId } from "../../Redux/Reducers/Socket/SocketSlice.js";
import TextField from "@mui/material/TextField";
import {
	selectShowVideoSectionState,
	toggleVideoSection,
} from "../../Redux/Reducers/LiveRoom/LiveRoomSlice.js";

// for auth details
import { auth } from "../../Auth/Firebase/index.js";

// for chat box
import {
	DiscordMention,
	DiscordMessage,
	DiscordMessages,
} from "@danktuary/react-discord-message";
import "./index.css";

// for video section
import VideoSection from "../LiveVideo/index.js";

import * as REDUX from "../../Redux/Reducers/LiveChat/LiveChatSlice.js";
import { useDispatch, useSelector } from "react-redux";

export const LiveChatButton = () => {
	const dispatch = useDispatch();
	return (
		<Fragment>
			<Badge
				// update the badge content to show how many messages the user has not seen
				badgeContent={10}
				color="primary"
				sx={{
					gridRow: "1 / 2",
					gridColumn: "1 / 1",
					zIndex: "10",
					color: "white",
					position: "relative",
					top: "100px",
					left: "500px",
					height: "40px",
					width: "40px",
				}}
			>
				<ChatIcon
					//fontSize="small"
					sx={{
						fontSize: 40,
					}}
					//onClick={() => {}}
					onClick={() => dispatch(REDUX.toggleDrawer())}
				/>
			</Badge>
			<LiveChatDrawer />
		</Fragment>
	);
};

// Component for Drawer when user clicks the chat icon
// Will mimic basic features of discord/slack
const LiveChatDrawer = () => {
	//const [isDrawerOpen, setDrawerState] = React.useState(false);
	const dispatch = useDispatch();
	const isDrawerOpen = useSelector(REDUX.selectDrawerState);
	// function to toggle the drawer
	const toggleDrawer = (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		//setDrawerState(!isDrawerOpen);
		dispatch(REDUX.toggleDrawer());
	};
	return (
		<Fragment>
			<Drawer
				anchor="left"
				open={isDrawerOpen}
				onClose={(event) => toggleDrawer(event)}
			>
				<div
					style={{
						height: "100%",
						width: "100vw	",
						display: "grid",
						gridTemplateColumns: "250px calc(100% - 450px) 200px ",
						gridTemplateRows: "100%",
					}}
				>
					<Channels />
					{/* This section is for showing the user status like connection */}
					<UserDisplaySettings />
					<VideoSection />
					<ChatSection />
					<OnlineSection />
				</div>
			</Drawer>
		</Fragment>
	);
};

const Channels = () => {
	const dispatch = useDispatch();
	const isDrawerOpen = useSelector(REDUX.selectDrawerState);
	// function to toggle the drawer
	const toggleDrawer = (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		dispatch(REDUX.toggleDrawer());
	};
	const currentUsers = useSelector(REDUX.selectCurrentChannelUsers);
	const roomId = useSelector(selectRoomId);
	const toggleChannel = () => {
		// 1. let redux know about the user
		// 2. let other users know about the current user that join/left
		// 3. Redux on their client side will do the same magic
		dispatch(
			REDUX.toggleChannel({
				userName: auth.currentUser.displayName,
				userAvatar: auth.currentUser.photoURL,
				userId: auth.currentUser.uid,
			})
		);
		socket.emit("send_user_toggle_channel", {
			roomId: roomId,
			userName: auth.currentUser.displayName,
			userAvatar: auth.currentUser.photoURL,
			userId: auth.currentUser.uid,
		});
	};
	useEffect(() => {
		socket.on("receive_other_user_toggle_channel", (user) => {
			console.log(user);
			dispatch(REDUX.toggleChannel(user));
		});
	}, [socket]);
	return (
		<Box
			sx={{
				width: 250,
				height: "calc(100% - 150px)",
				//border: "2px solid black",
				backgroundColor: "#F2F3F5",
				gridColumn: "1 / 2",
				gridRow: "1 / 1",
				alignSelf: "start",
			}}
			role="presentation"
			//onClick={(event) => toggleDrawer(event)}
			//onKeyDown={(event) => toggleDrawer(event)}
		>
			<List sx={{ paddingBottom: 0 }}>
				{/* list item represents each item in the list vertically */}
				<ListItem sx={{ paddingBottom: 0 }}>
					<ListItemButton onClick={() => toggleChannel()}>
						<ListItemIcon>
							{/* Icon to be placed inside the item */}
							<VolumeUpIcon />
						</ListItemIcon>
						<ListItemText primary="General" />
						{/* Then if the user clicks, append the user to the list */}
					</ListItemButton>
				</ListItem>
				<List sx={{ pl: 4, paddingTop: 0 }}>
					{currentUsers.map((user, index) => {
						return (
							<ListItem sx={{ paddingTop: 0 }}>
								<ListItemButton>
									<ListItemIcon>
										<Avatar src={user.userAvatar}></Avatar>
									</ListItemIcon>
									<ListItemText primary={user.userName} />
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			</List>
		</Box>
	);
};

const ChatSection = () => {
	const showVideoSection = useSelector(selectShowVideoSectionState);
	let height = "100%";
	if (showVideoSection) {
		height = "50%";
	}
	return (
		<Fragment>
			<div
				id="ChatSection"
				style={{
					backgroundColor: "white",
					width: "100%",
					height: height,
					gridColumn: "2 / 3",
					gridRow: "1 / 1",
					//border: "2px solid black",
				}}
			>
				<ChatMessages />
				<LiveChatTextBox />
			</div>
		</Fragment>
	);
};

const LiveChatTextBox = () => {
	const roomId = useSelector(selectRoomId);
	const [message, updateMessage] = useState("");
	const dispatch = useDispatch();
	const keyPress = (event) => {
		if (event.keyCode == 13 && message !== "") {
			console.log(auth.currentUser.photoURL);
			// 1. send the data to socket server if the user enters the message
			socket.emit("send_new_message", {
				roomId: roomId,
				message: message,
				userName: auth.currentUser.displayName,
				userId: auth.currentUser.uid,
				userAvatar: auth.currentUser.photoURL,
			});
			// 2. also need to let ChatMessages component know who is sending the message currently
			dispatch(
				REDUX.addMessage({
					//roomId: roomId,
					message: message,
					userName: auth.currentUser.displayName,
					userId: auth.currentUser.uid,
					userAvatar: auth.currentUser.photoURL,
				})
			);
			// 3. then clear the text input
			updateMessage("");
		}
	};
	return (
		<div
			style={{
				height: "100px",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<TextField
				placeholder="#Message"
				sx={{
					width: "98%",
				}}
				value={message}
				onChange={(event) => {
					updateMessage(event.target.value);
				}}
				onKeyDown={(event) => {
					keyPress(event);
				}}
			/>
		</div>
	);
};
const ChatMessages = () => {
	//const [messages, updateMessages] = React.useState([]);
	const messages = useSelector(REDUX.selectMessages);
	const dispatch = useDispatch();

	useEffect(() => {
		//this code will run for socket.io when the user receive more messsages from their friends!
		socket.on("receive_new_message", (newMessage) => {
			//addMessage(newMessage);
			dispatch(REDUX.addMessage(newMessage));
		});
	}, [socket]);

	return (
		<Fragment>
			<Virtuoso
				style={{
					height: "calc(100% - 100px)",
					width: "100%",
					//border: "2px solid black",
				}}
				data={messages}
				//endReached={loadMore}
				//endReached
				//overscan={}
				itemContent={(index, messageItem) => {
					if (messageItem.text.length > 1) {
						return (
							<DiscordMessages lightTheme={true}>
								<DiscordMessage
									// deal with null avatars in the future
									author={"" + messageItem.userName}
									avatar={messageItem.userAvatar}
								>
									{messageItem.text.map((text, index) => {
										return (
											<Fragment>
												<div>{text}</div>
											</Fragment>
										);
									})}
								</DiscordMessage>
							</DiscordMessages>
						);
					} else {
						console.log(messageItem.userAvatar);
						return (
							<DiscordMessages lightTheme={true}>
								<DiscordMessage
									author={"" + messageItem.userName}
									avatar={messageItem.userAvatar}
								>
									{messageItem.text}
								</DiscordMessage>
							</DiscordMessages>
						);
					}
				}}
				//components={{ Footer }}
			/>
		</Fragment>
	);
};

const Footer = () => {
	return (
		<div
			style={{
				padding: "2rem",
				display: "flex",
				justifyContent: "center",
			}}
		>
			Loading...
		</div>
	);
};

const OnlineSection = () => {
	return (
		<Fragment>
			<div
				style={{
					backgroundColor: "#F2F3F5",
					gridColumn: "3 / 3",
					gridRow: "1 / 1",
					width: "100%",
					height: "100%",
				}}
			></div>
		</Fragment>
	);
};

// for styling of avatar's badge
const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px #EBEDEF`,
		height: "12px",
		width: "12px",
		borderRadius: "10px",
	},
}));

// for bottom section to show video and share screen buttons
const UserDisplaySettings = () => {
	const dispatch = useDispatch();
	return (
		<div
			style={{
				height: "150px",
				width: "100%",
				backgroundColor: "#EBEDEF",
				gridColumn: "1 / 2",
				gridRow: "1 / 1",
				alignSelf: "end",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					height: "40px",
					alignItems: "center",
				}}
			>
				<Tooltip
					title="5ms"
					placement="top"
					sx={{ color: "green", marginLeft: "10px" }}
					arrow
				>
					<SignalCellularAltIcon />
				</Tooltip>
				<p
					style={{
						marginLeft: "5px",
						fontFamily: "arial",
						fontSize: "15px",
						color: "green",
					}}
				>
					{" "}
					Voice Connected{" "}
				</p>
				<Tooltip title="Disconnect" placement="top" arrow>
					<IconButton size="small" sx={{ marginLeft: "60px" }}>
						<PhoneDisabledIcon fontSize="inherit" />
					</IconButton>
				</Tooltip>
			</div>
			<div
				style={{
					height: "40px",
					width: "100%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
					marginBottom: "5px",
				}}
			>
				<Tooltip title="Turn On Camera" placement="top" arrow>
					<Button
						variant="outlined"
						startIcon={<VideocamIcon />}
						sx={{
							color: "black",
							border: "2px solid white",
							backgroundColor: "white",
							height: "35px",
							width: "45%",
							textTransform: "capitalize",
							"&:hover": {
								backgroundColor: "#f1f1f1",
								borderColor: "#f1f1f1",
								boxShadow: "none",
							},
							"&:active": {
								boxShadow: "none",
								backgroundColor: "#f1f1f1",
								borderColor: "#f1f1f1",
							},
							"&:focus": {
								// boxShadow:
								// 	"0 0 0 0.2rem rgba(0,123,255,.5)",
							},
						}}
						onClick={() => dispatch(toggleVideoSection())}
					>
						Video
					</Button>
				</Tooltip>
				<Button
					variant="outlined"
					startIcon={<ScreenShareIcon />}
					disabled={true}
					sx={{
						color: "black",
						border: "2px solid white",
						backgroundColor: "white",
						height: "35px",
						width: "45%",
						textTransform: "capitalize",
						"&:hover": {
							backgroundColor: "#f1f1f1",
							borderColor: "#f1f1f1",
							boxShadow: "none",
						},
						"&:active": {
							boxShadow: "none",
							backgroundColor: "#f1f1f1",
							borderColor: "#f1f1f1",
						},
						"&:focus": {
							// boxShadow:
							// 	"0 0 0 0.2rem rgba(0,123,255,.5)",
						},
					}}
				>
					Screen
				</Button>
			</div>
			<Divider />
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					height: "60px",
					width: "100%",
					//border: "2px solid black",
					alignItems: "center",
				}}
			>
				<StyledBadge
					overlap="circular"
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "right",
					}}
					variant="dot"
				>
					<Avatar
						src={auth.currentUser.photoURL}
						sx={{
							height: "35px",
							width: "35px",
							marginLeft: "10px",
						}}
					/>
				</StyledBadge>
				<Tooltip title="Unmute" placement="top" arrow>
					<IconButton sx={{ marginLeft: "120px" }}>
						<MicOffIcon sx={{ fontSize: "20px" }} />
					</IconButton>
				</Tooltip>
				<Tooltip title="Deafen" placement="top" arrow>
					<IconButton>
						<HeadsetIcon sx={{ fontSize: "20px" }} />
					</IconButton>
				</Tooltip>
			</div>
		</div>
	);
};
