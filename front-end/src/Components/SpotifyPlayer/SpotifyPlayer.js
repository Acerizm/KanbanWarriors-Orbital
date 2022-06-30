import React from 'react';
import Draggable from "react-draggable";
import Dashboard from './Dashboard';
import Login from './Login';


const code = new URLSearchParams(window.location.search).get('code')

const DisplayedComponent = () => {
    return code ? 
        <Dashboard code = {code}/> : <Login/>
}

const SpotifyPlayer = () => {
    return(
        <Draggable
            axis="both"
            handle=".playerHandle"
            position={null}
			defaultClassName="draggablePlayer"
			scale={1}
        >
            <div className="playerHandle" style={{ padding: "10px", color: "pink"}}>
                <DisplayedComponent/>
            </div>
        </Draggable>
    )
}

export default SpotifyPlayer;