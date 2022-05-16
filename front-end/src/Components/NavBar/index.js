import { Desktop, Tablet } from "../../MediaQuery";

const NavBar = ({props}) => {
    return (
        <div>
            <Desktop>
                <h1>Test</h1>
            </Desktop>
            <Tablet></Tablet>
        </div>
    )
}

export default NavBar;