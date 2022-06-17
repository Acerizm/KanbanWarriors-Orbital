// feel free to import other middlewares written by other people
// or create yr own middleware!
// middleware's codes/functions exits between when the user dispatches the action and when the reducer receives the action to process the state!
// useful for storing sockets in middleware and logging stuffs!
// example -> https://blog.campvanilla.com/redux-middleware-basics-getting-started-17dc31c6435c
//import io from "socket.io-client";
//import store from "../Store/store";

export const SocketMiddleware = (socket) => (state) => (next) => (action) => {
	let currentState = state.getState();
	if (action.type === "Socket/createRoom") {
		socket.emit("createRoom", action.payload.roomId);
	}
	if (action.type === "Socket/joinRoom") {
		socket.emit("joinRoom", action.payload.roomId);
	}

	// called last
	// to pass the action to the next middleware!
	next(action);
};
