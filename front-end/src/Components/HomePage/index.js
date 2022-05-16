import { Desktop } from "../../MediaQuery";
import { Tablet } from "../../MediaQuery";
import  NavBar  from "../NavBar";

// 1. Can use either functional ES6 style or Component OOP style.

const HomePage = (props) => {
    return (
        <div>
            <Desktop>
                <NavBar></NavBar>
            </Desktop>
            <Tablet></Tablet>
        </div>
    )
}

export default HomePage;