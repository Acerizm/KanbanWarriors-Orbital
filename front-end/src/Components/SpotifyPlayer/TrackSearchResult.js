import React from "react";

// styled components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

// styles
import './TrackSearchResult.css'


const TrackSearchResult = ({track, chooseTrack}) => {

    const handlePlay = () => {
        chooseTrack(track);
    }

    return (
        <button
            onClick={handlePlay}
            className='TrackSearchResultButtons'
        >
            <Card sx={{ display: 'flex', width:'360px', border:'5px',  margin:'5px'}}>
                <CardMedia
                    component="img"
                    sx={{ width: 64, height: 64, alignSelf: 'center',  paddingLeft: '5px'}}
                    image={track.albumUrl}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 1 auto' }}>
                        <Typography component="div" variant="subtitle1" align='left'>
                        {track.title}</Typography>
                        <Typography variant="body2" color="text.secondary" component="div" align='left'>
                        {track.artist}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </button>
    )
}

export default TrackSearchResult;


{/* <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
    </Box>
</Card> */}