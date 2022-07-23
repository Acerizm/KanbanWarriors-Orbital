import {
	useState,
	useMemo,
	useCallback,
	useEffect,
	useRef,
	Fragment,
} from "react";
import { Virtuoso } from "react-virtuoso";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectRoomId } from "../../Redux/Reducers/Socket/SocketSlice.js";
import {
	updateOnlineUsers,
	selectOnlineUsers,
} from "../../Redux/Reducers/LiveRoom/LiveRoomSlice.js";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { socket } from "../../SocketClient/index.js";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

const OnlineSection = () => {
	const roomId = useSelector(selectRoomId);
	const dispatch = useDispatch();
	const OnlineUsers = useSelector(selectOnlineUsers);
	useEffect(() => {
		// pull data of online users in the room currently
		axios
			.get(
				"http://localhost:5143/api/LiveRoom/GetOnlineUsers?roomId=" +
					roomId
			)
			.then((response) => {
				dispatch(updateOnlineUsers(response.data));
			})
			.catch((error) => console.log("something went wrong"));
	}, []);
	useEffect(() => {
		socket.on("updateOnlineUsers", () => {
			axios
				.get(
					"http://localhost:5143/api/LiveRoom/GetOnlineUsers?roomId=" +
						roomId
				)
				.then((response) => {
					dispatch(updateOnlineUsers(response.data));
				})
				.catch((error) => console.log("something went wrong"));
		});
	}, [socket]);
	return (
		<Fragment>
			<div
				style={{
					gridColumn: "3 / 3",
					gridRow: "1 / 1",
					width: "100%",
					height: "20px",
					fontFamily: "arial",
					fontSize: "15px",
					paddingLeft: "30px",
					paddingTop: "10px",
					zIndex: "10",
					//border: "2px solid black",
					backgroundColor: "#F2F3F5",
				}}
			>
				Online - {OnlineUsers.length}
			</div>
			<Virtuoso
				style={{
					backgroundColor: "#F2F3F5",
					gridColumn: "3 / 3",
					gridRow: "1 / 1",
					width: "100%",
					height: "calc(100% - 30px)",
					alignSelf: "end",
				}}
				data={OnlineUsers}
				itemContent={(index, user) => {
					console.log(user);
					return (
						<ListItem
							sx={{
								paddingTop: 0,
							}}
						>
							<ListItemButton>
								<ListItemIcon>
									<StyledBadge
										overlap="circular"
										anchorOrigin={{
											vertical: "bottom",
											horizontal: "right",
										}}
										variant="dot"
									>
										<Avatar src={user.userAvatar} />
									</StyledBadge>
								</ListItemIcon>
								<ListItemText primary={user.userName} />
							</ListItemButton>
						</ListItem>
					);
				}}
			/>
		</Fragment>
	);
};

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px #EBEDEF`,
		height: "12px",
		width: "12px",
		borderRadius: "10px",
	},
}));

export default OnlineSection;
