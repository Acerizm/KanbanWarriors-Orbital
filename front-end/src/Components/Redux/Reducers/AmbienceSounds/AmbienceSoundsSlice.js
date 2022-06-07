import { createSlice } from "@reduxjs/toolkit";

const AmbienceSoundsSlice = createSlice({
	name: "AmbienceSounds",
	initialState: {
		Ocean: {
			isMuted: true,
		},
		Fireplace: {
			isMuted: true,
		},
		Cafe: {
			isMuted: true,
		},
		Nature: {
			isMuted: true,
		},
		Keyboard: {
			isMuted: true,
		},
		Rain: {
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
	}, // end of reducers
});

// export actions
export const { toggleMuteStatus } = AmbienceSoundsSlice.actions;
// export reducer
export default AmbienceSoundsSlice.reducer;
//Selectors
export const selectOceanState = (state) => state.AmbienceSounds.Ocean.isMuted;
export const selectFireplaceState = (state) =>
	state.AmbienceSounds.Fireplace.isMuted;
export const selectCafeState = (state) => state.AmbienceSounds.Cafe.isMuted;
export const selectNatureState = (state) => state.AmbienceSounds.Nature.isMuted;
export const selectKeyboardState = (state) =>
	state.AmbienceSounds.Keyboard.isMuted;
export const selectRainState = (state) => state.AmbienceSounds.Rain.isMuted;
export const selectAllState = (state) => state;
