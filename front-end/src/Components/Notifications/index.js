import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import { socket } from "../SocketClient/index.js";

const Notifications = () => {
	const [isOpen, toggleNotification] = React.useState(false);
	const [message, setMessage] = React.useState("");
	useEffect(() => {
		socket.on("receive_room_message", (data) => {
			setMessage(data.message);
			toggleNotification(true);
		});
	}, [socket]);
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			open={isOpen}
			onClose={() => {
				toggleNotification(false);
			}}
			message={message}
			autoHideDuration={2000}
		/>
	);
};

export default Notifications;
