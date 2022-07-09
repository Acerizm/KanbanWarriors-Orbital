import { createSlice } from "@reduxjs/toolkit";

// ------------------------------- Reducers ------------------------------------------------------------------------------------------------------
const spotifyPlayerSlice = createSlice({
    name: "spotifyPlayer",
    initialState: {
        isPlayerDisplayed:false,
    },
    reducers : {
        toggleMusicPlayer(state) {
			state.isPlayerDisplayed = !state.isPlayerDisplayed;
		},
        displayMusicPlayerOn(state) {
            state.isPlayerDisplayed = true;
        },
        displayMusicPlayerOff(state) {
            state.isPlayerDisplayed = false;
        }

    }

})

// Exporting Reducers/Actions
export const {toggleMusicPlayer, displayMusicPlayerOn, displayMusicPlayerOff} = spotifyPlayerSlice.actions;

export default spotifyPlayerSlice.reducer;

// Selectors
export const getPlayerState = (state) => state.spotifyPlayer.isPlayerDisplayed;