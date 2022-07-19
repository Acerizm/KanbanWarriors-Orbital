import React, {useEffect, useState} from 'react'
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import Scroll from 'react-scroll-component';

// styled Components
import TextField from '@mui/material/TextField';
import { Card, CardContent, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MinimizeIcon from '@mui/icons-material/Minimize';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


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

    // Redux stuff
    const dispatch = useDispatch();
    const audioPlayerclicked = useSelector(getAudioPlayerState)

    const chooseTrack = (track) => {
        setPlayingTrack(track);
        setSearch('');
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
            console.log(res.body.playlists, "from dashboard")
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

        // spotifyApi.searchTracks(search).then((res)=> {
        //     console.log(res.body.tracks.items, "from dashboard")
        //     if (cancel) return
        //     setSearchResults(
        //         res.body.tracks.items.map(track=> {
        //             const smallestAlbumImage = track.album.images.reduce(
        //                 (smallest, image) => {
        //                     if (image.height < smallest.height) {
        //                         return image;
        //                     }
        //                     return smallest;
        //                 }, track.album.images[0])

        //             return {
        //                 artist: track.artists[0].name,
        //                 title: track.name,
        //                 uri: track.uri,
        //                 duration_ms: track.duration_ms,
        //                 albumUrl: smallestAlbumImage.url
        //             }
        //         })
        //     )
        // })

        // to let only the last input be searched
        return () => (cancel = true)
    }, [accessToken, search])
    console.log(accessToken)

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.getMe()
            .then((data) => {
                console.log('Some information about the authenticated user', data.body);
                spotifyApi.getCategories({
                    limit : 5,
                    offset: 0,
                    country: 'SG',
                    locale: 'sv_SG'
                })
                .then(function(data) {
                  console.log(data.body);
                }, function(err) {
                  console.log("Something went wrong!", err);
                });
                    
            }, function(err) {
                console.log('Something went wrong!', err);
            });
        
        spotifyApi.getFeaturedPlaylists({ limit : 6, offset: 1, country: 'SG'})
            .then(function(data) {
              console.log(data.body);
            }, function(err) {
              console.log("Something went wrong!", err);
            });
        
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
                backgroundColor:'rgba(51,51,51, 0.8)',
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
                    <IconButton
                        sx={{cursor:'pointer'}}
                        onClick={() => dispatch(audioPlayerModeOff())}
                    >
                        <ChevronLeftIcon 
                            fontSize='large' 
                            sx={{color:'#1DB954'}}
                        />
                    </IconButton>
                    <Typography variant='h6' sx={{color:'#1DB954'}}>
                    Music Player
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
                        <Player
                            accessToken={accessToken}
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
                            sx={{marginTop:'10px'}}
                        />
                    </React.Fragment>
                }
            </CardContent>
        </Card>
    )
}

export default Dashboard;