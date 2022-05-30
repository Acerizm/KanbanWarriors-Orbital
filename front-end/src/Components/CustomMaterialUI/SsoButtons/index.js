import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignInWithGoogle, useSignInWithTwitter, useSignInWithFacebook } from "react-firebase-hooks/auth";
import { Button } from "@mui/material";
import * as CSS from "./css.js";
import { auth } from "../../Auth/Firebase/index.js";
import { Google,Twitter,Facebook,QuestionMark } from "@mui/icons-material";
import Link from '@mui/material/Link';

export const SignInButtons = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithFacebook, userFacebook, loadingFacebook, errorFacebook] = useSignInWithFacebook(auth);
    const [signInWithTwitter, userTwitter, loadingTwitter, errorTwitter] = useSignInWithTwitter(auth);
    const navigate = useNavigate();
    if(loading || loadingFacebook || loadingTwitter) {
        //show loading screen in the future
    }
    if(user || userFacebook || userTwitter) {
        // when the user manages to log in
        navigate("/home");
    } 
    if(error || errorFacebook || errorTwitter) {
        // console.log(errorTwitter);
    }
    return(
        <React.Fragment>
            <div id="ButtonsContainer" style={{...CSS.SignInButtonsContainerStyle}}>
                <Button variant="text" sx={{...CSS.buttonContainerStyle}}
                    onClick={
                        () => signInWithGoogle()
                    }
                >
                    <Google sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Google
                    </div>
                </Button>
                <Button variant="text" sx={{...CSS.buttonContainerStyle}}
                    onClick={
                        () => signInWithTwitter()
                    }
                >
                    <Twitter sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Twitter
                    </div>
                </Button>
                <Button variant="text" sx={{...CSS.buttonContainerStyle}}
                    onClick={
                        () => signInWithFacebook()
                    }
                >
                    <Facebook sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Facebook
                    </div>
                </Button>
                <Button variant="text" sx={{...CSS.buttonContainerStyle}}>
                    <QuestionMark sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Discord
                    </div>
                </Button>
            </div>
        </React.Fragment>
    )
}

export const CreateNewAccountSsoButtons = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [signInWithFacebook, userFacebook, loadingFacebook, errorFacebook] = useSignInWithFacebook(auth);
    const [signInWithTwitter, userTwitter, loadingTwitter, errorTwitter] = useSignInWithTwitter(auth);
    const navigate = useNavigate();
    if(loading || loadingFacebook || loadingTwitter) {
        //show loading screen in the future
    }
    if(user || userFacebook || userTwitter) {
        // when the user manages to log in
        navigate("/home");
    } 
    if(error || errorFacebook || errorTwitter) {
        // console.log(errorTwitter);
    }
    return(
        <React.Fragment>
            <div id="ButtonsContainer" style={{...CSS.CreateNewAccountSsoContainerStyle}}>
                <div id="headingForButtons" style={{...CSS.headingForButtonsStyle}}>Create Your Account</div>
                <div id="TermsAndConditions" style={{...CSS.TermsAndConditionsStyle}}> By creating an account, you agree with our  
                    <Link href="https://www.privacypolicies.com/live/cafbd81e-4cb9-4b81-9406-efd62048c569" underline="hover"> Privacy Policies. </Link>
                </div>
                <Button variant="text" sx={{...CSS.CreateNewAccountButtonContainerStyle}}
                    onClick={
                        () => signInWithGoogle()
                    }
                >
                    <Google sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Google
                    </div>
                </Button>
                <Button variant="text" sx={{...CSS.CreateNewAccountButtonContainerStyle}}
                    onClick={
                        () => signInWithTwitter()
                    }
                >
                    <Twitter sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Twitter
                    </div>
                </Button>
                <Button variant="text" sx={{...CSS.CreateNewAccountButtonContainerStyle}}
                    onClick={
                        () => signInWithFacebook()
                    }
                >
                    <Facebook sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Facebook
                    </div>
                </Button>
                <Button variant="text" sx={{...CSS.CreateNewAccountButtonContainerStyle}}>
                    <QuestionMark sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Discord
                    </div>
                </Button>
            </div>
        </React.Fragment>
    )
}
