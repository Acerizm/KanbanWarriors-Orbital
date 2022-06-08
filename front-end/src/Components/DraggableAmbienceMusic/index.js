import React, { Fragment, useEffect, useState } from "react";
import * as CSS from "./css";
import { VolumeUpOutlined, VolumeOffOutlined } from "@mui/icons-material";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import MinimizeRoundedIcon from '@mui/icons-material/MinimizeRounded';
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
import MinimizeIcon from '@mui/icons-material/Minimize';

export const AmbienceMusic = () => {
	const playerStatus = useSelector(REDUX.selectPlayerStatus);
	const dispatch = useDispatch();
	return (
		<Fragment>
			{playerStatus ? (
				<Draggable
					axis="both"
					handle="#AmbienceMusicHeading"
					position={null}
					defaultClassName="draggableAmbienceMusicPlayer"
					scale={1}
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
							<MinimizeIcon fontSize="large" sx={{...CSS.minimizeStyle}} onClick={
								() => dispatch(REDUX.togglePlayer())
							}/>
						</div>
						<AmbienceSound gridRow={2} soundTitle={"Ocean"} />
						<AmbienceSound gridRow={3} soundTitle={"Fireplace"} />
						<AmbienceSound gridRow={4} soundTitle={"Cafe"} />
						<AmbienceSound gridRow={5} soundTitle={"Nature"} />
						<AmbienceSound gridRow={6} soundTitle={"Keyboard"} />
						<AmbienceSound gridRow={7} soundTitle={"Rain"} />
					</div>
				</Draggable>
			) : null}
		</Fragment>
	);
};

const AmbienceSound = ({ gridRow, soundTitle }) => {
	let gridRowString = "" + gridRow + " / " + (gridRow + 1);
	let volumeIcon;
	switch (soundTitle) {
		case "Ocean": {
			volumeIcon = <VolumeIconOcean />;
			break;
		}
		case "Fireplace": {
			volumeIcon = <VolumeIconFireplace />;
			break;
		}
		case "Cafe": {
			volumeIcon = <VolumeIconCafe />;
			break;
		}
		case "Nature": {
			volumeIcon = <VolumeIconNature />;
			break;
		}
		case "Keyboard": {
			volumeIcon = <VolumeIconKeyboard />;
			break;
		}
		case "Rain": {
			volumeIcon = <VolumeIconRain />;
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
					<CustomSlider soundTitle={soundTitle} />
				</div>
			</div>
		</Fragment>
	);
};
const VolumeIconOcean = () => {
	let mutedStatus = useSelector(REDUX.selectOceanMutedStatus);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};
const VolumeIconFireplace = () => {
	let mutedStatus = useSelector(REDUX.selectFireplaceMutedStatus);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};
const VolumeIconCafe = () => {
	let mutedStatus = useSelector(REDUX.selectCafeMutedStatus);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};
const VolumeIconNature = () => {
	let mutedStatus = useSelector(REDUX.selectNatureMutedStatus);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};
const VolumeIconKeyboard = () => {
	let mutedStatus = useSelector(REDUX.selectKeyboardMutedStatus);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};
const VolumeIconRain = () => {
	let mutedStatus = useSelector(REDUX.selectRainMutedStatus);
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

const CustomSlider = ({ soundTitle }) => {
	const dispatch = useDispatch();
	let muteSound = "Mute" + soundTitle;
	let unmuteSound = "Unmute" + soundTitle;
	return (
		<PrettoSlider
			valueLabelDisplay="auto"
			aria-label="pretto slider"
			defaultValue={0}
			onChangeCommitted={(event, value) => {
				if (value == 0) {
					dispatch(REDUX.toggleMuteStatus(muteSound));
					dispatch(REDUX.updateVolume({type: soundTitle,volume: value}));
				} else {
					dispatch(REDUX.toggleMuteStatus(unmuteSound));
					// disptach another action to fire the ambience music
					dispatch(REDUX.updateVolume({type: soundTitle,volume: value}));
				}
			}}
		/>
	);
};

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
