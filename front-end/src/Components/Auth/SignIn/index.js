import React, { Fragment, useState } from "react";
import * as CSS from "./css.js";
//import { CustomDivider,LoginSection } from "./CustomMaterialUI";
import {
	Input,
	Divider,
	Button,
	InputAdornment,
	IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import { SignInButtons } from "../../CustomMaterialUI/SsoButtons";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// import Auth Components here
import {
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
	useSignInWithTwitter,
	useSignInWithFacebook,
	useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import LinearDeterminate from "../../CustomMaterialUI/Loading";

// import MediaQuery
import { Tablet, Desktop } from "../../ResponsiveComponent/MediaQuery";

import logo from "./logo.png";

// PLEASE SEE "./ForgetPassword" for example
// this boilerplate is bad as CSS planning and execution is hacky :P

// ------------------------------------------- Sign in Feature -----------------------------------------------
const SignInPage = () => {
	const navigate = useNavigate();
	return (
		<React.Fragment>
			<Desktop>
				<div
					id="SignInDesktopContainer"
					style={{ ...CSS.SignInDesktopContainerStyle }}
				>
					<img
						src={logo}
						width="500"
						height="100"
						style={{
							marginTop: "100px",
							gridRow: "1 / 2",
							gridColumn: "1 / 4",
							justifySelf: "center",
						}}
					/>
					<TextInputSection />
					<CustomDivider />
					<SignInButtons />
				</div>
			</Desktop>
			<Tablet>
				<div
					id="SignInDesktopContainer"
					style={{ ...CSS.SignInTabletContainerStyle }}
				>
					<TextInputSectionTablet />
				</div>
			</Tablet>
		</React.Fragment>
	);
};

const ariaLabel = { "aria-label": "description" };

const CustomDivider = () => {
	return (
		<React.Fragment>
			<ThemeProvider theme={{ ...CSS.DividerTheme }}>
				<Divider orientation="vertical">OR</Divider>
			</ThemeProvider>
		</React.Fragment>
	);
};

const CustomDividerTablet = () => {
	return (
		<React.Fragment>
			<ThemeProvider theme={{ ...CSS.DividerTabletTheme }}>
				<Divider>OR</Divider>
			</ThemeProvider>
		</React.Fragment>
	);
};

const TextInputSection = () => {
	// React hooks is sufficient enough to know the state of the text fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordShown, togglePassword] = useState(false);
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);
	const navigate = useNavigate();
	let errorTextComponent;
	let loadingStatus;
	if (error) {
		errorTextComponent = <ErrorTextComponent />;
	}
	if (loading) {
		loadingStatus = <LinearDeterminate />;
	}
	if (user) {
		navigate("/home");
	}
	return (
		<div id="EmailSection" style={{ ...CSS.EmailSectionContainerStyle }}>
			{loadingStatus}
			<div className="emailSection" style={{ ...CSS.emailSectionStyle }}>
				<div
					className="textInputHeadings"
					style={{ ...CSS.TextInputHeadings }}
				>
					EMAIL ADDRESS
				</div>
				<ThemeProvider theme={{ ...CSS.EmailAddressTheme }}>
					<Input
						id="emailAddressInput"
						placeholder="name@example.com"
						inputProps={ariaLabel}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</ThemeProvider>
			</div>
			<div
				className="passwordSection"
				style={{ ...CSS.passwordSectionStyle }}
			>
				<ThemeProvider theme={{ ...CSS.PasswordTheme }}>
					<div
						className="textInputHeadings"
						style={{ ...CSS.TextInputHeadings }}
					>
						PASSWORD
					</div>
					<Input
						id="passwordInput"
						placeholder="password"
						inputProps={ariaLabel}
						onChange={(e) => setPassword(e.target.value)}
						type={isPasswordShown ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => {
										if (isPasswordShown) {
											togglePassword(false);
										} else {
											togglePassword(true);
										}
									}}
									onMouseDown={(e) => e.preventDefault()}
								>
									{isPasswordShown ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
				</ThemeProvider>
			</div>
			{errorTextComponent}
			<ThemeProvider theme={{ ...CSS.LoginButtonTheme }}>
				<Button
					color="minimalistic"
					variant="outlined"
					sx={{ marginRight: "30px" }}
					onClick={() => signInWithEmailAndPassword(email, password)}
				>
					Login
				</Button>
			</ThemeProvider>
			<Button
				sx={{ ...CSS.NewUserLinkStyle }}
				onClick={() => navigate("/NewUser")}
			>
				New User
			</Button>
			<Button
				sx={{ ...CSS.ForgetPasswordLinkStyle }}
				onClick={() => navigate("/ForgetPassword")}
			>
				Forget Password
			</Button>
		</div>
	);
};

const TextInputSectionTablet = () => {
	// React hooks is sufficient enough to know the state of the text fields
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordShown, togglePassword] = useState(false);
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);
	const navigate = useNavigate();
	let errorTextComponent;
	let loadingStatus;
	if (error) {
		errorTextComponent = <ErrorTextComponent />;
	}
	if (loading) {
	}
	if (user) {
		navigate("/home");
	}
	return (
		<div
			id="EmailSection"
			style={{ ...CSS.EmailSectionContainerTabletStyle }}
		>
			<img
				src={logo}
				width="500"
				height="100"
				style={{ marginBottom: "20px" }}
			/>
			<div
				className="emailSection"
				style={{ ...CSS.emailSectionTabletStyle }}
			>
				<div
					className="textInputHeadings"
					style={{ ...CSS.TextInputHeadings }}
				>
					EMAIL ADDRESS
				</div>
				<ThemeProvider theme={{ ...CSS.EmailAddressTheme }}>
					<Input
						id="emailAddressInput"
						placeholder="name@example.com"
						inputProps={ariaLabel}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</ThemeProvider>
			</div>
			<div
				className="passwordSection"
				style={{ ...CSS.passwordSectionTabletStyle }}
			>
				<ThemeProvider theme={{ ...CSS.PasswordTheme }}>
					<div
						className="textInputHeadings"
						style={{ ...CSS.TextInputHeadings }}
					>
						PASSWORD
					</div>
					<Input
						id="passwordInput"
						placeholder="password"
						inputProps={ariaLabel}
						onChange={(e) => setPassword(e.target.value)}
						type={isPasswordShown ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => {
										if (isPasswordShown) {
											togglePassword(false);
										} else {
											togglePassword(true);
										}
									}}
									onMouseDown={(e) => e.preventDefault()}
								>
									{isPasswordShown ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
				</ThemeProvider>
			</div>
			{errorTextComponent}
			<ThemeProvider theme={{ ...CSS.LoginButtonTheme }}>
				<Button
					color="minimalistic"
					variant="outlined"
					onClick={() => signInWithEmailAndPassword(email, password)}
				>
					Login
				</Button>
			</ThemeProvider>
			<CustomDividerTablet />
			<SsoButtonsTablet />
			<Button
				sx={{ ...CSS.NewUserLinkTabletStyle }}
				onClick={() => navigate("/NewUser")}
			>
				New User
			</Button>
			<Button
				sx={{ ...CSS.ForgetPasswordLinkTabletStyle }}
				onClick={() => navigate("/ForgetPassword")}
			>
				Forget Password
			</Button>
		</div>
	);
};

const SsoButtonsTablet = () => {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
	const [signInWithFacebook, userFacebook, loadingFacebook, errorFacebook] =
		useSignInWithFacebook(auth);
	const [signInWithTwitter, userTwitter, loadingTwitter, errorTwitter] =
		useSignInWithTwitter(auth);
	const [signInWithGithub, userGithub, loadingGithub, errorGithub] =
		useSignInWithGithub(auth);
	const navigate = useNavigate();
	if (loading || loadingFacebook || loadingTwitter || loadingGithub) {
		//show loading screen in the future
	}
	if (user || userFacebook || userTwitter || userGithub) {
		// when the user manages to log in
		navigate("/home");
	}
	if (error || errorFacebook || errorTwitter || errorGithub) {
	}
	return (
		<Fragment>
			<div style={{ ...CSS.SsoButtonsTabletStyle }}>
				<Button
					sx={{
						width: "50px",
						color: "black",
						border: "1px solid black",
					}}
					variant="outlined"
					onClick={() => signInWithGoogle()}
				>
					<GoogleIcon />
				</Button>
				<Button
					sx={{
						width: "50px",
						color: "black",
						border: "1px solid black",
					}}
					variant="outlined"
					onClick={() => signInWithTwitter()}
				>
					<TwitterIcon />
				</Button>
				<Button
					sx={{
						width: "50px",
						color: "black",
						border: "1px solid black",
					}}
					variant="outlined"
					onClick={() => signInWithFacebook()}
				>
					<FacebookIcon />
				</Button>
				<Button
					sx={{
						width: "50px",
						color: "black",
						border: "1px solid black",
					}}
					variant="outlined"
					onClick={() => signInWithGithub()}
				>
					<GitHubIcon />
				</Button>
			</div>
		</Fragment>
	);
};

const ErrorTextComponent = () => {
	return <div style={{ ...CSS.errorTextComponentStyle }}>{errorText}</div>;
};

const errorText =
	"Error! You have entered either an invalid email or invalid password. Please try again.";
const welcomeText =
	"Welcome to KanbanWarriors Orbital Project. This is still a work in progress! :p";

export default SignInPage;
