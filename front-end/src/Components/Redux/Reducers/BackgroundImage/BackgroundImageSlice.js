import { createSlice } from "@reduxjs/toolkit";

// ------------------------------- Reducers ------------------------------------------------------------------------------------------------------
const backgroundImageSlice = createSlice({
	// name of the action
	name: "backgroundImage",
	// the initial default state
	initialState: {
		isDrawerOn: false,
		currentCategorySelected: 0,
		currentImageId: 0,
		loadingBar: false,
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
		toggleDrawerOff(state) {
			state.isDrawerOn = false;
		},
		changeCategory(state, action) {
			state.currentCategorySelected = action.payload;
		},
		changeImage(state) {
			if (state.currentImageId == 5) {
				state.currentImageId = 1;
			} else {
				state.currentImageId += 1;
			}
		},
		toggleLoadingBar(state,action) {
			state.loadingBar = action.payload;
		}
	},
});

// ------------------------------- Exporting Actions/Reducers ---------------------------------------------------------------------------

export const { toggleDrawerOn, toggleDrawerOff, changeCategory, changeImage, toggleLoadingBar } =
	backgroundImageSlice.actions;

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

//for the image id of respective categories
export const updatedImageId = (state) => state.backgroundImage.currentImageId;

// for toggling the loading bar
export const loadingBarState = state => state.backgroundImage.loadingBar;
