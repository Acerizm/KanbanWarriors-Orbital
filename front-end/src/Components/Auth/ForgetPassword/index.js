import React,{useState} from "react";
import * as CSS from "./css";
import { Button, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from "../Firebase";
import LinearDeterminate from "../../CustomMaterialUI/Loading";


const ariaLabel = { 'aria-label': 'description' };

export const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    let errorDiv;
    let loader;
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
        auth
      );
      if (error) {
        errorDiv = <ErrorTextComponent/>
      }
      if (sending) {
        loader = <LinearDeterminate updatedStyle={{...CSS.loadingStyle}}/>
      }
    return(
        <React.Fragment>
            <div id="ForgetPasswordPage" style={{...CSS.forgetPasswordPageStyle}}>
                {loader}
                <Button variant="text" sx={{...CSS.BackNavigationStyle}}
                            onClick={
                                () => navigate("/SignIn")
                            }
                >Back
                </Button>
                <Button variant="text" sx={{...CSS.LoginNavigationStyle}}
                    onClick={
                        () => navigate("/SignIn")
                    }
                >Login
                </Button>
                <div id="ForgetPasswordSection" style={{...CSS.forgetPasswordSectionStyle}}>
                    <div id="forgotPasswordHeading" style={{...CSS.forgotPasswordHeading}}>FORGOT YOUR PASSWORD?</div>
                    <div id="description" style={{...CSS.descriptionStyle}}>{description}</div>
                    {errorDiv}
                    <Input placeholder="name@example.com" inputProps={ariaLabel} sx={{...CSS.inputStyle}} 
                    onChange={
                        (e) => setEmail(e.target.value)
                    }
                    />
                    <ThemeProvider theme={{...CSS.resetButtonTheme}}>
                        <Button color="minimalistic" variant="outlined"
                            onClick={async () => {
                                await sendPasswordResetEmail(email);
                                alert(alertText);
                                // the function returns nothing gg
                            }}
                        >RESET</Button> 
                    </ThemeProvider>       
                </div>
            </div>
        </React.Fragment>
    )
}

const description = "Enter your account's email and we'll send you a link to reset your password";
const errorText = "You have entered an invalid email. Please try again."
const alertText = "Please check your email inbox for a link to follow to reset your password"
const ErrorTextComponent = () => {
    return (
        <div id="errorText" style={{...CSS.errorTextStyle}}>{errorText}</div>
    )
}