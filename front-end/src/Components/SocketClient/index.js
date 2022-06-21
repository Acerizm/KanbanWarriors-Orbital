import io from "socket.io-client";

export const socket = io.connect("http://159.223.91.154:4000/");
