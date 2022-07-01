const express = require("express");
const cors = require('cors')
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
// to fix the cors error in the console page
app.use(cors())
// to fix other errors, parse into json
app.use(express.json())

app.post('/refresh', (req,res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri:"http://localhost:3000/",
        clientId:"df99a5fdb03042449bdb285e0f4193d6",
        clientSecret:"563d044820ed459db684ddfeb7180a6f",
        refreshToken
    })
    // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
    spotifyApi.refreshAccessToken()
        .then((data) =>  {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            });
        })
        .catch(() => {
            res.sendStatus(400);
        })
})

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
    }).catch((err)=> {
        console.log(err);
        res.sendStatus(400);
    })
})

app.listen(3001);