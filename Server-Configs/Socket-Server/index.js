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

	// for joining room!
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
	socket.on("send_user_positions", (data) => {
		socket.to(data.room).emit("receive_other_users_positions", data);
	});
});

server.listen(4000, () => {
	console.log("server is running");
});
