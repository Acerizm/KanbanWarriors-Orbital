import { Desktop } from "../../ResponsiveComponent/MediaQuery";
import React from "react";
import * as CSS from "./css.js";
import { TextInputSection,CustomDivider,LoginSection } from "./CustomMaterialUI";

// ------------------------------------------- Sign in Feature -----------------------------------------------
const SignInPage = () => {
    return(
        <React.Fragment>
            <Desktop>
                <div id="SignInDesktopContainer" style={{...CSS.SignInDesktopContainerStyle}}>
                    <TextInputSection/>
                    <CustomDivider/>
                    <LoginSection/>
                </div>
            </Desktop>
        </React.Fragment>
    )
}


export default SignInPage;