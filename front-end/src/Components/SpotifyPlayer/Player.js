import React from "react";
import SpotifyPlayer from 'react-spotify-player';



const Player = ({accessToken,playingTrack}) => {
    const size = {
        width: '100%',
        height: 300,
      };
    const view = 'list'; // or 'coverart'
    const theme = 'black'; // or 'white'
      
    return (
        <SpotifyPlayer
            uri= {playingTrack ? playingTrack.uri : "spotify:album:1TIUsv8qmYLpBEhvmBmyBk"}
            token = {accessToken}
            size={size}
            view={view}
            theme={theme}
        />
    )
}

export default Player;

// <SpotifyPlayer 
        //     token = {accessToken}
        //     callback={state => {
        //         if(!state.isPlaying) {
        //             setPlay(false);
        //         }
        //     }}
        //     magnifySliderOnHover={true}
        //     play={play}
        //     uris= {trackUri ? trackUri : []}
        //     styles={{
        //         activeColor: '#1DB954',
        //         bgColor: '#333',
        //         color: '#1DB954',
        //         loaderColor: '#1DB954',
        //         sliderColor: '#1cb954',
        //         trackArtistColor: '#ccc',
        //         trackNameColor: '#1DB954',
        //       }}
        // // />
        // <SpotifyPlayer
        //     uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
        //     size={size}
        //     view={view}
        //     theme={theme}
        // />

        
    
        