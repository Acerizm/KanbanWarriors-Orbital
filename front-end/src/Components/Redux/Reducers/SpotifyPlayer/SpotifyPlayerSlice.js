import { createSlice } from "@reduxjs/toolkit";

// ------------------------------- Reducers ------------------------------------------------------------------------------------------------------
const spotifyPlayerSlice = createSlice({
    name: "spotifyPlayer",
    initialState: {
        isPlayerDisplayed:false,
        isAudioPlayerDisplayed: false
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
        },
        audioPlayerModeOn(state) {
            state.isAudioPlayerDisplayed = true;
        },
        audioPlayerModeOff(state) {
            state.isAudioPlayerDisplayed = false;
        },
    }

})

// Exporting Reducers/Actions
export const {toggleMusicPlayer, displayMusicPlayerOn, displayMusicPlayerOff, audioPlayerModeOn, audioPlayerModeOff} = spotifyPlayerSlice.actions;

export default spotifyPlayerSlice.reducer;

// Selectors
export const getPlayerState = (state) => state.spotifyPlayer.isPlayerDisplayed;
export const getAudioPlayerState = (state) => state.spotifyPlayer.isAudioPlayerDisplayed;