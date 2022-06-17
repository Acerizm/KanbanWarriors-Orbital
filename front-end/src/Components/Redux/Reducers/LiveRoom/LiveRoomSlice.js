import { createSlice } from "@reduxjs/toolkit";

const LiveRoomSlice = createSlice({
	name: "LiveRoom",
	initialState: {
		//currentInput: null,
		JoinOthersInput: "",
		showJoinOthersInput: true,
		InviteOthersInput: "",
		showInviteOthersInput: true,
		showBackdrop: false,
	},
	reducers: {
		blockInput(state, action) {
			if (action.payload === "JoinOthers") {
				state.showJoinOthersInput = false;
			} else {
				state.showInviteOthersInput = false;
			}
		},
		unblockInput(state, action) {
			if (action.payload === "JoinOthers") {
				state.showJoinOthersInput = true;
			} else {
				state.showInviteOthersInput = true;
			}
		},
		updateJoinOthersInput(state, action) {
			state.JoinOthersInput = action.payload;
		},
		updateInviteOthersInput(state, action) {
			state.InviteOthersInput = action.payload;
		},
		toggleBackdrop(state) {
			state.showBackdrop = !state.showBackdrop;
		},
	},
});

//export actions
export const {
	blockInput,
	unblockInput,
	updateInviteOthersInput,
	updateJoinOthersInput,
	toggleBackdrop,
} = LiveRoomSlice.actions;

//export reducers
export default LiveRoomSlice.reducer;

//export Selectors
export const selectShowJoinOthersInput = (state) =>
	state.LiveRoom.showJoinOthersInput;
export const selectJoinOthersInput = (state) => state.LiveRoom.JoinOthersInput;
export const selectShowInviteOthersInput = (state) =>
	state.LiveRoom.showInviteOthersInput;
export const selectInviteOthersInput = (state) =>
	state.LiveRoom.InviteOthersInput;
export const selectBackdropState = (state) => state.LiveRoom.showBackdrop;