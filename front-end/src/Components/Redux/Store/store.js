import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// import reducers here
import backgroundImageReducer from "../Reducers/BackgroundImage/BackgroundImageSlice.js";
import AuthenticationReducer from "../Reducers/Authentication/AuthenticationSlice.js";
import AmbienceSoundsReducer from "../Reducers/AmbienceSounds/AmbienceSoundsSlice.js";
import SettingsReducer from "../Reducers/Settings/SettingsSlice.js";

const store = configureStore({
	// root reducer is here
	reducer: {
		// key : value pair for state and corresponding reducer
		// state.key : slice reducer function
		// Example:
		// users: usersReducer
		// counter: counterReducer
		// the actual state is -> state.users -> which is a slice of the bigger "state"

		// the actual state for the code below is state.backgroundImage.something
		backgroundImage: backgroundImageReducer,
		Authentication: AuthenticationReducer,
		AmbienceSounds: AmbienceSoundsReducer,
		Settings: SettingsReducer,
	},
});

export default store;
