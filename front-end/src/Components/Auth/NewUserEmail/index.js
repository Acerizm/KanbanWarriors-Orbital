import React,{useState} from "react";
import * as CSS from "./css.js";
import { Button, Input,InputAdornment,IconButton  } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/index.js";
import LinearDeterminate from "../../CustomMaterialUI/Loading/index.js";

const ariaLabel = { 'aria-label': 'description' };

export const NewUserEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, togglePassword] = useState(false);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();

    if (error) {
        return (
          <div>
            <p>Error: {error.message}</p>
          </div>
        );
      }
      if (loading) {
        return <LinearDeterminate/>;
      }
      if (user) {
        navigate("/home");
      }
    return(
        <div id="NewUserEmailContainer" style={{...CSS.NewUserEmailContainerStyle}}>
            <Button sx={{...CSS.BackNavigationStyle}}
                onClick={
                    () => navigate("/NewUser")
                }
            >BACK</Button>
            <Button sx={{...CSS.LoginNavigationStyle}}
                onClick={
                    () => navigate("/SignIn")
                }
            >LOGIN</Button>
            <div id="newEmailContainer" style={{...CSS.newEmailContainerStyle}}>
                <div className="headingForButtons" style={{...CSS.headingForButtonsStyle}}>Create Your Account</div>
                <div id="headingTextFieldEmail" style={{...CSS.textFieldHeadingsStyle}}>EMAIL ADDRESS</div>
                <Input placeholder="name@example.com" inputProps={ariaLabel} sx={{...CSS.inputStyle}} 
                    onChange={
                        (e) => setEmail(e.target.value)
                    }
                />
                <div id="headingTextFieldPassword" style={{...CSS.textFieldHeadingsStyle,marginTop: "30px"}}>PASSWORD</div>
                <Input placeholder="password" inputProps={ariaLabel} sx={{...CSS.inputStyle}} 
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                    type={isPasswordShown ? 'text': 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={
                                    () => {
                                        if(isPasswordShown) {
                                            togglePassword(false)
                                        } else {
                                            togglePassword(true)
                                        }
                                    }
                                }
                                onMouseDown={
                                    (e) => e.preventDefault()
                                }
                              >
                                {isPasswordShown ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                        }
                />
                <ThemeProvider theme={{...CSS.continueButtonTheme}}>
                    <div className="TermsAndConditions" style={{...CSS.TermsAndConditionsStyle}}> By creating an account, you agree with our  
                        <Link href="https://www.privacypolicies.com/live/cafbd81e-4cb9-4b81-9406-efd62048c569" underline="hover" style={{alignSelf: "center"}}> Privacy Policies. </Link>
                    </div>
                    <Button color="minimalistic" variant="outlined"
                        onClick={() => createUserWithEmailAndPassword(email, password)}
                    >CONTINUE</Button>
                </ThemeProvider>
            </div>
        </div>
    )
}
