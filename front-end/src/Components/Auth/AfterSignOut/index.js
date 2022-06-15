import React, { Fragment } from "react";
import * as CSS from "./css.js";
import { Player } from "@lottiefiles/react-lottie-player";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const AfterSignOutPage = () => {
	const navigate = useNavigate();
	return (
		<div id="AfterSignOutPage" style={{ ...CSS.AfterSignOutPageStyle }}>
			<Player
				autoplay
				loop
				src="https://assets9.lottiefiles.com/packages/lf20_vmlm0zew.json"
				style={{ ...CSS.lotticonStyle }}
			/>
			<p id="GoodbyeHeading" style={{ ...CSS.GoodbyeHeadingStyle }}>
				<b>{GoodbyeHeading1}</b>
				{GoodbyeHeading2}
			</p>
			<div
				id="ComebackContainer"
				style={{ ...CSS.ComebackContainerStyle }}
			>
				<p style={{ ...CSS.ComebackHeadingStyle }}>{ComebackHeading}</p>
				<Button
					variant="contained"
					onClick={() => {
						navigate("/SignIn");
					}}
				>
					Login
				</Button>
			</div>
		</div>
	);
};

const GoodbyeHeading1 = "You have successfully logged out! ";
const GoodbyeHeading2 = "Till the next time!";
const ComebackHeading = "Have a change of heart?";
export default AfterSignOutPage;
