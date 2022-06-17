import { Desktop } from "../ResponsiveComponent/MediaQuery.js";
import { Tablet } from "../ResponsiveComponent/MediaQuery.js";
import NavBar from "../NavBar";
import * as CSS from "./css.js";
import Draggable from "react-draggable";
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

const HomePage = () => {
	return (
		<div id="Home" style={{ ...CSS.homeStyle }}>
			<div
				id="HomeDesktopContainer"
				style={{ ...CSS.homeDesktopContainerStyle }}
			>
				<BackgroundImage />
				<NavBar />
				<Draggable
					axis="both"
					handle=".clockHandle"
					position={null}
					defaultClassName="draggableClock"
					scale={1}
				>
					<div>
						<DraggableClock></DraggableClock>
					</div>
				</Draggable>
				<SettingsButton />
				<LiveRoomButton />
				<AmbienceMusic />
				<AudioPlayer />
				<Notifications />
			</div>
		</div>
	);
};

export default HomePage;
