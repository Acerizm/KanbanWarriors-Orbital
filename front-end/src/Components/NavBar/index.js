import { Desktop, Tablet } from "../ResponsiveComponent/MediaQuery.js";
import * as CSS from "./css.js"

const NavBar = ({props}) => {
    return (
        <div className="handle">
            <Desktop>
                <div id="navbarContainer" style={{...CSS.navBarContainerStyle}}>
                    Drag me! (This is a test feature)            
                </div>
            </Desktop>
            <Tablet></Tablet>
        </div>
    )
}

export default NavBar;