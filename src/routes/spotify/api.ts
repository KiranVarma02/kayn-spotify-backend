import {Router} from 'express';
import Paths from '@src/routes/spotify/Paths';
import SpotifyAuthRoutes from '@src/routes/spotify/SpotifyAuthRoutes';

const spotifyAuthRouter = Router();

spotifyAuthRouter.get(Paths.Auth.Login, SpotifyAuthRoutes.spotifyLogin);
spotifyAuthRouter.get(Paths.Auth.Callback, SpotifyAuthRoutes.spotifyCallback);
spotifyAuthRouter
  .post(Paths.Auth.Refresh_Token, SpotifyAuthRoutes.spotifyRefreshToken);

export default spotifyAuthRouter;