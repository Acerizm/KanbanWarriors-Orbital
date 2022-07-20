import { createSlice } from "@reduxjs/toolkit";

const LiveChatSlice = createSlice({
	name: "LiveChat",
	initialState: {
		isDrawerOpen: false,
		// migrated messages from front-end component to redux toolkit
		messages: [],
		currentChannelUsers: [],
	},
	reducers: {
		toggleDrawer(state) {
			state.isDrawerOpen = !state.isDrawerOpen;
		},
		addMessage(state, action) {
			let newMessage = action.payload;
			if (state.messages.length > 0) {
				if (
					state.messages[state.messages.length - 1].userId ==
					newMessage.userId
				) {
					let tempMessage = {
						userId: newMessage.userId,
						userName: newMessage.userName,
						text: [
							...state.messages[state.messages.length - 1].text,
							newMessage.message,
						],
						userAvatar: newMessage.userAvatar,
					};
					state.messages = [
						...state.messages.slice(0, state.messages.length - 1),
						tempMessage,
					];
				} else {
					// this happens when a different user sends the message compared to the latest message in the stack which belongs to a different user
					let tempMessage2 = {
						userId: newMessage.userId,
						userName: newMessage.userName,
						text: [newMessage.message],
						userAvatar: newMessage.userAvatar,
					};
					state.messages = [...state.messages, tempMessage2];
				}
			} else {
				// when the message array is initially empty
				let tempMessage3 = {
					userId: newMessage.userId,
					userName: newMessage.userName,
					text: [newMessage.message],
					userAvatar: newMessage.userAvatar,
				};
				state.messages = [tempMessage3];
			}
		},
		toggleChannel(state, action) {
			// this happenes when the user does not exists in the current user list
			// action.payload refers to the object being passed from the front end with this signature
			/* {
				userName: auth.currentUser.displayName,
				userAvatar: auth.currentUser.photoURL,
				userId: auth.currentUser.uid,
			 }
			 */
			let tempUser = action.payload;
			if (
				state.currentChannelUsers.find(
					(user) => user.userId === tempUser.userId
				) === undefined
			) {
				state.currentChannelUsers = [
					...state.currentChannelUsers,
					action.payload,
				];
			} else {
				// this happens when the user is already part of the current user list of the channel
				// remove the user from the channel
				// this mimics leaving the channel
				let newChannelUsers = state.currentChannelUsers.filter(
					(user) => user.userId !== tempUser.userId
				);
				state.currentChannelUsers = newChannelUsers;
			}
		},
	},
});

//export actions
export const { toggleDrawer, addMessage, toggleChannel } =
	LiveChatSlice.actions;

//export reducers
export default LiveChatSlice.reducer;

//export selectors
export const selectDrawerState = (state) => state.LiveChat.isDrawerOpen;
export const selectMessages = (state) => state.LiveChat.messages;
export const selectCurrentChannelUsers = (state) =>
	state.LiveChat.currentChannelUsers;
