import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios
            .post('http://localhost:4000/login', {
                code,
            })
            .then((res)=> {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)

                // to clear/hide the information in the route
                window.history.pushState({}, null, '/')
            })
            .catch(()=> {
                // to prevent any errors from popping by redirecting to main page
                window.location = '/'
            })
    }, [code])


    // since the access token only last for at most 1hr, we
    // we will do auto refresh for our users using the refreshToken
    // and expiresIn hook
    useEffect(()=> {
        // to prevent a case where the following code gets run before we 
        // have a refreshToken or an expiresIn
        if (!refreshToken || !expiresIn ) return
        const interval = setInterval(() => {
            axios
                .post('http://localhost:4000/refresh', {
                    refreshToken,
                })
                .then((res)=> {
                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)
                })
                .catch(()=> {
                    window.location = '/'
                })
            // to refresh 1min before access token expires
        }, (expiresIn-60) * 1000)

        // to prevent any event where the refresh token expires
        // and changes before an actual refresh, we just make sure
        // we clear the timeout so that we dont use an incorrect refresh
        // token
        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])


    return accessToken;
}

export default useAuth;