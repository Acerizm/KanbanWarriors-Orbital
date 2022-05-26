import { Desktop, Tablet } from "../ResponsiveComponent/MediaQuery.js";
import * as CSS from "./css.js";
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import TimerIcon from '@mui/icons-material/Timer';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import NotesIcon from '@mui/icons-material/Notes';
import SettingsIcon from '@mui/icons-material/Settings';
import {TemporaryDrawer} from "../BackgroundCategories/index.js";

// import Redux stuff here
import { useDispatch } from "react-redux";
// import all the reducers you want to use here
import { toggleDrawerOn } from "../Redux/Reducers/BackgroundImage/BackgroundImageSlice.js";

// 1. Using Material-UI "themes" to alter their components/APIs
const navBarTheme = createTheme({
    components: {
        // what component you are using
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    width: "100%",
                    borderRadius: "5px",
                }
            }
        }
    }
});


const NavBar = ({props}) => {
    // We are using React hooks 
    // Hooks allows us to skip classes/OOP
    //Hooks are here
    const [value, setValue] = React.useState(0);

    //redux stuff here
    const dispatch = useDispatch();

    return (
        <div className="handle" style={{...CSS.navBarContainerStyle}}>
            <Desktop>
                <TemporaryDrawer/>
                <ThemeProvider theme={navBarTheme}>
                    <BottomNavigation
                        // showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        >
                        <BottomNavigationAction label="Background" icon={<WallpaperIcon/>} 
                            onClick={
                                () => dispatch(toggleDrawerOn())
                            }
                        />
                        <BottomNavigationAction label="Timer" icon={<TimerIcon />}/>
                        <BottomNavigationAction label="Music" icon={<AudiotrackIcon />} />
                        <BottomNavigationAction label="Ambience" icon={<GraphicEqIcon />} />
                        <BottomNavigationAction label="To-Do" icon={<NotesIcon />} />
                        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />

                    </BottomNavigation>
                </ThemeProvider>
            </Desktop>
            <Tablet></Tablet>
        </div>
    )
}


export default NavBar;