import { createSlice } from "@reduxjs/toolkit";

const LiveRoomSlice = createSlice({
	name: "LiveRoom",
	initialState: {
		//currentInput: null,
		JoinOthersInput: "",
		JoinOthersPassword: "",
		showJoinOthersInput: true,
		InviteOthersInput: "",
		InviteOthersPassword: "",
		showInviteOthersInput: true,
		showBackdrop: false,
		showVideoSection: false,
		OnlineUsers: [],
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
		updateInviteOthersPassword(state, action) {
			state.InviteOthersPassword = action.payload;
		},
		updateJoinOthersPassword(state, action) {
			state.JoinOthersPassword = action.payload;
		},
		toggleBackdrop(state) {
			state.showBackdrop = !state.showBackdrop;
		},
		toggleVideoSection(state) {
			state.showVideoSection = !state.showVideoSection;
		},
		updateOnlineUsers(state, action) {
			state.OnlineUsers = action.payload;
		},
	},
});

//export actions
export const {
	blockInput,
	unblockInput,
	updateInviteOthersInput,
	updateJoinOthersInput,
	updateInviteOthersPassword,
	updateJoinOthersPassword,
	toggleBackdrop,
	toggleVideoSection,
	updateOnlineUsers,
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
export const selectJoinOthersPassword = (state) =>
	state.LiveRoom.JoinOthersPassword;
export const selectInviteOthersPassword = (state) =>
	state.LiveRoom.InviteOthersPassword;
export const selectBackdropState = (state) => state.LiveRoom.showBackdrop;
export const selectShowVideoSectionState = (state) =>
	state.LiveRoom.showVideoSection;
export const selectOnlineUsers = (state) => state.LiveRoom.OnlineUsers;
