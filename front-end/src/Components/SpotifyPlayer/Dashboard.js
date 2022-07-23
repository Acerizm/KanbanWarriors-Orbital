import React, {useEffect, useState} from 'react'
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult';
import AudioPlayer from './AudioPlayer';
import Scroll from 'react-scroll-component';

// styled Components
import TextField from '@mui/material/TextField';
import { Card, CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MinimizeIcon from '@mui/icons-material/Minimize';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { Player } from '@lottiefiles/react-lottie-player';

// Redux
import { useDispatch,useSelector } from "react-redux";
import { displayMusicPlayerOff, getAudioPlayerState, audioPlayerModeOn, audioPlayerModeOff  } from '../Redux/Reducers/SpotifyPlayer/SpotifyPlayerSlice';

const spotifyApi = new SpotifyWebApi({
    // clientId:"df99a5fdb03042449bdb285e0f4193d6"
    // trying Haiqel's spotify accounts'
    clientId: 'deb3dc9dc4d3435384bb6237be1cd68c'
})

const Dashboard = ( {code} ) => {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [userName, setUserName] = useState('');

    // Redux stuff
    const dispatch = useDispatch();
    const audioPlayerclicked = useSelector(getAudioPlayerState)

    const chooseTrack = (track) => {
        setPlayingTrack(track);
        dispatch(audioPlayerModeOn())
    }

    const minimizeClicked = () => {
        dispatch(displayMusicPlayerOff());
    }

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchPlaylists(search).then((res)=> {
            if (cancel) return
            setSearchResults(
                res.body.playlists.items.map(playlist=> {
                    const smallestAlbumImage = playlist.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) {
                                return image;
                            }
                            return smallest;
                        }, playlist.images[0])

                    return {
                        title: playlist.name,
                        uri: playlist.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                })
            )
        })

        // to let only the last input be searched
        return () => (cancel = true)
    }, [accessToken, search])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getMe()
            .then((data) => {
                setUserName(data.body.display_name);
            })
    }, [accessToken])
    
    const TrackFinds = () => {
        if (searchResults.length > 0) {
            return (
                <Scroll
                    direction='vertical'
                    height='250px'
                >
                    {searchResults.map(track => (
                        <TrackSearchResult 
                            track= {track} 
                            key={track.uri}
                            chooseTrack={chooseTrack} 
                        />
                    ))}
                </Scroll>
            ) 
        } else {
            return (
                <Scroll
                    direction='vertical'
                    height='150px'
                >
                </Scroll>
            )
        }
    }

    return(
        <Card variant="outlined" 
            sx= {{ 
                width: 400, 
                backgroundColor:'rgba(255,255,255, 0.8)',
                padding:0
            }}
            >
            <CardContent
                sx ={{
                    "&:first-child" : {
                        paddingBottom: 0,
                    },                
                    padding:0,
                    paddingBottom:0,
                    paddingLeft:0,
                    paddingRight:0,
                }}
            >
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    {audioPlayerclicked ? 
                    <IconButton
                        sx={{cursor:'pointer'}}
                        onClick={() => dispatch(audioPlayerModeOff())}
                    >
                        <ChevronLeftIcon 
                            fontSize='large' 
                            sx={{color:'#1DB954'}}
                        />
                    </IconButton> : 
                    <Player
                    autoplay
                    
                    keepLastFrame
                    src="https://assets9.lottiefiles.com/packages/lf20_v2gjaej7.json"
                    style={{ height: '70px', width: '70px' }}
                    >
                    </Player>
                    }
                    <Typography variant='h6' sx={{color:'#1DB954'}}>
                    {userName}'s Spotify
                    </Typography>
                    <IconButton
                        sx={{cursor:'pointer'}}
                        onClick={minimizeClicked}
                    >
                        <MinimizeIcon
                            fontSize='large'
                            sx={{color:'#1DB954'}}
                        />
                    </IconButton>
                </div>
                {audioPlayerclicked ?
                    <span
                    // className given to have no draggable feature on Player
                    className="no-cursor"
                    >
                        <AudioPlayer
                            playingTrack = {playingTrack}
                        /> 
                    </span>
                :
                    <React.Fragment>
                        <TrackFinds/>
                        <TextField
                            id="outlined-search"
                            label="Song/Artist Name"
                            type="search"
                            value = {search}
                            onChange = {(event) => setSearch(event.target.value)}
                            fullWidth={true}
                            sx={{
                                '& label.Mui-focused': {
                                    color: '#1DB954',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1DB954',
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: '#1DB954',
                                },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                      borderColor: '#1DB954',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'green',
                                      },
                                      '&.Mui-focused fieldset': {
                                        borderColor: '#1DB954',
                                      }
                                },
                                marginTop:'10px'
                            }}
                        />
                    </React.Fragment>
                }
            </CardContent>
        </Card>
    )
}

export default Dashboard;