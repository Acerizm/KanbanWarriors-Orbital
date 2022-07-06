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
		}
    }

})

// Exporting Reducers/Actions
export const {toggleMusicPlayer} = spotifyPlayerSlice.actions;

export default spotifyPlayerSlice.reducer;

// Selectors
export const getPlayerState = (state) => state.spotifyPlayer.isPlayerDisplayed;