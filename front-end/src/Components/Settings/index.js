import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import * as CSS from "./css.js";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import * as REDUX from "../Redux/Reducers/Settings/SettingsSlice.js";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { auth } from "../Auth/Firebase/index.js";
import { signOut } from "firebase/auth";
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from "react-router-dom";
// lottie player
import { Player } from "@lottiefiles/react-lottie-player";
import { selectRoomId } from "../Redux/Reducers/Socket/SocketSlice.js";

import { socket } from "../SocketClient/index.js";

const logout = () => {
	signOut(auth);
};

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		}, // end of "& .MuiPaper-root"
	},
}));

const SettingsButton = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const dispatch = useDispatch();
	const [isDragging, updateDraggingStatus] = React.useState(false);
	const eventControl = (event, data) => {
		if (event.type === "mousedown" || event.type === "touchmove") {
			// do nothing
		}
		if (event.type === "mouseup" || event.type === "touchend") {
			// setTimeout so that user can click it after drag :p
			setTimeout(() => {
				updateDraggingStatus(false);
			}, 100);
		}
		if (event.type === "mousemove") {
			updateDraggingStatus(true);
			updatePosition({
				x: data.x,
				y: data.y,
			});
			//also update positions for other users!
			if (selectRoomId !== null) {
				socket.emit("send_user_positions", {
					position: currentPosition,
					roomId: roomId,
				});
			}
		}
	};
	const [currentPosition, updatePosition] = React.useState({
		x: 0,
		y: 0,
	});
	const roomId = useSelector(selectRoomId);
	//const currentPosition = useSelector(REDUX.selectSettingsLastPosition);
	useEffect(() => {
		socket.on("receive_other_users_positions", (settingsLastPosition) => {
			updatePosition(settingsLastPosition);
		});
	}, [socket]);

	return (
		<React.Fragment>
			<Draggable
				axis="both"
				handle="#demo-customized-button"
				position={currentPosition}
				defaultClassName="draggableSettingsButton"
				scale={1}
				onStart={(event, data) => {
					eventControl(event);
				}}
				onStop={(event, data) => {
					eventControl(event);
				}}
				onDrag={(event, data) => {
					eventControl(event, data);
				}}
			>
				<div
					id="settingsButtonContainer"
					style={{ ...CSS.SettingsButtonContainerStyle }}
				>
					<Button
						id="demo-customized-button"
						aria-controls={
							open ? "demo-customized-menu" : undefined
						}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						variant="contained"
						disableElevation
						disabled={isDragging}
						onClick={(event) => {
							handleClick(event);
						}}
						sx={{
							"&.MuiButton-root.Mui-disabled": {
								backgroundColor: "white",
							},
							"&.MuiButton-root:hover": {
								backgroundColor: "white",
							},
							color: "black",
							backgroundColor: "white",
						}}
						// endIcon={<KeyboardArrowDownIcon />}
					>
						<Player
							autoplay
							loop
							src="https://assets5.lottiefiles.com/packages/lf20_8y92hieq.json"
							style={{ ...CSS.lotticonStyle }}
						/>
					</Button>
					<StyledMenu
						id="demo-customized-menu"
						MenuListProps={{
							"aria-labelledby": "demo-customized-button",
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose} disableRipple>
							<EditIcon />
							to be confirmed
						</MenuItem>
						<MenuItem onClick={handleClose} disableRipple>
							<FileCopyIcon />
							to be confirmed
						</MenuItem>
						<Divider sx={{ my: 0.5 }} />
						<MenuItem
							onClick={() => {
								handleClose();
								dispatch(REDUX.toggleBackdrop());
							}}
						>
							<PowerSettingsNewIcon />
							Log Out
						</MenuItem>
					</StyledMenu>
				</div>
			</Draggable>
			<CustomLogoutBackdrop />
		</React.Fragment>
	);
};

//------------------------------------------------------------------------------ Backdrop for Logout feature -----------------------------------------------------------------
const CustomLogoutBackdrop = () => {
	const showBackdrop = useSelector(REDUX.selectBackdropState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<React.Fragment>
			{showBackdrop ? (
				<Backdrop
					sx={{
						...CSS.BackdropStyle,
						zIndex: 100,
					}}
					open={true}
					//onClick={() => dispatch(REDUX.toggleBackdrop())}
				>
					<div
						id="LogoutContainer"
						style={{ ...CSS.LogoutContainerStyle }}
					>
						{/* <ErrorOutlineIcon sx={{ ...CSS.LogoutIconStyle }} /> */}
						<Player
							autoplay
							loop
							src="https://assets4.lottiefiles.com/packages/lf20_sd5z9hr3.json"
							style={{ ...CSS.LogoutIconStyle }}
						/>
						<p style={{ ...CSS.LogoutHeadingStyle }}>
							{LogoutHeading}
						</p>
						<div
							id="logoutButtonContainer"
							style={{ ...CSS.LogoutButtonContainerStyle }}
						>
							<Button
								onClick={() => dispatch(REDUX.toggleBackdrop())}
								variant="contained"
								sx={{ marginRight: "10px" }}
							>
								{StayHeading}
							</Button>
							<Button
								variant="outlined"
								onClick={() => {
									dispatch(REDUX.toggleBackdrop());
									logout();
									navigate("/Goodbye");
								}}
							>
								{SignOutHeading}
							</Button>
						</div>
					</div>
				</Backdrop>
			) : null}
		</React.Fragment>
	);
};

const LogoutHeading = "Oh no! You're leaving... Are you sure? :(";
const StayHeading = "Oops I'm coming back!";
const SignOutHeading = "Yes, log me out";

export default SettingsButton;
