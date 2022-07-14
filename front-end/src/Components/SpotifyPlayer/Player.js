import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
// import SpotifyPlayer from 'react-spotify-web-playback'
// import SpotifyPlayer from 'react-spotify-player';

// trying out
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';



const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
      width: '100%',
    },
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});


const spotifyApi = new SpotifyWebApi({
    // clientId:"df99a5fdb03042449bdb285e0f4193d6"
    // trying Haiqel's spotify accounts'
    clientId: 'deb3dc9dc4d3435384bb6237be1cd68c'
})

const Player = ({accessToken,playingTrack}) => {
    const [play,setPlay] = useState(false);
    const [currentPlayingTrack, setCurrentPlayingTrack] = useState({});
    const [position, setPosition] = useState(1);
    const [paused, setPaused] = useState(false);

    useEffect(()=> setPlay(true), [playingTrack])

    //for getting recently played song and authorising spotify api node
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken);


        spotifyApi.getMyRecentlyPlayedTracks({
            limit : 1
        })
            .then((res) => {
                const recentTrack = res.body.items[0].track
                const smallestAlbumImage = recentTrack.album.images.reduce(
                    (smallest, image) => {
                        if (image.height < smallest.height) {
                            return image;
                        }
                        return smallest;
                    }, recentTrack.album.images[0])
                setCurrentPlayingTrack(
                    {
                        artist: recentTrack.album.artists[0].name,
                        title: recentTrack.album.name,
                        uri: recentTrack.album.uri,
                        duration_ms: recentTrack.duration_ms,
                        albumUrl: smallestAlbumImage.url
                    }
                )
            }, (err) => {
                console.log('Something went wrong!', err);
            });
        
        
        spotifyApi.getMyDevices()
            .then((data) => {
                let availableDevices = data.body.devices;
                console.log(availableDevices, "available");
            }, function(err) {
                console.log('Something went wrong!', err);
            });

    }, [accessToken])    

    // useEffect(()=> {
    //     if (paused) {
    //         spotifyApi.play()
    //             .then(function() {
    //                 console.log('Playback started');
    //             }, function(err) {
    //                 //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    //                 console.log('Something went wrong!', err);
    //             });
    //     }
    // }, [paused])

    useEffect(()=> {
        let interval = setInterval(()=> {
            clearInterval(interval);
            if (paused) {
                
            } else {
                setPosition(position + 1)
            }
        },1000)
    }, [paused,position])

    const theme = useTheme();
    const duration = playingTrack ? 
        Math.floor(playingTrack.duration_ms / 1000) :  
        Math.floor(currentPlayingTrack.duration_ms / 1000); // seconds

    
    function formatDuration(value) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';


    if (!accessToken) return null
    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Widget>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CoverImage>
                        <img
                            alt= 'hi'
                            src={playingTrack ? playingTrack.albumUrl : currentPlayingTrack.albumUrl}
                        />
                    </CoverImage>
                    <Box sx={{ ml: 1.5, minWidth: 0 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            {playingTrack ? playingTrack.artist : currentPlayingTrack.artist}
                        </Typography>
                        <Typography noWrap>
                            <b>{playingTrack ? playingTrack.title :  currentPlayingTrack.title}</b>
                        </Typography>
                    </Box>
                </Box>
                <Slider
                    aria-label="time-indicator"
                    size="small"
                    value={position}
                    min={0}
                    step={1}
                    max={duration}
                    // when dragging slider, player gets paused
                    onChange={(_, value) => {
                        setPaused(true)
                        setPosition(value)   
                    }}
                    sx={{
                        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                        height: 4,
                        '& .MuiSlider-thumb': {
                            width: 8,
                            height: 8,
                            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                            '&:before': {
                                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                            },
                            '&:hover, &.Mui-focusVisible': {
                                boxShadow: `0px 0px 0px 8px ${
                                theme.palette.mode === 'dark'
                                ? 'rgb(255 255 255 / 16%)'
                                : 'rgb(0 0 0 / 16%)'
                                }`,
                            },
                            '&.Mui-active': {
                                width: 20,
                                height: 20,
                            },
                        },
                        '& .MuiSlider-rail': {
                            opacity: 0.28,
                        },
                    }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: -2,
                  }}
                >
                  <TinyText>{formatDuration(position)}</TinyText>
                  <TinyText>-{formatDuration(duration - position)}</TinyText>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: -1,
                    }}
                >
                    <IconButton aria-label="previous song">
                        <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                    <IconButton
                        aria-label={paused ? 'play' : 'pause'}
                        onClick={() => {
                            setPaused(!paused)
                        }}
                    >
                        {paused ? (
                            <PlayArrowRounded
                                sx={{ fontSize: '3rem' }}
                                htmlColor={mainIconColor}
                            />
                        ) : (
                            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                        )}
                    </IconButton>
                    <IconButton aria-label="next song">
                        <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                </Box>
                <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                    <VolumeDownRounded htmlColor={lightIconColor} />
                    <Slider
                        aria-label="Volume"
                        defaultValue={30}
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                            '& .MuiSlider-track': {
                                border: 'none',
                            },
                            '& .MuiSlider-thumb': {
                                width: 24,
                                height: 24,
                                backgroundColor: '#fff',
                                '&:before': {
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                },
                            '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                boxShadow: 'none',
                                },
                            },
                        }}
                    />
                    <VolumeUpRounded htmlColor={lightIconColor} />
                </Stack>
            </Widget>
        </Box>
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

        
    
        