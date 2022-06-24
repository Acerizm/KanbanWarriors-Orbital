import React, { Fragment, useEffect, useState } from "react";
import * as CSS from "./css.js";

// import Material UI Stuff here
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

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

// socket.io
import { socket } from "../SocketClient/index.js";

// ------------------------------------- Drawer (Material UI) Feature/Component ------------------------------------------------------------------------------------
// styling for Drawer
export const TemporaryDrawer = () => {
	// Redux stuff here
	const dispatch = useDispatch();
	// Our redux state here for "isDrawerOn" state
	const isDrawerOn = useSelector(REDUX.selectDrawerState);
	useEffect(() => {
		socket.on("receive_other_users_drawer_on", (isDrawerOn) => {
			dispatch(REDUX.receiveDrawerOn(isDrawerOn));
		});
		socket.on("receive_other_users_drawer_off", (isDrawerOn) => {
			dispatch(REDUX.receiveDrawerOff(isDrawerOn));
		});
	}, [socket]);
	const changeBackground = (category) => {
		axios
			.get(
				"http://159.223.91.154:500/api/Videos/GetRandomVideoFromCategory?category=" +
					category
			)
			.then((response) => {
				dispatch(REDUX.changeVideoId(response.data));
				dispatch(REDUX.toggleNewBackground());
				dispatch(
					REDUX.changeStaticImageId(Math.floor(Math.random() * 5) + 1)
				);
				dispatch(
					REDUX.changeYoutubeRng(Math.floor(Math.random() * 1000 + 1))
				);
			});
	};

	const CategoriesCarousell = () => {
		//const [currentIndex, setIndex] = useState(0);
		return (
			<Box
				sx={{ width: "auto", height: "20vh" }}
				role="presentation"
				onKeyDown={() => dispatch(REDUX.toggleDrawerOff())}
			>
				<Carousel
					autoPlay={false}
					sx={{ height: "20vh" }}
					navButtonsAlwaysVisible={true}
					animation={"fade"}
					duration={500}
					navButtonsProps={{
						// Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
						style: {
							backgroundColor: "cornflowerblue",
							//borderRadius: 0,
						},
					}}
					navButtonsWrapperProps={{
						// Move the buttons to the bottom. Unsetting top here to override default style.
						style: {
							marginRight: "10px",
							marginLeft: "10px",
						},
					}}
				>
					<FirstStack />
					<SecondStack />
				</Carousel>
			</Box>
		);
	};

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
				<CategoriesCarousell />
			</Drawer>
		</div>
	);
};

const FirstStack = () => {
	const dispatch = useDispatch();
	const changeBackground = (category) => {
		axios
			.get(
				"http://159.223.91.154:500/api/Videos/GetRandomVideoFromCategory?category=" +
					category
			)
			.then((response) => {
				dispatch(REDUX.changeVideoId(response.data));
				dispatch(REDUX.toggleNewBackground());
				dispatch(
					REDUX.changeStaticImageId(Math.floor(Math.random() * 5) + 1)
				);
				dispatch(
					REDUX.changeYoutubeRng(Math.floor(Math.random() * 1000 + 1))
				);
			});
	};
	return (
		<Fragment>
			<Stack
				direction="row"
				spacing={10}
				justifyContent="center"
				alignItems="center"
				height="20vh"
				//sx={{border: "2px solid red"}}
			>
				<Stack
					direction="column"
					spacing={0}
					justifyContent="center"
					alignItems="center"
					//sx={{border: "2px solid green"}}
				>
					<Typography
						variant="button"
						display="block"
						//sx={{ marginTop: "20px" }}
					>
						Space
					</Typography>
					<IconButton
						aria-label="space"
						onClick={() => {
							dispatch(REDUX.changeCategory(1));
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("Space");
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
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("Wildlife");
						}}
					>
						<Player
							autoplay
							loop
							src="https://assets6.lottiefiles.com/packages/lf20_gn57ndas.json"
							style={{
								...CSS.lotticonStyle,
								transform: "scale(1.8)",
							}}
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
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("City");
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
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("Beach");
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
				<Stack
					direction="column"
					spacing={0}
					justifyContent="center"
					alignItems="center"
				>
					<Typography variant="button" display="block">
						Study
					</Typography>
					<IconButton
						aria-label="Study"
						onClick={() => {
							dispatch(REDUX.changeCategory(5));
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("Study");
						}}
					>
						<Player
							autoplay
							loop
							src="https://assets3.lottiefiles.com/packages/lf20_wh5alaq6.json"
							style={{
								...CSS.lotticonStyle,
								//transform: "scale(1.5)",
							}}
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
						Drive
					</Typography>
					<IconButton
						aria-label="Drive"
						onClick={() => {
							dispatch(REDUX.changeCategory(6));
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("Drive");
						}}
					>
						<Player
							autoplay
							loop
							src="https://assets8.lottiefiles.com/packages/lf20_mq190n5d.json"
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
						Walk
					</Typography>
					<IconButton
						aria-label="Walk"
						onClick={() => {
							dispatch(REDUX.changeCategory(7));
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("Walk");
						}}
					>
						<Player
							autoplay
							loop
							src="https://assets1.lottiefiles.com/packages/lf20_llpnmgts.json"
							style={{
								...CSS.lotticonStyle,
								transform: "scale(2.0)",
							}}
						/>
					</IconButton>
				</Stack>
			</Stack>
		</Fragment>
	);
};

