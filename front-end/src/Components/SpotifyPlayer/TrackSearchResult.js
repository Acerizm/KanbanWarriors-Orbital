import React from "react";

// styled components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const TrackSearchResult = ({track, chooseTrack}) => {

    const handlePlay = () => {
        chooseTrack(track);
    }

    return (
        <Button
            onClick={handlePlay}
            sx = {{width: 360, backgroundColor:'white', border:'5px', margin:'5px' }}
            variant= 'outlined'
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography component="div" variant="subtitle1">
                    {track.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="div">
                    {track.artist}
                    </Typography>
            </Box>
        </Button>
    )
}

export default TrackSearchResult;