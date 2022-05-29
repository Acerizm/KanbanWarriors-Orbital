import React from "react";
import { Desktop } from "../../ResponsiveComponent/MediaQuery.js";
import * as CSS from "./css.js";
import { AuthServicesButtons } from "./CustomMaterialUI/index.js";

export const CreateNewUser = () => {
    return(
        <React.Fragment>
            <Desktop>
                <div id="CreateNewUserContainer" style={{...CSS.createNewUserContainerStyle}}>
                    <AuthServicesButtons/>
                </div>
            </Desktop>
        </React.Fragment>
    )
}