import React, { Fragment, useEffect, useState } from "react";
import * as CSS from "./css";
import { VolumeUpOutlined, VolumeOffOutlined } from "@mui/icons-material";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import * as REDUX from "../Redux/Reducers/AmbienceSounds/AmbienceSoundsSlice.js";
import Draggable from "react-draggable";
import ReactPlayer from "react-player";

import raindrop from "../AmbienceSounds/Sounds/raindrops.mp3";

export const AmbienceMusic = () => {
	const playerStatus = useSelector(REDUX.selectPlayerStatus);
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
							<div
								id="AmbienceMusicTitle"
								style={{ ...CSS.AmbienceMusicTitleStyle }}
							>
								Ambience Sounds
							</div>
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
	let mutedStatus = useSelector(REDUX.selectOceanState);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};
const VolumeIconFireplace = () => {
	let mutedStatus = useSelector(REDUX.selectFireplaceState);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};
const VolumeIconCafe = () => {
	let mutedStatus = useSelector(REDUX.selectCafeState);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};
const VolumeIconNature = () => {
	let mutedStatus = useSelector(REDUX.selectNatureState);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};
const VolumeIconKeyboard = () => {
	let mutedStatus = useSelector(REDUX.selectKeyboardState);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};
const VolumeIconRain = () => {
	let mutedStatus = useSelector(REDUX.selectRainState);
	return (
		<Fragment>
			{!mutedStatus ? <VolumeUpOutlined /> : <VolumeOffOutlined />}
		</Fragment>
	);
};

// audio component here
export const AudioPlayer = () => {
	//console.log(ReactPlayer.canPlay(raindrop));
	const [isPlaying, setPlaying] = useState(false);
	return (
		<ReactPlayer
			url={raindrop}
			volume={0.5}
			muted={true}
			playing={isPlaying}
			onReady={() => setPlaying(true)}
			onError={() => console.log("why")}
		/>
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
				} else {
					dispatch(REDUX.toggleMuteStatus(unmuteSound));
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
