import React from "react";
// import material ui stuff here
import Button from '@mui/material/Button';
import { Facebook,Twitter,Google,QuestionMark } from "@mui/icons-material";
import * as CSS from "./css.js";

export const AuthServicesButtons = () => {
    return(
        <React.Fragment>
            <div id="ButtonsContainer" style={{...CSS.buttonsContainerStyle}}>
                <Button variant="text" sx={{...CSS.buttonContainerStyle}}>
                    <Google sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Google
                    </div>
                </Button>
                <Button variant="text" sx={{...CSS.buttonContainerStyle}}>
                    <Google sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Twitter
                    </div>
                </Button>
                <Button variant="text" sx={{...CSS.buttonContainerStyle}}>
                    <Google sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Facebook
                    </div>
                </Button>
                <Button variant="text" sx={{...CSS.buttonContainerStyle}}>
                    <Google sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Discord
                    </div>
                </Button>
                <Button variant="text" sx={{...CSS.buttonContainerStyle}}>
                    <Google sx={{...CSS.IconStyle}}/>
                    <div style={{...CSS.AuthServiceButtonsStyle}}>
                        Continue with Email
                    </div>
                </Button>
            </div>
        </React.Fragment>
    )
}
