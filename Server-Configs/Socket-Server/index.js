const express = require("express");
const axios = require("axios");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const { PeerServer } = require("peer");

const cors = require("cors");
const peerServer = PeerServer({ path: "/peerServer" });
app.use(cors());
app.use("/peerjs", peerServer);

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		// add our web app in the future
		origin: "*",
		methods: ["GET", "POST"],
	},
});

// Socket.io logic
io.on("connection", (socket) => {
	console.log(`user ${socket.id} is connected`);
	// for joining room
	socket.on("joinRoom", (data) => {
		// check if the room exists
		axios
			.get(
				"http://localhost:5143/api/LiveRoom/CheckLockedRoom?roomId=" +
					data.roomId +
					"&password=" +
					data.password
			)
			.then((response) => {
				if (response.data == true) {
					// before the user joins the room, if he created a room
					// leave the room
					axios
						.get(
							"http://localhost:5143/api/LiveRoom/CheckRoomBySocketId?socketId=" +
								socket.id
						)
						.then((response) => {
							if (response.data !== null) {
								// this happens when there is a room
								let tempRoomId = response.data;
								socket.leave(tempRoomId);
								axios
									.delete(
										"http://localhost:5143/api/LiveRoom/DeleteSocketHost?socketId=" +
											socket.id
									)
									.then(() => {
										socket
											.to(response.data)
											.emit("receive_room_message", {
												message: `Host of this room has left! Disconnected from room...`,
											});
										io.in(response.data).socketsLeave(
											response.data
										);
									})
									.catch((error) => {
										console.log(error.message);
									});
							}

							//then clear the user if the user has joined any other rooms before
							socket.rooms.forEach((key, value) => {
								if (value !== socket.id) {
									socket
										.to(value)
										.emit("receive_room_message", {
											message: "someone left the room",
										});
									socket.leave(value);
								}
							});

							// then join normally
							// if the room exists & the password is correct, the user can join
							socket.join(data.roomId);
							// informed the user that the user has joined
							socket.emit("receive_room_message", {
								message: `You have successfully joined room ${data.roomId} !`,
								success: true,
							});
							socket
								.to(data.roomId)
								.emit("receive_room_message", {
									message: `someone has joined the room`,
								});
							// then let update the database so that the user will appear under the online section
							let payload = {
								roomId: data.roomId,
								user: {
									userId: data.user.userId,
									userAvatar: data.user.userAvatar,
									userName: data.user.userName,
									socketId: socket.id,
								},
							};
							axios
								.post(
									"http://localhost:5143/api/LiveRoom/UpdateUserOnlineList",
									payload
								)
								.then(() => {
									socket
										.to(data.roomId)
										.emit("updateOnlineUsers", {});
								});
						});
				} else {
					// inform the user that the user cannot join because the room does not exists or the password is wrong
					socket.emit("receive_room_message", {
						message: `Room ${data.roomId} does not exists or the password is wrong`,
					});
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	});
	// for creating room
	socket.on("createRoom", (data) => {
		// check if the roomdId is already taken
		axios
			.get(
				"http://localhost:5143/api/LiveRoom/CheckLockedRoom?roomId=" +
					data.roomId +
					"&password=" +
					data.password
			)
			.then((response) => {
				// if response = true
				// return error to user
				if (response.data) {
					socket.emit("receive_room_message", {
						message: `Room ${data.roomId} has already been created by another user !`,
					});
				} else if (response.data === false) {
					// else connect user to room
					// and let database know that the user has hosted a room
					// 1. Must check that the user did not create any prior rooms before
					// so that socket.io can free up the room
					// code will be similar to disconnect feature
					axios
						.get(
							"http://localhost:5143/api/LiveRoom/CheckRoomBySocketId?socketId=" +
								socket.id
						)
						.then((response) => {
							if (response.data !== null) {
								// this happens when there is a room that has already been created by the host
								// so delete the room so that the previous room that the host created is freed up for other hosts to use
								let tempRoomId = response.data;
								socket.leave(tempRoomId);
								axios
									.delete(
										"http://localhost:5143/api/LiveRoom/DeleteSocketHost?socketId=" +
											socket.id
									)
									.then(() => {
										socket
											.to(response.data)
											.emit("receive_room_message", {
												message: `Host of this room has left! Disconnected from room...`,
											});
										io.in(response.data).socketsLeave(
											response.data
										);
									})
									.catch((error) => {
										// pass to rollbar this error
										console.log(error.message);
									});
							}
							// then join normally
							// but must clear the sockets from existing rooms if he joined a room before
							socket.rooms.forEach((key, value) => {
								if (value !== socket.id) {
									socket
										.to(value)
										.emit("receive_room_message", {
											message: "someone left the room",
										});
									socket.leave(value);
								}
							});
							socket.join(data.roomId);
							let payload = {
								socketId: socket.id,
								roomId: data.roomId,
								password: data.password,
								user: {
									userId: data.user.userId,
									userAvatar: data.user.userAvatar,
									userName: data.user.userName,
									socketId: socket.id,
								},
							};
							axios
								.post(
									// "http://localhost:5143/api/LiveRoom/CreateNewLockedRoom?socketId=" +
									// 	socket.id +
									// 	"&roomId=" +
									// 	data.roomId +
									// 	"&password=" +
									// 	data.password
									// modify this to fit new requirements of passing the current user to the API as of 23/07/2022
									"http://localhost:5143/api/LiveRoom/CreateNewLockedRoom",
									payload
								)
								.then(() => {
									socket.emit("receive_room_message", {
										message: `You have created room ${data.roomId} !`,
										success: true,
									});
								})
								.catch((error) => {
									console.log(error.message);
								});
						})
						.catch((error) => {
							console.log(error.message);
						});
				} else {
					// do nothing
				}
			})
			.catch((error) => {
				console.log(error.message);
			});
	});

	socket.on("disconnecting", (reason) => {
		//if the socket is not the fake "host"
		//let everyone know you disconnected from the room
		socket.rooms.forEach((key, value) => {
			if (value !== socket.id) {
				socket.to(value).emit("receive_room_message", {
					message: "someone left the room",
				});
			}
		});
		// then delete the user from the UserOnline list and channels that the user is in
		// our architecture only allows the user to be in a single room at one point of time
		let roomsIter = socket.rooms.values();
		roomsIter.next();
		let tempRoomId = roomsIter.next().value;
		if (tempRoomId != undefined) {
			let payload = {
				roomId: tempRoomId,
				socketId: socket.id,
			};
			axios
				.post(
					"http://localhost:5143/api/LiveRoom/DisconnectingUser",
					payload
				)
				.then(() => {
					// Tell others to pull the data again
					socket
						.to(tempRoomId)
						.emit("receive_other_user_toggle_channel", {});
					socket.to(tempRoomId).emit("updateOnlineUsers", {});

					// 2. check if the socket is the fake "host" of the room
					// 	by checking if the socket id exists in the database
					axios
						.get(
							"http://localhost:5143/api/LiveRoom/CheckRoomBySocketId?socketId=" +
								socket.id
						)
						.then((response) => {
							if (response.data !== null) {
								// inform others that the "host" has disconnected
								// then make all sockets leave the room but not disconnect them as the clients might want to use socket.io again
								axios
									.delete(
										"http://localhost:5143/api/LiveRoom/DeleteSocketHost?socketId=" +
											socket.id
									)
									.then(() => {
										socket
											.to(response.data)
											.emit("receive_room_message", {
												message: `Host of this room has left! Disconnected from room...`,
											});
										io.in(response.data).socketsLeave(
											response.data
										);
									})
									.catch((error) => {
										console.log(error.message);
									});
							} else {
							}
						})
						.catch((error) => {
							console.log(error.message);
						});
				})
				.catch((error) => console.log(error));
		}
	});
	// to handle disconnect feature
	socket.on("disconnect", (reason) => {});
	// for sharing user's draggable position
	// user in react app sends "send_user_positions"!
	// while server sends "receive_other_users_positions" to react app users
	// Observer pattern is used here :)
	socket.on("send_user_settings_positions", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_settings_positions", data.position);
	});
	socket.on("send_user_navbar_positions", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_navbar_positions", data.position);
	});
	socket.on("send_user_liveroombutton_positions", (data) => {
		socket
			.to(data.roomId)
			.emit(
				"receive_other_users_liveroombutton_positions",
				data.position
			);
	});
	socket.on("send_user_ambience_positions", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_ambience_positions", data.position);
	});
	socket.on("send_user_clock_positions", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_clock_positions", data.position);
	});
	socket.on("send_user_clock_color", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_clock_color", data.color);
	});
	socket.on("send_user_background_settings", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_background_settings", data);
	});
	// -----------------------------------for background feature-----------------------------------------------

	socket.on("send_user_category_selected", (data) => {
		socket
			.to(data.roomId)
			.emit(
				"receive_other_users_category_selected",
				data.categorySelected
			);
	});
	socket.on("send_user_image_id", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_image_id", data.imageId);
	});
	socket.on("send_user_rng", (data) => {
		socket.to(data.roomId).emit("receive_other_users_rng", data.rng);
	});
	socket.on("send_user_youtube_rng", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_youtube_rng", data.youtubeRng);
	});
	socket.on("send_user_drawer_on", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_drawer_on", data.isDrawerOn);
	});
	socket.on("send_user_drawer_off", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_drawer_off", data.isDrawerOn);
	});
	// ----------------------------------------------------------------------------------------------------------
	socket.on("send_user_toggle_ambience_player", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_toggle_ambience_player");
	});

	socket.on("send_user_webcam_positions", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_webcam_positions", data.webcamUsers);
	});

	// ---------------------------------------- live chat feature ------------------------------------------------
	socket.on("send_new_message", (data) => {
		//console.log(data.message);
		socket.to(data.roomId).emit("receive_new_message", {
			message: data.message,
			userName: data.userName,
			userId: data.userId,
			userAvatar: data.userAvatar,
		});
	});

	socket.on("send_user_toggle_channel", (data) => {
		socket.to(data.roomId).emit("receive_other_user_toggle_channel", {});
	});
});

// PeerServer.js logic here
peerServer.on("connection", (client) => {});

// This code will run when
// 1. when the peer disconnects from the server gracefully
// 2. when the peer disconnects from the server when computer crashes, closes tab .etc
peerServer.on("disconnect", (client) => {});

server.listen(4000, () => {
	console.log("server is running");
});
