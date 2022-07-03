import React from 'react';

// styles
import Button from '@mui/material/Button';

// changing AUTHURL from 
// "https://accounts.spotify.com/authorize?client_id=df99a5fdb03042449bdb285e0f4193d6&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
// to Haiqel's one

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=deb3dc9dc4d3435384bb6237be1cd68c&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const Login = () => {
    return (
        <Button 
            variant="contained" 
            href= {AUTH_URL} 
            color= 'success'>Login With Spotify</Button>
    )
}

export default Login;