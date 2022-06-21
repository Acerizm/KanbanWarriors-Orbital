const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		// add our web app in the future
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log(`user ${socket.id} is connected`);

	// for joining room
	socket.on("joinRoom", (roomId) => {
		socket.join(roomId);
		console.log(`user ${socket.id} joined ${roomId}`);
	});
	// for creating room
	socket.on("createRoom", (roomId) => {
		socket.join(roomId);
		console.log(`user ${socket.id} created room ${roomId}`);
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
