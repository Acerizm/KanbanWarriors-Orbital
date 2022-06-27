import io from "socket.io-client";

//for production
export const socket = io.connect("http://159.223.91.154:4000");

//for development
//export const socket = io.connect("http://localhost:4000");
