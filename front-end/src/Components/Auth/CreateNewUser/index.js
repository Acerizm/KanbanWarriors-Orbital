import React from "react";
import { Desktop } from "../../ResponsiveComponent/MediaQuery.js";
import * as CSS from "./css.js";
import { CreateNewAccountSsoButtons } from "../../CustomMaterialUI/SsoButtons/index.js";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CreateNewUser = () => {
    const navigate = useNavigate();
    return(
        <React.Fragment>
            <Desktop>
                <div id="CreateNewUserContainer" style={{...CSS.createNewUserContainerStyle}}>
                    <Button variant="text" sx={{...CSS.BackNavigationStyle}}
                        onClick={
                            () => navigate("/SignIn")
                        }
                    >Back</Button>
                    <Button variant="text" sx={{...CSS.LoginNavigationStyle}}
                        onClick={
                            () => navigate("/SignIn")
                        }
                    >Login</Button>
                    <CreateNewAccountSsoButtons/>
                </div>
            </Desktop>
        </React.Fragment>
    )
}