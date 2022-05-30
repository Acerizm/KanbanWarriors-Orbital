import { Desktop } from "../../ResponsiveComponent/MediaQuery";
import React,{useState} from "react";
import * as CSS from "./css.js";
//import { CustomDivider,LoginSection } from "./CustomMaterialUI";
import { Input,Divider,Button } from "@mui/material";
import { SignInButtons } from "../../CustomMaterialUI/SsoButtons";
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

// import Auth Components here
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from "../Firebase";

// ------------------------------------------- Sign in Feature -----------------------------------------------
const SignInPage = () => {
    const navigate = useNavigate();
    return(
        <React.Fragment>
            <Desktop>
                <div id="SignInDesktopContainer" style={{...CSS.SignInDesktopContainerStyle}}>
                    <TextInputSection/>
                    <CustomDivider/>
                    <SignInButtons/>
                    <Button sx={{...CSS.NewUserLinkStyle}}
                        onClick={
                            () => navigate("/NewUser")
                        }
                    >New User?</Button>
                </div>
            </Desktop>
        </React.Fragment>
    )
}

const ariaLabel = { 'aria-label': 'description' };

const CustomDivider = () => {
    return (
        <React.Fragment>
            <ThemeProvider theme={{...CSS.DividerTheme}}>
                <Divider orientation="vertical">OR</Divider>
            </ThemeProvider>
        </React.Fragment>
    )
}

const TextInputSection = () => {
    // React hooks is sufficient enough to know the state of the text fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    if(error) {
        // show error here
        
    }
    if(loading) {

    }
    if(user) {
        window.location.assign("/home");
    }
    return (
        <div id="EmailSection" style={{...CSS.EmailSectionContainerStyle}}>
            <div className="emailSection" style={{...CSS.emailSectionStyle}}>
                <div className="textInputHeadings" style={{...CSS.TextInputHeadings}}>EMAIL ADDRESS</div>
                <ThemeProvider theme={{...CSS.EmailAddressTheme}}>
                    <Input id="emailAddressInput" placeholder="name@example.com" inputProps={ariaLabel}
                        onChange={
                            (e) => setEmail(e.target.value)
                        }
                    />
                </ThemeProvider>
            </div>
            <div className="passwordSection" style={{...CSS.passwordSectionStyle}}>
                <ThemeProvider theme={{...CSS.PasswordTheme}}>
                    <div className="textInputHeadings" style={{...CSS.TextInputHeadings}}>PASSWORD</div>
                    <Input id="passwordInput" placeholder="password" inputProps={ariaLabel}
                        onChange={
                            (e) => setPassword(e.target.value)
                        }
                    />
                </ThemeProvider>    
            </div>
            <ThemeProvider theme={{...CSS.LoginButtonTheme}}>
                <Button color="minimalistic" variant="outlined" sx={{marginRight: "30px"}} 
                    onClick={
                        () => signInWithEmailAndPassword(email, password)
                    }
                >Login</Button>
            </ThemeProvider>
       </div>
    )
}


export default SignInPage;