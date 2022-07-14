import NavBar from "../NavBar";
import * as CSS from "./css.js";
import React from "react";
import { BackgroundImage } from "../BackgroundCategories/index.js";
import DraggableClock from "../DraggableClock/DraggableClock";
import { AmbienceMusic } from "../DraggableAmbienceMusic/index.js";
import { AudioPlayer } from "../DraggableAmbienceMusic/index.js";
// import custom css file here
import "./HomePage.css";
import SettingsButton from "../Settings/index.js";
import Notifications from "../Notifications/index.js";
import LiveRoomButton from "../LiveRoom/index.js";
import WebCam from "../Webcam";
import { LiveChatButton } from "../LiveRoom/LiveChat";

const HomePage = () => {
	return (
		<div id="Home" style={{ ...CSS.homeStyle }}>
			<div
				id="HomeDesktopContainer"
				style={{ ...CSS.homeDesktopContainerStyle }}
			>
				<BackgroundImage />
				<NavBar />
				<DraggableClock />
				<SettingsButton />
				<LiveRoomButton />
				<AmbienceMusic />
				<AudioPlayer />
				<Notifications />
				<LiveChatButton />
				{/* <WebCam /> */}
			</div>
		</div>
	);
};

export default HomePage;
