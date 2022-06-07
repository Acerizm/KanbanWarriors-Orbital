import { Desktop } from "../ResponsiveComponent/MediaQuery.js";
import { Tablet } from "../ResponsiveComponent/MediaQuery.js";
import NavBar from "../NavBar";
import * as CSS from "./css.js";
import Draggable from "react-draggable";
import React from "react";
import { BackgroundImage } from "../BackgroundCategories/index.js";
import DraggableClock from "../DraggableClock/DraggableClock";
import { AmbienceMusic } from "../DraggableAmbienceMusic/index.js";
// import custom css file here
import "./HomePage.css";

const HomePage = () => {
	return (
		<div id="Home" style={{ ...CSS.homeStyle }}>
			<Desktop>
				<div
					id="HomeDesktopContainer"
					style={{ ...CSS.homeDesktopContainerStyle }}
				>
					<BackgroundImage />
					<Draggable
						axis="both"
						handle=".handle"
						position={null}
						defaultClassName="draggableNavBar"
						scale={1}
					>
						<div>
							<NavBar></NavBar>
						</div>
					</Draggable>
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
					<Draggable
						axis="both"
						handle="#AmbienceMusicHeading"
						position={null}
						defaultClassName="draggableAmbienceMusicPlayer"
						scale={1}
					>
						<div>
							<AmbienceMusic />
						</div>
					</Draggable>
				</div>
			</Desktop>
			<Tablet></Tablet>
		</div>
	);
};

export default HomePage;
