import React from "react";

const TrackSearchResult = ({track, key, chooseTrack}) => {

    const handlePlay = () => {
        chooseTrack(track);
    }

    return (
        <div 
            style ={{cursor: 'pointer'}}
            onClick={handlePlay}
        >
            <img src={track.albumUrl} style ={{height:'64px', width:'64px'}} />
            <div>
                <div>{track.title}</div>
                <div>{track.artist}</div>
            </div>
        </div>
    )
}

export default TrackSearchResult;