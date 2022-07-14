import ChatIcon from "@mui/icons-material/Chat";
import React, { Fragment } from "react";
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
				<Box
					sx={{
						width: 250,
						height: "calc(100% - 150px)",
						//border: "2px solid black",
						backgroundColor: "#F2F3F5",
					}}
					role="presentation"
					onClick={(event) => toggleDrawer(event)}
					onKeyDown={(event) => toggleDrawer(event)}
				>
					<List sx={{ paddingBottom: 0 }}>
						{/* list item represents each item in the list vertically */}
						<ListItem sx={{ paddingBottom: 0 }}>
							<ListItemButton>
								<ListItemIcon>
									{/* Icon to be placed inside the item */}
									<VolumeUpIcon />
								</ListItemIcon>
								<ListItemText primary="General" />
								{/* Then if the user clicks, append the user to the list */}
							</ListItemButton>
						</ListItem>
						<List sx={{ pl: 4, paddingTop: 0 }}>
							<ListItem sx={{ paddingTop: 0 }}>
								<ListItemButton>
									<ListItemIcon>
										<Avatar>HQ</Avatar>
									</ListItemIcon>
									<ListItemText primary="Haiqel" />
								</ListItemButton>
							</ListItem>
						</List>
					</List>
				</Box>
				{/* This section is for showing the user status like connection */}
				<div
					style={{
						height: "150px",
						width: "100%",
						backgroundColor: "#EBEDEF",
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
							<IconButton
								size="small"
								sx={{ marginLeft: "60px" }}
							>
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
			</Drawer>
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
