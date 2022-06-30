import React from 'react';
import Draggable from "react-draggable";
import Paper from '@mui/material/Paper';

const SpotifyPlayer = () => {
    return(
        <Draggable
            axis="both"
            handle=".playerHandle"
            position={null}
			defaultClassName="draggablePlayer"
			scale={1}
        >
            <Paper>
                <div className="playerHandle" style={{ padding: "10px", color: "pink"}}>
                    test
                </div>
            </Paper>
        </Draggable>
    )
}

export default SpotifyPlayer;