const express = require("express");
const axios = require("axios");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		// add our web app in the future
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log(`user ${socket.id} is connected`);
	// for joining room
	socket.on("joinRoom", (data) => {
		// check if the room exists
		axios
			.get(
				"http://159.223.91.154:500/api/LiveRoom/CheckLockedRoom?roomId=" +
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
							"http://159.223.91.154:500/api/LiveRoom/CheckRoomBySocketId?socketId=" +
								socket.id
						)
						.then((response) => {
							if (response.data !== null) {
								// this happens when there is a room
								let tempRoomId = response.data;
								socket.leave(tempRoomId);
								axios
									.delete(
										"http://159.223.91.154:500/api/LiveRoom/DeleteSocketHost?socketId=" +
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
							console.log(
								`user ${socket.id} joined ${data.roomId}`
							);
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
				"http://159.223.91.154:500/api/LiveRoom/CheckLockedRoom?roomId=" +
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
							"http://159.223.91.154:500/api/LiveRoom/CheckRoomBySocketId?socketId=" +
								socket.id
						)
						.then((response) => {
							if (response.data !== null) {
								// this happens when there is a room
								let tempRoomId = response.data;
								socket.leave(tempRoomId);
								axios
									.delete(
										"http://159.223.91.154:500/api/LiveRoom/DeleteSocketHost?socketId=" +
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
							// then join normally
							// but must clear the socket from existing rooms if he joined a room before
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
							axios
								.post(
									"http://159.223.91.154:500/api/LiveRoom/CreateNewLockedRoom?socketId=" +
										socket.id +
										"&roomId=" +
										data.roomId +
										"&password=" +
										data.password
								)
								.then(() => {
									console.log(
										`user ${socket.id} created room ${data.roomId}`
									);
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
	});
	// to handle disconnect feature
	socket.on("disconnect", (reason) => {
		// 1. check if the socket is the fake "host" of the room
		// 	by checking if the socket id exists in the database
		axios
			.get(
				"http://159.223.91.154:500/api/LiveRoom/CheckRoomBySocketId?socketId=" +
					socket.id
			)
			.then((response) => {
				if (response.data !== null) {
					// inform others that the "host" has disconnected
					// then make all sockets leave the room but not disconnect them as the clients might want to use socket.io again
					axios
						.delete(
							"http://159.223.91.154:500/api/LiveRoom/DeleteSocketHost?socketId=" +
								socket.id
						)
						.then(() => {
							socket
								.to(response.data)
								.emit("receive_room_message", {
									message: `Host of this room has left! Disconnected from room...`,
								});
							io.in(response.data).socketsLeave(response.data);
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
	});
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
	socket.on("send_user_video_id", (data) => {
		socket
			.to(data.roomId)
			.emit("receive_other_users_video_id", data.videoId);
	});
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
});

server.listen(4000, () => {
	console.log("server is running");
});