const SecondStack = () => {
	const dispatch = useDispatch();
	const changeBackground = (category) => {
		axios
			.get(
				"http://159.223.91.154:500/api/Videos/GetRandomVideoFromCategory?category=" +
					category
			)
			.then((response) => {
				dispatch(REDUX.changeVideoId(response.data));
				dispatch(REDUX.toggleNewBackground());
				dispatch(
					REDUX.changeStaticImageId(Math.floor(Math.random() * 5) + 1)
				);
				dispatch(
					REDUX.changeYoutubeRng(Math.floor(Math.random() * 1000 + 1))
				);
			});
	};
	return (
		<Fragment>
			<Stack
				direction="row"
				spacing={10}
				justifyContent="center"
				alignItems="center"
				height="20vh"
				//sx={{border: "2px solid red"}}
			>
				<Stack
					direction="column"
					spacing={0}
					justifyContent="center"
					alignItems="center"
				>
					<Typography variant="button" display="block">
						Cyberpunk
					</Typography>
					<IconButton
						aria-label="Cyberpunk"
						onClick={() => {
							dispatch(REDUX.changeCategory(7));
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("Cyberpunk");
						}}
					>
						<Player
							autoplay
							loop
							src="https://assets7.lottiefiles.com/packages/lf20_g7zn41ai.json"
							style={{
								...CSS.lotticonStyle,
								transform: "scale(1.5)",
							}}
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
						Visual
					</Typography>
					<IconButton
						aria-label="Visual"
						onClick={() => {
							dispatch(REDUX.changeCategory(8));
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("Visual");
						}}
					>
						<Player
							autoplay
							loop
							src="https://assets3.lottiefiles.com/packages/lf20_Vl8oMi.json"
							style={{
								...CSS.lotticonStyle,
								transform: "scale(1.2)",
							}}
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
						Game
					</Typography>
					<IconButton
						aria-label="Game"
						onClick={() => {
							dispatch(REDUX.changeCategory(9));
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("Game");
						}}
					>
						<Player
							autoplay
							loop
							src="https://assets5.lottiefiles.com/private_files/lf30_gvdwzaoj.json"
							style={{
								...CSS.lotticonStyle,
								transform: "scale(2.0)",
							}}
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
						Window
					</Typography>
					<IconButton
						aria-label="Window"
						onClick={() => {
							dispatch(REDUX.changeCategory(9));
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("Window");
						}}
					>
						<Player
							autoplay
							loop
							src="https://assets5.lottiefiles.com/packages/lf20_rrmxkdru.json"
							style={{
								...CSS.lotticonStyle,
								transform: "scale(1.2)",
							}}
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
						Lo-Fi
					</Typography>
					<IconButton
						aria-label="Lo-Fi"
						onClick={() => {
							dispatch(REDUX.changeCategory(10));
							dispatch(
								REDUX.changeRng(
									Math.floor(Math.random() * 100) + 1
								)
							);
							changeBackground("Lo-Fi");
						}}
					>
						<Player
							autoplay
							loop
							src="https://assets6.lottiefiles.com/packages/lf20_your4qur.json"
							style={{
								...CSS.lotticonStyle,
								//transform: "scale(1.2)",
							}}
						/>
					</IconButton>
				</Stack>
			</Stack>
		</Fragment>
	);
};

