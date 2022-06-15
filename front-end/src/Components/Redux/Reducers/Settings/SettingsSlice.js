import { createSlice } from "@reduxjs/toolkit";

const SettingsSlice = createSlice({
	name: "Settings",
	initialState: {
		SettingsLastPosition: {
			x: 0,
			y: 0,
		},
		showBackdrop: false,
	},
	reducers: {
		updateSettingsLastPosition(state, action) {
			state.SettingsLastPosition = action.payload;
		},
		toggleBackdrop(state) {
			state.showBackdrop
				? (state.showBackdrop = false)
				: (state.showBackdrop = true);
		},
	},
});

//export actions
export const { updateSettingsLastPosition, toggleBackdrop } =
	SettingsSlice.actions;

//export reducer
export default SettingsSlice.reducer;

//export selectors
export const selectSettingsLastPosition = (state) =>
	state.Settings.SettingsLastPosition;

export const selectBackdropState = (state) => state.Settings.showBackdrop;
