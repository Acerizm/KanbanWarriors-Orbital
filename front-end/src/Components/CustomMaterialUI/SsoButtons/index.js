import React from "react";
import { useNavigate } from "react-router-dom";
import {
	useSignInWithGoogle,
	useSignInWithTwitter,
	useSignInWithFacebook,
	useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { Button } from "@mui/material";
import * as CSS from "./css.js";
import { auth } from "../../Auth/Firebase/index.js";
import { Google, Twitter, Facebook, Email } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "@mui/material/Link";

export const SignInButtons = () => {
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
		<React.Fragment>
			<div
				id="ButtonsContainer"
				style={{ ...CSS.SignInButtonsContainerStyle }}
			>
				<Button
					variant="text"
					sx={{ ...CSS.buttonContainerStyle }}
					onClick={() => signInWithGoogle()}
				>
					<Google sx={{ ...CSS.IconStyle }} />
					<div style={{ ...CSS.AuthServiceButtonsStyle }}>
						Continue with Google
					</div>
				</Button>
				<Button
					variant="text"
					sx={{ ...CSS.buttonContainerStyle }}
					onClick={() => signInWithTwitter()}
				>
					<Twitter sx={{ ...CSS.IconStyle }} />
					<div style={{ ...CSS.AuthServiceButtonsStyle }}>
						Continue with Twitter
					</div>
				</Button>
				<Button
					variant="text"
					sx={{ ...CSS.buttonContainerStyle }}
					onClick={() => signInWithFacebook()}
				>
					<Facebook sx={{ ...CSS.IconStyle }} />
					<div style={{ ...CSS.AuthServiceButtonsStyle }}>
						Continue with Facebook
					</div>
				</Button>
				<Button
					variant="text"
					sx={{ ...CSS.buttonContainerStyle }}
					onClick={() => signInWithGithub()}
				>
					<GitHubIcon sx={{ ...CSS.IconStyle }} />
					<div style={{ ...CSS.AuthServiceButtonsStyle }}>
						Continue with Github
					</div>
				</Button>
			</div>
		</React.Fragment>
	);
};

export const CreateNewAccountSsoButtons = () => {
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
		<React.Fragment>
			<div
				id="ButtonsContainer"
				style={{ ...CSS.CreateNewAccountSsoContainerStyle }}
			>
				<div
					className="headingForButtons"
					style={{ ...CSS.headingForButtonsStyle }}
				>
					Create Your Account
				</div>
				<div
					className="TermsAndConditions"
					style={{ ...CSS.TermsAndConditionsStyle }}
				>
					By creating an account, you agree with our
					<Link
						href="https://www.privacypolicies.com/live/cafbd81e-4cb9-4b81-9406-efd62048c569"
						underline="hover"
					>
						{" "}
						Privacy Policies.
					</Link>
				</div>
				<Button
					variant="text"
					sx={{ ...CSS.CreateNewAccountButtonContainerStyle }}
					onClick={() => signInWithGoogle()}
				>
					<Google sx={{ ...CSS.IconStyle }} />
					<div style={{ ...CSS.AuthServiceButtonsStyle }}>
						Continue with Google
					</div>
				</Button>
				<Button
					variant="text"
					sx={{ ...CSS.CreateNewAccountButtonContainerStyle }}
					onClick={() => signInWithTwitter()}
				>
					<Twitter sx={{ ...CSS.IconStyle }} />
					<div style={{ ...CSS.AuthServiceButtonsStyle }}>
						Continue with Twitter
					</div>
				</Button>
				<Button
					variant="text"
					sx={{ ...CSS.CreateNewAccountButtonContainerStyle }}
					onClick={() => signInWithFacebook()}
				>
					<Facebook sx={{ ...CSS.IconStyle }} />
					<div style={{ ...CSS.AuthServiceButtonsStyle }}>
						Continue with Facebook
					</div>
				</Button>
				<Button
					variant="text"
					sx={{ ...CSS.CreateNewAccountButtonContainerStyle }}
					onClick={() => signInWithGithub()}
				>
					<GitHubIcon sx={{ ...CSS.IconStyle }} />
					<div style={{ ...CSS.AuthServiceButtonsStyle }}>
						Continue with Github
					</div>
				</Button>
				<Button
					variant="text"
					sx={{ ...CSS.CreateNewAccountButtonContainerStyle }}
					onClick={() => navigate("/NewEmail")}
				>
					<Email sx={{ ...CSS.IconStyle }} />
					<div style={{ ...CSS.AuthServiceButtonsStyle }}>
						Continue with Email
					</div>
				</Button>
			</div>
		</React.Fragment>
	);
};
