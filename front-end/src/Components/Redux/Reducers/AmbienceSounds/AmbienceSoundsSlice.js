import { createSlice } from "@reduxjs/toolkit";

const AmbienceSoundsSlice = createSlice({
	name: "AmbienceSounds",
	initialState: {
		isPlayerShown: false,
		playerLastPosition: {
			x: 50,
			y: 100,
		},
		Ocean: {
			volume: 0,
			isMuted: true,
		},
		Fireplace: {
			volume: 0,
			isMuted: true,
		},
		Cafe: {
			volume: 0,
			isMuted: true,
		},
		Nature: {
			volume: 0,
			isMuted: true,
		},
		Keyboard: {
			volume: 0,
			isMuted: true,
		},
		Rain: {
			volume: 0,
			isMuted: true,
		},
	},
	reducers: {
		toggleMuteStatus(state, action) {
			switch (action.payload) {
				case "MuteOcean": {
					state.Ocean.isMuted = true;
					break;
				}
				case "UnmuteOcean": {
					state.Ocean.isMuted = false;
					break;
				}
				case "MuteFireplace": {
					state.Fireplace.isMuted = true;
					break;
				}
				case "UnmuteFireplace": {
					state.Fireplace.isMuted = false;
					break;
				}
				case "MuteCafe": {
					state.Cafe.isMuted = true;
					break;
				}
				case "UnmuteCafe": {
					state.Cafe.isMuted = false;
					break;
				}
				case "MuteNature": {
					state.Nature.isMuted = true;
					break;
				}
				case "UnmuteNature": {
					state.Nature.isMuted = false;
					break;
				}
				case "MuteKeyboard": {
					state.Keyboard.isMuted = true;
					break;
				}
				case "UnmuteKeyboard": {
					state.Keyboard.isMuted = false;
					break;
				}
				case "MuteRain": {
					state.Rain.isMuted = true;
					break;
				}
				case "UnmuteRain": {
					state.Rain.isMuted = false;
					break;
				}
				default:
					break;
			}
		},
		togglePlayer(state) {
			if (state.isPlayerShown) {
				state.isPlayerShown = false;
			} else {
				state.isPlayerShown = true;
			}
		},
		updateVolume(state, action) {
			switch (action.payload.type) {
				case "Ocean": {
					state.Ocean.volume = action.payload.volume;
					break;
				}
				case "Fireplace": {
					state.Fireplace.volume = action.payload.volume;
					break;
				}
				case "Cafe": {
					state.Cafe.volume = action.payload.volume;
					break;
				}
				case "Nature": {
					state.Nature.volume = action.payload.volume;
					break;
				}
				case "Keyboard": {
					state.Keyboard.volume = action.payload.volume;
					break;
				}
				case "Rain": {
					state.Rain.volume = action.payload.volume;
					break;
				}
				default:
					break;
			}
		},
		updatePlayerLastPosition(state, action) {
			state.playerLastPosition = action.payload;
		},
	}, // end of reducers
});

// export actions
export const {
	toggleMuteStatus,
	togglePlayer,
	updateVolume,
	updatePlayerLastPosition,
} = AmbienceSoundsSlice.actions;
// export reducer
export default AmbienceSoundsSlice.reducer;
//Selectors
export const selectOceanMutedStatus = (state) =>
	state.AmbienceSounds.Ocean.isMuted;
export const selectFireplaceMutedStatus = (state) =>
	state.AmbienceSounds.Fireplace.isMuted;
export const selectCafeMutedStatus = (state) =>
	state.AmbienceSounds.Cafe.isMuted;
export const selectNatureMutedStatus = (state) =>
	state.AmbienceSounds.Nature.isMuted;
export const selectKeyboardMutedStatus = (state) =>
	state.AmbienceSounds.Keyboard.isMuted;
export const selectRainMutedStatus = (state) =>
	state.AmbienceSounds.Rain.isMuted;
export const selectPlayerStatus = (state) => state.AmbienceSounds.isPlayerShown;

// for video player
export const selectOceanVolume = (state) => state.AmbienceSounds.Ocean.volume;
export const selectFireplaceVolume = (state) =>
	state.AmbienceSounds.Fireplace.volume;
export const selectCafeVolume = (state) => state.AmbienceSounds.Cafe.volume;
export const selectNatureVolume = (state) => state.AmbienceSounds.Nature.volume;
export const selectKeyboardVolume = (state) =>
	state.AmbienceSounds.Keyboard.volume;
export const selectRainVolume = (state) => state.AmbienceSounds.Rain.volume;

// for draggable
export const selectLastPlayerPosition = (state) =>
	state.AmbienceSounds.playerLastPosition;
