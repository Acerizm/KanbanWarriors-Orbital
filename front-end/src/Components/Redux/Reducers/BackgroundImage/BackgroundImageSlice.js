import { createSlice } from "@reduxjs/toolkit";

// ------------------------------- Reducers ------------------------------------------------------------------------------------------------------
const backgroundImageSlice = createSlice({
	// name of the action
	name: "backgroundImage",
	// the initial default state
	initialState: {
		isDrawerOn: false,
		showLoadingArea: false,
		currentCategorySelected: 0,
		videoId: null,
		newBackground: false,
		// rng -> random number between choosing static image or youtube video based on probability
		rng: null,
		youtubeRng: null,
		randomStaticImageId: 0,
		currentImageId: 0,
	},
	// root reducer
	reducers: {
		// all the different reducers
		// that is relevant to backgroundImageSlice
		// redux tool kit automatically maps for us the actions using "<name>/<reducer>" like { type: "backgroundImage/toggleDrawerOn" }
		// so the reducer functions have the same name as our actions!
		toggleDrawerOn(state) {
			state.isDrawerOn = true;
		},
		receiveDrawerOn(state, action) {
			state.isDrawerOn = action.payload;
		},
		toggleDrawerOff(state) {
			state.isDrawerOn = false;
		},
		receiveDrawerOff(state, action) {
			state.isDrawerOn = action.payload;
		},
		changeCategory(state, action) {
			state.currentCategorySelected = action.payload;
		},
		changeVideoId(state, action) {
			state.videoId = action.payload;
		},
		changeRng(state, action) {
			// state.rng = Math.floor(Math.random() * 100) + 1;
			state.rng = action.payload;
		},
		changeStaticImageId(state, action) {
			// state.randomStaticImageId = Math.floor(Math.random() * 5) + 1;
			state.randomStaticImageId = action.payload;
		},
		changeYoutubeRng(state, action) {
			state.youtubeRng = action.payload;
		},
		toggleNewBackground(state) {
			state.newBackground = true;
		},
		toggleLoadingArea(state, action) {
			state.showLoadingArea = action.payload;
		},

		// for socket.io as an observer NOT as a sender
		receiveVideoId(state, action) {
			state.videoId = action.payload;
		},
		receiveCategory(state, action) {
			state.currentCategorySelected = action.payload;
		},
		receiveRng(state, action) {
			state.rng = action.payload;
		},
		receiveStaticImageId(state, action) {
			state.randomStaticImageId = action.payload;
		},
		receiveYoutubeRng(state, action) {
			state.youtubeRng = action.payload;
		},
	},
});

// ------------------------------- Exporting Actions/Reducers ---------------------------------------------------------------------------

export const {
	toggleDrawerOn,
	toggleDrawerOff,
	changeCategory,
	changeVideoId,
	changeImage,
	changeRng,
	changeStaticImageId,
	changeYoutubeRng,
	receiveVideoId,
	receiveCategory,
	receiveImage,
	receiveRng,
	receiveStaticImageId,
	receiveYoutubeRng,
	receiveDrawerOn,
	receiveDrawerOff,
	toggleLoadingArea,
	toggleNewBackground,
} = backgroundImageSlice.actions;

export default backgroundImageSlice.reducer;

// ----------------------------------- Selectors ---------------------------------------------------------------------------------------
// Selectors for accessing the state in the Redux Store
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// for our drawer
export const selectDrawerState = (state) => state.backgroundImage.isDrawerOn;

// for if the category is selected
export const selectCategory = (state) =>
	state.backgroundImage.currentCategorySelected;

export const selectVideoId = (state) => state.backgroundImage.videoId;
export const selectNewBackground = (state) =>
	state.backgroundImage.newBackground;
export const selectRng = (state) => state.backgroundImage.rng;
export const selectStaticImageId = (state) =>
	state.backgroundImage.randomStaticImageId;
export const selectYoutubeRng = (state) => state.backgroundImage.youtubeRng;

// for the loading area
export const selectLoadingArea = (state) =>
	state.backgroundImage.showLoadingArea;
