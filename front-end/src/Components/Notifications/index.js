import React, { Fragment, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import * as REDUX from "../Redux/Reducers/Notifications/NotificationsSlice.js";
import { selectJoinOthersInput } from "../Redux/Reducers/LiveRoom/LiveRoomSlice.js";

const Notifications = () => {
	return (
		<Fragment>
			<JoinRoomNotification />
		</Fragment>
	);
};

const JoinRoomNotification = () => {
	const dispatch = useDispatch();
	const showNotification = useSelector(REDUX.selectJoinRoomNotificationState);
	const roomId = useSelector(selectJoinOthersInput);
	return (
		<Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			open={showNotification}
			onClose={() => {
				dispatch(REDUX.toggleJoinRoomNotification());
			}}
			//TransitionComponent={<Slide direction="right" />}
			message={`Successfully joined room ${roomId} !`}
			autoHideDuration={3000}
			//key={transition ? transition.name : ""}
		/>
	);
};

export default Notifications;
