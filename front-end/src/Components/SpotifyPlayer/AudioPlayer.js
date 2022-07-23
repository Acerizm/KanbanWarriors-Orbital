import React from "react";
import SpotifyPlayer from 'react-spotify-player';

const AudioPlayer = ({playingTrack}) => {
    const size = {
        width: '100%',
        height: 300,
      };
    const view = 'list'; // or 'coverart'
    const theme = 'white'; // or 'black'

    return (
        <SpotifyPlayer
            uri= {playingTrack ? playingTrack.uri : "spotify:album:1TIUsv8qmYLpBEhvmBmyBk"}
            size={size}
            view={view}
            theme={theme}
        />
    )
}

export default AudioPlayer;
