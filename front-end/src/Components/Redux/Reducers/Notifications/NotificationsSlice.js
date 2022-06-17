import { createSlice } from "@reduxjs/toolkit";

const NotificationsSlice = createSlice({
	name: "Notifications",
	initialState: {
		showJoinRoomNotififcation: false,
	},
	reducers: {
		toggleJoinRoomNotification(state) {
			state.showJoinRoomNotififcation = !state.showJoinRoomNotififcation;
		},
	},
});

//export actions
export const { toggleJoinRoomNotification } = NotificationsSlice.actions;

//export reducer
export default NotificationsSlice.reducer;

//export selectors
export const selectJoinRoomNotificationState = (state) =>
	state.Notifications.showJoinRoomNotififcation;
