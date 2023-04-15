/**
 * Express router paths go here.
 */

import {Immutable} from '@src/other/types';


const Paths = {
  Base: '/api/spotify',
  Auth: {
    Base: '/auth',
    Login: '/login',
    Callback: '/callback',
    Refresh_Token: '/refresh_token',
    Logout: '/logout',
  },
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
