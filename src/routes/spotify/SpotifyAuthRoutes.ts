import {generateRandomString} from "@src/util/misc";
import querystring from "querystring";
import axios from "axios";
import EnvVars from "@src/constants/EnvVars";

const CLIENT_ID: string = EnvVars.AppEnv.CLIENT_ID as string
const CLIENT_SECRET: string = EnvVars.AppEnv.CLIENT_SECRET as string
const REDIRECT_URL: string = EnvVars.AppEnv.REDIRECT_URL as string
const STATE_KEY: string = EnvVars.AppEnv.STATE_KEY as string
const TOKEN_URL: string = EnvVars.AppEnv.TOKEN_URL as string

const RANDOM_STRING_LENGTH = 16

const spotifyLogin = (req: any, res: any)=> {

        const state: string = generateRandomString(RANDOM_STRING_LENGTH)
        res.cookie(STATE_KEY, state);

        const scope: string = 'user-read-private user-read-email user-library-read user-library-modify user-read-playback-state user-modify-playback-state'

        const AUTH_URL: string = 'https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: CLIENT_ID,
                scope: scope,
                redirect_uri: REDIRECT_URL,
                state: state
            })

        res.redirect(AUTH_URL)
}

const spotifyCallback = async (req: any, res: any) => {

    const code = req.query.code || null
    const state = req.query.state || null
    const storedState = req.cookies ? req.cookies[STATE_KEY]: null

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }))
    } else {
        res.clearCookie(STATE_KEY)

        const formData = querystring.stringify({
            code: code,
            redirect_uri: REDIRECT_URL,
            grant_type: 'authorization_code'
        })

        const response = await axios
            .post(TOKEN_URL,formData, {
            headers: {
                'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
        })


        const data = response.data
        res.json({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in
        })
    }
}

/**
 * Sample Body:
 * {
 *     "refresh_token": "AQB2R-7J-yDJGUY3qZ53uipDgs1sRmZ1yT9p_XApbQU3CxUJTNnqAkLs_hAmshOaxlS66uEcFu5LG3_jY5VI3TEs2mOEo3j_i_FJ2TSR2hysNjoN0oJxIKNKpw8dHyc8MDk",
 *     "grant_type": "refresh_token"
 * }
 * @param req
 * @param res
 */
const spotifyRefreshToken = async (req: any, res: any) => {

    const refreshToken = req.body.refresh_token

    const formData = querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    })

    const response = await axios
        .post(TOKEN_URL,formData, {
            headers: {
                'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
        })

    const data = response.data;
    res.json({data})
}

export default {
    spotifyLogin,
    spotifyCallback,
    spotifyRefreshToken
}