import {useEffect, useState} from 'react'
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

// Redux
import { useDispatch } from "react-redux";
import { displayMusicPlayerOff } from '../Redux/Reducers/SpotifyPlayer/SpotifyPlayerSlice';

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

    const dispatch = useDispatch();

    const chooseTrack = (track) => {
        setPlayingTrack(track);
        setSearch('');
    }

    const minimizeClicked = () => {
        dispatch(displayMusicPlayerOff());
    }

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then((res)=> {
            console.log(res.body.tracks.items, "from dashboard")
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track=> {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) {
                                return image;
                            }
                            return smallest;
                        }, track.album.images[0])

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        duration_ms: track.duration_ms,
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
    }, [accessToken])
    
    const TrackFinds = () => {
        if (searchResults.length > 0) {
            return (
                <Scroll
                    direction='vertical'
                    height='150px'
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
                    height='50px'
                >
                </Scroll>
            )
        }
    }

    return(
        <Card variant="outlined" 
            sx= {{ 
                width: 420, 
                backgroundColor:'#333', 
                }}
            >
            <CardContent>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
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
                <TextField
                    id="outlined-search"
                    label="Song/Artist Name"
                    type="search"
                    value = {search}
                    onChange = {(event) => setSearch(event.target.value)}
                    fullWidth={true}
                    sx={{marginBottom:'10px', marginTop:'10px'}}
                />
                <TrackFinds/>
                <span 
                    style ={{marginTop:'10px'}}
                    // className given to have no draggable feature on Player
                    className="no-cursor"
                >
                    <Player
                        accessToken={accessToken}
                        playingTrack = {playingTrack}
                    />
                </span>
            </CardContent>
        </Card>
    )
}

export default Dashboard;