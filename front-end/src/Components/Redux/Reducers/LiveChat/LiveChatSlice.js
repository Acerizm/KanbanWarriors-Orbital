import { createSlice } from "@reduxjs/toolkit";

const LiveChatSlice = createSlice({
	name: "LiveChat",
	initialState: {
		isDrawerOpen: false,
	},
	reducers: {
		toggleDrawer(state) {
			state.isDrawerOpen = !state.isDrawerOpen;
		},
	},
});

//export actions
export const { toggleDrawer } = LiveChatSlice.actions;

//export reducers
export default LiveChatSlice.reducer;

//export selectors
export const selectDrawerState = (state) => state.LiveChat.isDrawerOpen;
