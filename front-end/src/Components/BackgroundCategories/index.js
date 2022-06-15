import * as React from "react";
import * as CSS from "./css.js";

// import Material UI Stuff here
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import RocketIcon from "@mui/icons-material/Rocket";
import PetsIcon from "@mui/icons-material/Pets";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SurfingIcon from "@mui/icons-material/Surfing";
import { Typography } from "@mui/material";

// import custom css file here
import "./BackgroundCategories.css";

// Import ImageKit APIs here
import { IKImage } from "imagekitio-react";
import { urlEndpoint } from "../../Routes/index.js";

//Import Youtube here
import ReactPlayer from "react-player/youtube";

// import Redux stuff here
// import { selectDrawerState, toggleDrawerOff, changeSpaceImage, selectSpaceImageState, changeSpaceImageId } from '../Redux/Reducers/BackgroundImage/BackgroundImageSlice';
import { useDispatch, useSelector } from "react-redux";
import * as REDUX from "../Redux/Reducers/BackgroundImage/BackgroundImageSlice.js";

// import AJAX stuff here
import axios from "axios";

// import loading area here
import { LoadingArea } from "../LoadingArea/index.js";

// import lotticon
import { Player } from "@lottiefiles/react-lottie-player";

// ------------------------------------- Drawer (Material UI) Feature/Component ------------------------------------------------------------------------------------
// styling for Drawer
export const TemporaryDrawer = () => {
	// Redux stuff here
	const dispatch = useDispatch();
	// Our redux state here for "isDrawerOn" state
	const isDrawerOn = useSelector(REDUX.selectDrawerState);

	const list = () => (
		<Box
			sx={{ width: "auto", height: "10vh" }}
			role="presentation"
			// make onClick and onKeyDown change "isDrawerOpen" to false
			// onClick={() => dispatch(toggleDrawerOff())}
			onKeyDown={() => dispatch(REDUX.toggleDrawerOff())}
		>
			<Stack
				direction="row"
				spacing={20}
				justifyContent="center"
				alignItems="center"
				height="100%"
			>
				<Stack
					direction="column"
					spacing={0}
					justifyContent="center"
					alignItems="center"
				>
					<Typography
						variant="button"
						display="block"
						// sx={{ marginTop: "20px" }}
					>
						Space
					</Typography>
					<IconButton
						aria-label="space"
						onClick={() => {
							dispatch(REDUX.changeCategory(1));
							dispatch(REDUX.changeImage());
						}}
					>
						{/* <RocketIcon /> */}
						<Player
							autoplay
							loop
							src="https://assets5.lottiefiles.com/packages/lf20_RYmOmk.json"
							style={{ ...CSS.lotticonStyle }}
						/>
					</IconButton>
				</Stack>
				<Stack
					direction="column"
					spacing={0}
					justifyContent="center"
					alignItems="center"
				>
					<Typography variant="button" display="block">
						Wildlife
					</Typography>
					<IconButton
						aria-label="Wildlife"
						onClick={() => {
							dispatch(REDUX.changeCategory(2));
							dispatch(REDUX.changeImage());
						}}
					>
						{/* <PetsIcon /> */}
						<Player
							autoplay
							loop
							src="https://assets6.lottiefiles.com/packages/lf20_gn57ndas.json"
							style={{ ...CSS.lotticonStyle }}
						/>
					</IconButton>
				</Stack>
				<Stack
					direction="column"
					spacing={0}
					justifyContent="center"
					alignItems="center"
				>
					<Typography variant="button" display="block">
						City
					</Typography>
					<IconButton
						aria-label="City"
						onClick={() => {
							dispatch(REDUX.changeCategory(3));
							dispatch(REDUX.changeImage());
						}}
					>
						{/* <LocationCityIcon /> */}
						<Player
							autoplay
							loop
							src="https://assets10.lottiefiles.com/packages/lf20_EzPrWM.json"
							style={{ ...CSS.lotticonStyle }}
						/>
					</IconButton>
				</Stack>
				<Stack
					direction="column"
					spacing={0}
					justifyContent="center"
					alignItems="center"
				>
					<Typography variant="button" display="block">
						Beach
					</Typography>
					<IconButton
						aria-label="Beach"
						onClick={() => {
							dispatch(REDUX.changeCategory(4));
							dispatch(REDUX.changeImage());
						}}
					>
						{/* <SurfingIcon /> */}
						<Player
							autoplay
							loop
							src="https://assets5.lottiefiles.com/packages/lf20_nbsthdus.json"
							style={{ ...CSS.lotticonStyle }}
						/>
					</IconButton>
				</Stack>
			</Stack>
		</Box>
	);

	return (
		<div>
			<Drawer
				anchor={"bottom"}
				open={isDrawerOn}
				onClose={() => dispatch(REDUX.toggleDrawerOff())}
				hideBackdrop={false}
				ModalProps={{
					BackdropProps: {
						invisible: true,
					},
				}}
			>
				{list()}
			</Drawer>
		</div>
	);
};

// ----------------------------------- Background Images Feature/Component ------------------------------------------------------------------------------------------

// rng component for calculating
const rng = () => {
	return Math.floor(Math.random() * 100) + 1;
};

const rngStaticImageId = () => {
	return Math.floor(Math.random() * 5) + 1;
};

const rngForPlayback = () => {
	return Math.floor(Math.random() * 1000 + 1);
};

// Imagekit API here for conditional rendering
// IKImage component refers to the component to retrieve/store images using Imagekit.io API
// link -> https://docs.imagekit.io/getting-started/quickstart-guides/react

