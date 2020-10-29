let accessToken;
const clientID = "39e5a52079bd485f8dab3d4c0556de73";
const redirectURI = "http://localhost:3000/";

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    // check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // clear parameters and allow us to acces  new access access_token
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}
            `;
      window.location = accessURL;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
    { headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response => {
        return response.json()
    })
    .then(jsonResponse => {
        if(!jsonResponse.track) {
            return [];
        } else {
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                uri: track.uri
            }))
        }
    })
  },

  savePlaylist(name, trackUris) {
      if(!name || !trackUris.length) { 
        return;
      }
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}`}
      let userId;

      return fetch('https://api.spotify.com/v1/me', {headers: headers})
      .then(response => {
          response.json()
      })
      .then(jsonResponse => {
          userId = jsonResponse.Id
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
          {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ name: name })
          })
          .then(response => {
              response.json()
          })
          .then(jsonResponse => {
              const playlistId = jsonResponse.id
              return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ uris: trackUris })
              )
          })
      })

  }

};

export default Spotify;
