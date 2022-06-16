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

	socket.on("send_message", (data) => {
		console.log(data);
		// can also send back to the clients
		socket.broadcast.emit("receive_message", data);
	});
});
server.listen(4000, () => {
	console.log("server is running");
});
