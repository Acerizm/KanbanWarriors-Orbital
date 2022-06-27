import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// import reducers here
import backgroundImageReducer from "../Reducers/BackgroundImage/BackgroundImageSlice.js";
import AuthenticationReducer from "../Reducers/Authentication/AuthenticationSlice.js";
import AmbienceSoundsReducer from "../Reducers/AmbienceSounds/AmbienceSoundsSlice.js";
import SettingsReducer from "../Reducers/Settings/SettingsSlice.js";
import LiveRoomReducer from "../Reducers/LiveRoom/LiveRoomSlice.js";
import SocketReducer from "../Reducers/Socket/SocketSlice.js";

//custom middlewares here
import { SocketMiddleware } from "../Middlewares/index.js";
import { socket } from "../../SocketClient/index.js";

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
		LiveRoom: LiveRoomReducer,
		Socket: SocketReducer,
	},
	// --------------------------------------------------------- WARNING-------------------------------------------------
	// Removed redux default error notifications on console.log for non serializable data
	// documentation -> https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
	// why -> https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(SocketMiddleware(socket)),
});

export default store;
