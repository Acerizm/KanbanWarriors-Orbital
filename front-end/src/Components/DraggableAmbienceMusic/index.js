import React, { Fragment, useEffect, useState } from "react";
import * as CSS from "./css";
import { VolumeUpOutlined, VolumeOffOutlined } from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import * as REDUX from "../Redux/Reducers/AmbienceSounds/AmbienceSoundsSlice.js";
import Draggable from "react-draggable";
import ReactPlayer from "react-player";

import raindrop from "../AmbienceSounds/Sounds/raindrops.mp3";
import fireplace from "../AmbienceSounds/Sounds/fireplace.mp3";
import cafe from "../AmbienceSounds/Sounds/cafe.mp3";
import nature from "../AmbienceSounds/Sounds/nature.mp3";
import keyboard from "../AmbienceSounds/Sounds/keyboard.mp3";
import ocean from "../AmbienceSounds/Sounds/ocean.mp3";
import MinimizeIcon from "@mui/icons-material/Minimize";

// socket.io
import { selectRoomId } from "../Redux/Reducers/Socket/SocketSlice.js";
import { socket } from "../SocketClient/index.js";

const ListOfAmbienceSounds = [
	"Ocean",
	"Fireplace",
	"Cafe",
	"Nature",
	"Keyboard",
	"Rain",
];
export const AmbienceMusic = () => {
	const playerStatus = useSelector(REDUX.selectPlayerStatus);
	const dispatch = useDispatch();
	// map all ambience sounds
	// DRY -> Dont repeat yrself
	const ambienceSounds = ListOfAmbienceSounds.map((title, index) => {
		let gridRow = index + 2;
		return (
			<AmbienceSound key={index} gridRow={gridRow} soundTitle={title} />
		);
	});

	// ----------------------------------------------Code for socket.io---------------------------------------------------------------------------
	const [isDragging, updateDraggingStatus] = React.useState(false);
	const eventControl = (event, data) => {
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
			updatePosition({
				x: data.x,
				y: data.y,
			});
			//also update positions for other users!
			if (selectRoomId !== null) {
				socket.emit("send_user_ambience_positions", {
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
			"receive_other_users_ambience_positions",
			(settingsLastPosition) => {
				updatePosition(settingsLastPosition);
			}
		);
		socket.on("receive_other_users_toggle_ambience_player", () => {
			dispatch(REDUX.receiveTogglePlayer());
		});
	}, [socket]);
	// // ----------------------------------------------Code for socket.io---------------------------------------------------------------------------
	return (
		<Fragment>
			{playerStatus ? (
				<Draggable
					axis="both"
					handle="#AmbienceMusicHeading"
					defaultPosition={currentPosition}
					position={currentPosition}
					defaultClassName="draggableAmbienceMusicPlayer"
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
						className="AmbienceMusicContainer"
						style={{ ...CSS.AmbienceMusicContainerStyle }}
					>
						<div
							id="AmbienceMusicHeading"
							style={{ ...CSS.AmbienceMusicHeadingStyle }}
						>
							{/* <div
								id="AmbienceMusicTitle"
								style={{ ...CSS.AmbienceMusicTitleStyle }}
							>
								Ambience Sounds
							</div> */}
							<MinimizeIcon
								fontSize="large"
								sx={{ ...CSS.minimizeStyle }}
								onClick={() => dispatch(REDUX.togglePlayer())}
							/>
						</div>
						{ambienceSounds}
					</div>
				</Draggable>
			) : null}
		</Fragment>
	);
};

const AmbienceSound = ({ gridRow, soundTitle }) => {
	let gridRowString = "" + gridRow + " / " + (gridRow + 1);
	let volumeIcon;
	let customSlider;
	switch (soundTitle) {
		case "Ocean": {
			volumeIcon = <VolumeIcon selector={REDUX.selectOceanMutedStatus} />;
			customSlider = (
				<CustomSlider
					soundTitle={soundTitle}
					selectorVolume={REDUX.selectOceanVolume}
				/>
			);
			break;
		}
		case "Fireplace": {
			volumeIcon = (
				<VolumeIcon selector={REDUX.selectFireplaceMutedStatus} />
			);
			customSlider = (
				<CustomSlider
					soundTitle={soundTitle}
					selectorVolume={REDUX.selectFireplaceVolume}
				/>
			);
			break;
		}
		case "Cafe": {
			volumeIcon = <VolumeIcon selector={REDUX.selectCafeMutedStatus} />;
			customSlider = (
				<CustomSlider
					soundTitle={soundTitle}
					selectorVolume={REDUX.selectCafeVolume}
				/>
			);
			break;
		}
		case "Nature": {
			volumeIcon = (
				<VolumeIcon selector={REDUX.selectNatureMutedStatus} />
			);
			customSlider = (
				<CustomSlider
					soundTitle={soundTitle}
					selectorVolume={REDUX.selectNatureVolume}
				/>
			);
			break;
		}
		case "Keyboard": {
			volumeIcon = (
				<VolumeIcon selector={REDUX.selectKeyboardMutedStatus} />
			);
			customSlider = (
				<CustomSlider
					soundTitle={soundTitle}
					selectorVolume={REDUX.selectKeyboardVolume}
				/>
			);
			break;
		}
		case "Rain": {
			volumeIcon = <VolumeIcon selector={REDUX.selectRainMutedStatus} />;
			customSlider = (
				<CustomSlider
					soundTitle={soundTitle}
					selectorVolume={REDUX.selectRainVolume}
				/>
			);
			break;
		}
	}
	return (
		<Fragment>
			<div
				className="AmbienceSound"
				style={{
					...CSS.AmbienceSoundStyle,
					gridRow: { gridRowString },
				}}
			>
				<div
					className="AmbienceSoundTitle"
					style={{ ...CSS.AmbienceSoundTitleStyle }}
				>
					{soundTitle}
				</div>
				<div
					className="AmbienceSoundPlayer"
					style={{ ...CSS.AmbienceSoundPlayerStyle }}
				>
					{volumeIcon}
					{/* <CustomSlider soundTitle={soundTitle} /> */}
					{customSlider}
				</div>
			</div>
		</Fragment>
	);
};

// Volume icon should receive individual selectors
// DRY to prevent coding multiple icons just for a different redux selector
const VolumeIcon = ({ selector }) => {
	let mutedStatus = useSelector(selector);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};

// audio component here
export const AudioPlayer = () => {
	//console.log(ReactPlayer.canPlay(raindrop))
	// to check if each sound is muted
	const isOceanMuted = useSelector(REDUX.selectOceanMutedStatus);
	const isFireplaceMuted = useSelector(REDUX.selectFireplaceMutedStatus);
	const isCafeMuted = useSelector(REDUX.selectCafeMutedStatus);
	const isNatureMuted = useSelector(REDUX.selectNatureMutedStatus);
	const isKeyboardMuted = useSelector(REDUX.selectKeyboardMutedStatus);
	const isRainMuted = useSelector(REDUX.selectRainMutedStatus);
	//to get the current volume of the sounds
	const OceanVolume = useSelector(REDUX.selectOceanVolume) / 100;
	const FireplaceVolume = useSelector(REDUX.selectFireplaceVolume) / 100;
	const CafeVolume = useSelector(REDUX.selectCafeVolume) / 100;
	const NatureVolume = useSelector(REDUX.selectNatureVolume) / 100;
	const KeyboardVolume = useSelector(REDUX.selectKeyboardVolume) / 100;
	const RainVolume = useSelector(REDUX.selectRainVolume) / 100;
	return (
		<Fragment>
			<ReactPlayer
				url={ocean}
				volume={OceanVolume}
				playing={!isOceanMuted}
				loop={true}
				onError={() => console.log("error")}
			/>
			<ReactPlayer
				url={fireplace}
				volume={FireplaceVolume}
				playing={!isFireplaceMuted}
				loop={true}
				onError={() => console.log("error")}
			/>
			<ReactPlayer
				url={cafe}
				volume={CafeVolume}
				playing={!isCafeMuted}
				loop={true}
				onError={() => console.log("error")}
			/>
			<ReactPlayer
				url={nature}
				volume={NatureVolume}
				playing={!isNatureMuted}
				loop={true}
				onError={() => console.log("error")}
			/>
			<ReactPlayer
				url={keyboard}
				volume={KeyboardVolume}
				playing={!isKeyboardMuted}
				loop={true}
				onError={() => console.log("error")}
			/>
			<ReactPlayer
				url={raindrop}
				volume={RainVolume}
				playing={!isRainMuted}
				loop={true}
				onError={() => console.log("error")}
			/>
		</Fragment>
	);
};

const CustomSlider = ({ soundTitle, selectorVolume }) => {
	const dispatch = useDispatch();
	let muteSound = "Mute" + soundTitle;
	let unmuteSound = "Unmute" + soundTitle;
	let defaultVolume = useSelector(selectorVolume);
	return (
		<PrettoSlider
			valueLabelDisplay="auto"
			aria-label="pretto slider"
			defaultValue={defaultVolume}
			onChangeCommitted={(event, value) => {
				if (value == 0) {
					dispatch(REDUX.toggleMuteStatus(muteSound) ?? 0);
					dispatch(
						REDUX.updateVolume({ type: soundTitle, volume: value })
					);
				} else {
					dispatch(REDUX.toggleMuteStatus(unmuteSound));
					// disptach another action to fire the ambience music
					dispatch(
						REDUX.updateVolume({ type: soundTitle, volume: value })
					);
				}
			}}
		/>
	);
};

// Material UI custom slider
const PrettoSlider = styled(Slider)({
	color: "#4c68d7",
	height: 8,
	marginLeft: "20px",
	"& .MuiSlider-track": {
		border: "none",
	},
	"& .MuiSlider-thumb": {
		height: 24,
		width: 24,
		backgroundColor: "#fff",
		border: "2px solid currentColor",
		"&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
			boxShadow: "inherit",
		},
		"&:before": {
			display: "none",
		},
	},
	"& .MuiSlider-valueLabel": {
		lineHeight: 1.2,
		fontSize: 12,
		background: "unset",
		padding: 0,
		width: 32,
		height: 32,
		borderRadius: "50% 50% 50% 0",
		backgroundColor: "#4c68d7",
		transformOrigin: "bottom left",
		transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
		"&:before": { display: "none" },
		"&.MuiSlider-valueLabelOpen": {
			transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
		},
		"& > *": {
			transform: "rotate(45deg)",
		},
	},
});
