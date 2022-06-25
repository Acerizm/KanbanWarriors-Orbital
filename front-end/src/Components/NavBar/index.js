import * as CSS from "./css.js";
import React, { useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import TimerIcon from "@mui/icons-material/Timer";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import NotesIcon from "@mui/icons-material/Notes";
import SettingsIcon from "@mui/icons-material/Settings";
import { TemporaryDrawer } from "../BackgroundCategories/index.js";

// import Redux stuff here
import { useDispatch, useSelector } from "react-redux";
// import all the reducers you want to use here
import { toggleDrawerOn } from "../Redux/Reducers/BackgroundImage/BackgroundImageSlice.js";
import { togglePlayer } from "../Redux/Reducers/AmbienceSounds/AmbienceSoundsSlice.js";

import Draggable from "react-draggable";
import { selectRoomId } from "../Redux/Reducers/Socket/SocketSlice.js";

import { socket } from "../SocketClient/index.js";

// 1. Using Material-UI "themes" to alter their components/APIs
const navBarTheme = createTheme({
	components: {
		// what component you are using
		MuiBottomNavigation: {
			styleOverrides: {
				root: {
					width: "700px",
					borderRadius: "5px",
				},
			},
		},
	},
});

const NavBar = ({ props }) => {
	// We are using React hooks
	// Hooks allows us to skip classes/OOP
	//Hooks are here
	const [value, setValue] = React.useState(0);

	//redux stuff here
	const dispatch = useDispatch();
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
				socket.emit("send_user_navbar_positions", {
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
		socket.on(
			"receive_other_users_navbar_positions",
			(settingsLastPosition) => {
				updatePosition(settingsLastPosition);
			}
		);
	}, [socket]);

	return (
		<Draggable
			axis="both"
			handle=".handle"
			position={currentPosition}
			defaultClassName="draggableNavBar"
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
			<div className="handle" style={{ ...CSS.navBarContainerStyle }}>
				<TemporaryDrawer />
				<ThemeProvider theme={navBarTheme}>
					<BottomNavigation
						// showLabels
						value={value}
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
						showLabels={true}
					>
						<BottomNavigationAction
							disabled={isDragging}
							label="Background"
							icon={<WallpaperIcon />}
							onClick={() => dispatch(toggleDrawerOn())}
							onTouchEnd={() => {
								if (!isDragging) {
									dispatch(toggleDrawerOn());
								}
							}}
						/>
						<BottomNavigationAction
							label="Timer"
							icon={<TimerIcon />}
							disabled={isDragging}
						/>
						<BottomNavigationAction
							label="Music"
							icon={<AudiotrackIcon />}
							disabled={isDragging}
						/>
						<BottomNavigationAction
							label="Ambience"
							icon={<GraphicEqIcon />}
							disabled={isDragging}
							onClick={() => dispatch(togglePlayer())}
							onTouchEnd={() => {
								if (!isDragging) {
									dispatch(togglePlayer());
								}
							}}
						/>
						<BottomNavigationAction
							label="To-Do"
							icon={<NotesIcon />}
							disabled={isDragging}
						/>
						<BottomNavigationAction
							label="Settings"
							icon={<SettingsIcon />}
							disabled={isDragging}
						/>
					</BottomNavigation>
				</ThemeProvider>
			</div>
		</Draggable>
	);
};

export default NavBar;