export const BackgroundImage = () => {
	const currentCategorySelected = useSelector(REDUX.selectCategory);
	const currentImageId = useSelector(REDUX.updatedImageId);
	const [videoId, setVideoId] = React.useState(null);
	const [newBackground, setNewBackground] = React.useState(false);
	let background;
	// UseEffect WILL ONLY RUN AFTER THE COMPONENT RENDERS
	React.useEffect(() => {
		switch (currentCategorySelected) {
			case 1: {
				axios
					.get(
						"http://159.223.91.154:500/api/Videos/GetRandomVideoFromCategory?category=Space"
					)
					.then((response) => {
						setVideoId(response.data);
						setNewBackground(true);
					});
				break;
			}
			case 2: {
				axios
					.get(
						"http://159.223.91.154:500/api/Videos/GetRandomVideoFromCategory?category=Wildlife"
					)
					.then((response) => {
						setVideoId(response.data);
						setNewBackground(true);
					});
				break;
			}
			case 3: {
				axios
					.get(
						"http://159.223.91.154:500/api/Videos/GetRandomVideoFromCategory?category=City"
					)
					.then((response) => {
						setVideoId(response.data);
						setNewBackground(true);
					});
				break;
			}
			case 4: {
				axios
					.get(
						"http://159.223.91.154:500/api/Videos/GetRandomVideoFromCategory?category=Beach"
					)
					.then((response) => {
						setVideoId(response.data);
						setNewBackground(true);
					});
				break;
			}
			default:
				axios
					.get("http://159.223.91.154:500/api/Videos/GetRandomVideo")
					.then((response) => {
						setVideoId(response.data);
					});
				break;
		}
	}, [currentCategorySelected, currentImageId]);

	// --------------------------------- VERY HACKY HERE--------------------------------------------------------------------------------
	// if API havnt return to us our data, show loading
	// State machine logic: Render Loading Screen -> Get APIs' Data -> Do RNG to get static image or video -> Render the background
	if (
		(videoId == null && newBackground == false) ||
		(videoId != null && newBackground == false)
	) {
		background = <YoutubeBackground id={videoId} />;
		return <React.Fragment>{background}</React.Fragment>;
	} else if (videoId == null && newBackground == true) {
		return <div>loading....</div>;
	} else if (videoId != null) {
		let randomRng = rng();
		let randomStaticImageId = rngStaticImageId();
		var path;
		// Maybe move all this logic to the backend in the future
		switch (currentCategorySelected) {
			case 1: {
				// if space is selected
				// Space == 1
				if (randomRng <= 10) {
					// 10% chance of displaying a static image with ImageKit
					path =
						"../Categories/Space/" + randomStaticImageId + ".jpg";
					background = (
						<ImageKitBackground
							urlEndpoint={urlEndpoint}
							path={path}
						/>
					);
				} else {
					background = <YoutubeBackground id={videoId} />;
				}
				break;
			}
			case 2: {
				// if Wildlife is selected
				// Wildlife == 2
				if (randomRng <= 10) {
					path =
						"../Categories/Wildlife/" +
						randomStaticImageId +
						".jpg";
					background = (
						<ImageKitBackground
							urlEndpoint={urlEndpoint}
							path={path}
						/>
					);
				} else {
					background = <YoutubeBackground id={videoId} />;
				}
				break;
			}
			case 3: {
				// if City is selected
				// City == 3
				if (randomRng <= 10) {
					path = "../Categories/City/" + randomStaticImageId + ".jpg";
					background = (
						<ImageKitBackground
							urlEndpoint={urlEndpoint}
							path={path}
						/>
					);
				} else {
					background = <YoutubeBackground id={videoId} />;
				}
				break;
			}
			case 4: {
				// if beach Selected
				// Beach == 4
				if (randomRng <= 10) {
					path =
						"../Categories/Beach/" + randomStaticImageId + ".jpg";
					background = (
						<ImageKitBackground
							urlEndpoint={urlEndpoint}
							path={path}
						/>
					);
				} else {
					background = <YoutubeBackground id={videoId} />;
				}
				break;
			}
			default: {
				break;
			}
		}
		return <React.Fragment>{background}</React.Fragment>;
	}
};

// this is where the imagekit component is
const ImageKitBackground = ({ urlEndpoint, path }) => {
	return (
		<React.Fragment>
			<IKImage
				urlEndpoint={urlEndpoint}
				path={path}
				width="100%"
				height="100%"
				id="background"
				// Example API URL -> https://ik.imagekit.io/acerizm/KanbanWarriors/Categories/Space/1.jpg
			/>
		</React.Fragment>
	);
};

const YoutubeBackground = ({ id }) => {
	let youtubeLink = "https://www.youtube.com/watch?v=" + id;
	let currentId = "" + id;
	let rngValue = rngForPlayback();
	const dispatch = useDispatch();
	return (
		<React.Fragment>
			{<LoadingArea />}
			<ReactPlayer
				url={youtubeLink}
				config={{
					playerVars: {
						// https://developers.google.com/youtube/player_parameters
						autoplay: 1,
						controls: 0,
						playsinline: 1,
						disablekb: 1,
						fs: 0,
						iv_load_policy: 3,
						loop: 1,
						modestbranding: 1,
						start: rngValue,
						rel: 0,
						mute: 1,
						playlist: currentId,
					},
				}}
				width={"100%"}
				height={"100%"}
				style={{ ...CSS.iframeStyle }}
				playing={true}
				onBuffer={() => {
					dispatch(REDUX.toggleLoadingArea(true));
				}}
				onPlay={() => {
					setTimeout(() => {
						dispatch(REDUX.toggleLoadingArea(false));
					}, 1000);
				}}
			/>
		</React.Fragment>
	);
};
