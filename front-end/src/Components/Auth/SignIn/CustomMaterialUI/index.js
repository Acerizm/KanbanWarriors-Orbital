import React from "react";
import { Input,Divider,Button } from "@mui/material";
import { Facebook,Twitter,Google,QuestionMark } from "@mui/icons-material";
import { ThemeProvider } from '@mui/material/styles';
import * as CSS from "./css.js"

// import Auth Components here
//import { GoogleSignIn } from "../../Firebase/index.js";
//import { useAuthState } from 'react-firebase-hooks/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from "../../Firebase/index.js";

import { Navigate } from "react-router-dom";
const ariaLabel = { 'aria-label': 'description' };

export const TextInputSection = () => {
    return (
        <div id="EmailSection" style={{...CSS.EmailSectionContainerStyle}}>
            <div className="emailSection" style={{...CSS.emailSectionStyle}}>
                <div className="textInputHeadings" style={{...CSS.TextInputHeadings}}>EMAIL ADDRESS</div>
                <ThemeProvider theme={{...CSS.EmailAddressTheme}}>
                    <Input id="emailAddressInput" placeholder="name@example.com" inputProps={ariaLabel}/>
                </ThemeProvider>
            </div>
            <div className="passwordSection" style={{...CSS.passwordSectionStyle}}>
                <ThemeProvider theme={{...CSS.PasswordTheme}}>
                    <div className="textInputHeadings" style={{...CSS.TextInputHeadings}}>PASSWORD</div>
                    <Input id="passwordInput" placeholder="password" inputProps={ariaLabel}/>
                </ThemeProvider>    
            </div>
            <ThemeProvider theme={{...CSS.LoginButtonTheme}}>
                <Button color="minimalistic" variant="outlined" sx={{marginRight: "30px"}}>Login</Button>
            </ThemeProvider>
       </div>
    )
}


export const CustomDivider = () => {
    return (
        <React.Fragment>
            <ThemeProvider theme={{...CSS.DividerTheme}}>
                <Divider orientation="vertical">OR</Divider>
            </ThemeProvider>
        </React.Fragment>
    )
}

export const LoginSection = () => {
    //const selector = useSelector(selectSignInMethod);
    // Initialize Firebase Authentication and get a reference to the service
    //const auth = getAuth(app);
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    if(loading) {
        //show loading screen in the future
        console.log("loading")
    } else if (user) {
        // when the user manages to log in
        //return <Navigate to="/home" replace="true" />
        window.location.assign("/home");
    } else {
        //return <Navigate to="/SignIn" replace="true" />
    }
    return(
       <div id="LoginSection" style={{...CSS.LoginSectionContainerStyle}}>
           <div id="GoogleLoginButton" style={{...CSS.LoginButtonStyle}} onClick={
               () => signInWithGoogle()
           }>
                <Google sx={{...CSS.IconStyle}}/>
                <div className="SSO link" style={{...CSS.SsoLinkStyle}}>Continue with Google</div>
           </div>
           <div id="TwitterLoginButton" style={{...CSS.LoginButtonStyle}}>
                <Twitter sx={{...CSS.IconStyle}}/>
                <div className="SSO link" style={{...CSS.SsoLinkStyle}}>Continue with Twitter</div>
            </div>
           <div id="FacebookLoginButton" style={{...CSS.LoginButtonStyle}}>
                <Facebook sx={{...CSS.IconStyle}}/>
                <div className="SSO link" style={{...CSS.SsoLinkStyle}}>Continue with Facebook</div>
           </div>
           <div id="DiscordLoginButton" style={{...CSS.LoginButtonStyle}}>
                <QuestionMark sx={{...CSS.IconStyle}}/>
                <div className="SSO link" style={{...CSS.SsoLinkStyle}}>Continue with Discord</div>
           </div>
       </div>
    )
}
