let accessToken;
const clientID = '39e5a52079bd485f8dab3d4c0556de73';
const redirectURI = 'http://localhost:3000/';

const Spotify = {

    getAccessToken() {
        if(accessToken) {
            return accessToken
        }

        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // clear parameters and allow us to acces  new access access_token
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        }

    }



}

export default Spotify;