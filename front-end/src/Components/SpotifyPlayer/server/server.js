const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()

app.post('/login',(req,res)=> {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri:"http://localhost:3000/",
        clientId:"df99a5fdb03042449bdb285e0f4193d6",
        clientSecret:"563d044820ed459db684ddfeb7180a6f",
    })

    spotifyApi.authorizationCodeGrant(code).then(data=> {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(()=> {
        res.sendStatus(400);
    })
})