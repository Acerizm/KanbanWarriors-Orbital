import {useEffect, useState} from 'react'
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';

const spotifyApi = new SpotifyWebApi({
    clientId:"df99a5fdb03042449bdb285e0f4193d6"
})

const Dashboard = ( {code} ) => {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()

    const chooseTrack = (track) => {
        setPlayingTrack(track);
        setSearch('');
    }

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then((res)=> {
            if (cancel) return
            setSearchResults(
                res.body.tracks.items.map(track=> {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        }, track.album.images[0])

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                })
            )
        })

        // to let only the last input be searched
        return () => cancel = true
    }, [accessToken, search])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    return(
        <div style={{border:"solid red 1px", padding:"10px"}}>
            <input 
                type='search'
                placeholder= 'Songs/artist name'
                value = {search}
                onChange = {(event) => setSearch(event.target.value)}
            />
            <div style={{border:"solid blue 1px", padding:"10px", color: 'red'}}>
                {searchResults.map(track => {
                    <TrackSearchResult 
                        track= {track} 
                        key={track.uri}
                        chooseTrack={chooseTrack} 
                    />
                })}
            </div>
            <div><Player 
                    accessToken={accessToken}
                    trackUri = {playingTrack?.uri}
                />
            </div>
        </div>
    )
}

export default Dashboard;