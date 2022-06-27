// feel free to import other middlewares written by other people
// or create yr own middleware!
// middleware's codes/functions exits between when the user dispatches the action and when the reducer receives the action to process the state!
// useful for storing sockets in middleware and logging stuffs!
// example -> https://blog.campvanilla.com/redux-middleware-basics-getting-started-17dc31c6435c

export const SocketMiddleware =
	(socket) =>
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		//console.log(getState());
		if (action.type === "Socket/createRoom") {
			socket.emit("createRoom", {
				roomId: action.payload.roomId,
				password: action.payload.password,
			});
		}
		if (action.type === "Socket/joinRoom") {
			socket.emit("joinRoom", {
				roomId: action.payload.roomId,
				password: action.payload.password,
			});
		}

		// ---------------------- for background category feature as a Sender -----------------------------------------

		if (action.type === "backgroundImage/changeVideoId") {
			let roomId = getState().Socket.roomId;
			if (roomId !== null) {
				socket.emit("send_user_video_id", {
					roomId: roomId,
					videoId: action.payload,
				});
			}
		}

		if (action.type === "backgroundImage/changeCategory") {
			let roomId = getState().Socket.roomId;
			if (roomId !== null) {
				socket.emit("send_user_category_selected", {
					roomId: roomId,
					categorySelected: action.payload,
				});
			}
		}

		if (action.type === "backgroundImage/changeStaticImageId") {
			let roomId = getState().Socket.roomId;
			if (roomId !== null) {
				socket.emit("send_user_image_id", {
					roomId: roomId,
					imageId: action.payload,
				});
			}
		}

		if (action.type === "backgroundImage/changeRng") {
			let roomId = getState().Socket.roomId;
			if (roomId !== null) {
				socket.emit("send_user_rng", {
					roomId: roomId,
					rng: action.payload,
				});
			}
		}

		if (action.type === "backgroundImage/changeYoutubeRng") {
			let roomId = getState().Socket.roomId;
			if (roomId !== null) {
				socket.emit("send_user_youtube_rng", {
					roomId: roomId,
					youtubeRng: action.payload,
				});
			}
		}

		if (action.type === "backgroundImage/toggleDrawerOn") {
			let roomId = getState().Socket.roomId;
			if (roomId !== null) {
				socket.emit("send_user_drawer_on", {
					roomId: roomId,
					isDrawerOn: true,
				});
			}
		}

		if (action.type === "backgroundImage/toggleDrawerOff") {
			let roomId = getState().Socket.roomId;
			if (roomId !== null) {
				socket.emit("send_user_drawer_off", {
					roomId: roomId,
					isDrawerOn: false,
				});
			}
		}

		// --------------------------------------------------------------------------------------------------

		// ---------------------------------------for ambience music----------------------------------------
		if (action.type === "AmbienceSounds/togglePlayer") {
			let roomId = getState().Socket.roomId;
			if (roomId !== null) {
				socket.emit("send_user_toggle_ambience_player", {
					roomId: roomId,
					// isPlayerShown: false,
				});
			}
		}

		// if (action.type === "AmbienceSounds/togglePlayer") {
		// 	let roomId = getState().Socket.roomId;
		// 	if (roomId !== null) {
		// 		socket.emit("send_user_toggle_ambience_player", {
		// 			roomId: roomId,
		// 			// isPlayerShown: false,
		// 		});
		// 	}
		// }

		// ---------------------------------------------------------------------------------------------------

		// ---------------------------------- for navbar ----------------------------------------------------

		// ---------------------------------------------------------------------------------------------------
		// called last
		// to pass the action to the next middleware!
		next(action);
	};
