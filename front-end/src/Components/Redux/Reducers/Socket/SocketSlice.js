import { createSlice } from "@reduxjs/toolkit";

const SocketSlice = createSlice({
	name: "Socket",
	initialState: {
		roomId: null,
	},
	reducers: {
		createRoom(state, action) {
			state.roomId = action.payload.roomId;
		},
		joinRoom(state, action) {
			state.roomId = action.payload.roomId;
		},
	},
});


//export actions
export const { createRoom, joinRoom } = SocketSlice.actions;

//export reducer
export default SocketSlice.reducer;

//export selectors
export const selectRoomId = (state) => state.Socket.roomId;
