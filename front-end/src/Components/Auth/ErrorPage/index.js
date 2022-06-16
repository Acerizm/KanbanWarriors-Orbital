import React, { Fragment } from "react";
import * as CSS from "./css.js";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const ErrorPage = () => {
	const navigate = useNavigate();
	return (
		<div id="ErrorPage" style={{ ...CSS.ErrorPageStyle }}>
			<div id="ErrorContainer" style={{ ...CSS.ErrorContainerStyle }}>
				<p id="ErrorHeading1" style={{ ...CSS.ErrorHeading1Style }}>
					<b>{ErrorHeading1}</b>
				</p>
				<p id="ErrorHeading2" style={{ ...CSS.ErrorHeading2Style }}>
					{ErrorHeading2}
				</p>
				<Button
					variant="contained"
					sx={{ width: "150px" }}
					onClick={() => navigate("/home")}
				>
					Back to home
				</Button>
			</div>
			<div id="IconContainer" style={{ ...CSS.IconContainerStyle }}>
				<div id="icon1" style={{ ...CSS.lotticonStyle1 }}>
					<Player
						autoplay
						loop
						src="https://assets9.lottiefiles.com/packages/lf20_borkvxlu.json"
					/>
				</div>
				<div id="icon2" style={{ ...CSS.lotticonStyle2 }}>
					<Player
						autoplay
						loop
						src="https://assets7.lottiefiles.com/packages/lf20_hwmziz8o.json"
					/>
				</div>
			</div>
		</div>
	);
};

const ErrorHeading1 = "Don't know where you are?";
const ErrorHeading2 = "We have no idea too...";

export default ErrorPage;