// ----------------------------------- Background Images Feature/Component ------------------------------------------------------------------------------------------

// Imagekit API here for conditional rendering
// IKImage component refers to the component to retrieve/store images using Imagekit.io API
// link -> https://docs.imagekit.io/getting-started/quickstart-guides/react

export const BackgroundImage = () => {
	const dispatch = useDispatch();
	const currentCategory = useSelector(REDUX.selectCategory);
	const videoId = useSelector(REDUX.selectVideoId);
	const rng = useSelector(REDUX.selectRng);
	const randomStaticImageId = useSelector(REDUX.selectStaticImageId);
	let background;

	React.useEffect(() => {
		socket.on("receive_other_users_video_id", (videoId) => {
			dispatch(REDUX.receiveVideoId(videoId));
		});
		socket.on(
			"receive_other_users_category_selected",
			(categorySelected) => {
				dispatch(REDUX.receiveCategory(categorySelected));
			}
		);
		socket.on("receive_other_users_image_id", (imageId) => {
			dispatch(REDUX.receiveStaticImageId(imageId));
		});
		socket.on("receive_other_users_rng", (rng) => {
			dispatch(REDUX.receiveRng(rng));
		});
	}, [socket]);

	switch (currentCategory) {
		case 1: {
			// if space is selected
			// Space == 1
			if (rng <= 10) {
				// 10% chance of displaying a static image with ImageKit
				let path =
					"../Categories/Space/" + randomStaticImageId + ".jpg";
				background = (
					<ImageKitBackground urlEndpoint={urlEndpoint} path={path} />
				);
			} else {
				background = <YoutubeBackground id={videoId} />;
			}
			break;
		}
		case 2: {
			// if Wildlife is selected
			// Wildlife == 2
			if (rng <= 10) {
				let path =
					"../Categories/Wildlife/" + randomStaticImageId + ".jpg";
				background = (
					<ImageKitBackground urlEndpoint={urlEndpoint} path={path} />
				);
			} else {
				background = <YoutubeBackground id={videoId} />;
			}
			break;
		}
		case 3: {
			// if City is selected
			// City == 3
			if (rng <= 10) {
				let path = "../Categories/City/" + randomStaticImageId + ".jpg";
				background = (
					<ImageKitBackground urlEndpoint={urlEndpoint} path={path} />
				);
			} else {
				background = <YoutubeBackground id={videoId} />;
			}
			break;
		}
		case 4: {
			// if beach Selected
			// Beach == 4
			if (rng <= 10) {
				let path =
					"../Categories/Beach/" + randomStaticImageId + ".jpg";
				background = (
					<ImageKitBackground urlEndpoint={urlEndpoint} path={path} />
				);
			} else {
				background = <YoutubeBackground id={videoId} />;
			}
			break;
		}
		case currentCategory >= 5 && currentCategory <= 10
			? currentCategory
			: null: {
			background = <YoutubeBackground id={videoId} />;
			break;
		}
		default: {
			background = <YoutubeBackground id={"lTRiuFIWV54"} />;
			break;
		}
	}
	return <React.Fragment>{background}</React.Fragment>;
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
				lqip={{ active: true, quality: 20 }}
				// Example API URL -> https://ik.imagekit.io/acerizm/KanbanWarriors/Categories/Space/1.jpg
			/>
		</React.Fragment>
	);
};

const YoutubeBackground = ({ id }) => {
	const dispatch = useDispatch();
	let youtubeLink = "https://www.youtube.com/watch?v=" + id;
	let currentId = "" + id;
	let rngValue = useSelector(REDUX.selectYoutubeRng);
	useEffect(() => {
		socket.on("receive_other_users_youtube_rng", (youtubeRng) => {
			dispatch(REDUX.receiveYoutubeRng(youtubeRng));
		});
	}, [socket]);
	useEffect(() => {
		if (rngValue !== null) {
			dispatch(REDUX.toggleLoadingArea(true));
		} else {
			dispatch(REDUX.toggleLoadingArea(false));
		}
	}, [rngValue]);
	return (
		<React.Fragment>
			{<LoadingArea />}
			<ReactPlayer
				className="react-player"
				key={rngValue}
				url={youtubeLink}
				controls={false}
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
				playing={true}
				onBuffer={() => {
					console.log("gg");
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
