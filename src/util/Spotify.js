// var axios = require("axios");
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
      const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURL;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then((jsonResponse) => {
        console.log(jsonResponse);
        if (!jsonResponse.tracks) {
          return [];
        } else {
          console.log(jsonResponse.tracks.items);
          jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
          }));
        }
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch("https://api.spotify.com/v1/me", { headers: headers })
      .then((response) => {
        response.json();
      })
      .then((jsonResponse) => {
        userId = jsonResponse.Id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: "POST",
          body: JSON.stringify({ name: name }),
        })
          .then((response) => {
            response.json();
          })
          .then((jsonResponse) => {
            console.log(jsonResponse);
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
              }
            );
          });
      });
  },
};

export default Spotify;

// AXIOS STUFF BELOW
// var config = {
//   method: 'get',
//   url: `https://api.spotify.com/v1/search?type=track&q=${term}`,
//   headers: {
//     'Authorization': 'Bearer BQB2p2uHUv19Oi9RZQravwPmPzuKsH7wyeP3ZS5Z3dqzBBcSEqEdiEtLBk4mZmA3LUeG78ETFEjkE9eqwNrNb0rjrmbPJxnx-5SWmLEru-FFt3TiY9A-uL1NJa78LRiHeoa_TD3E9XfA8wBt_nraYecl_A8WAGbCCV41KhkHSQriOpdZDH4H'
//   }
// };

// return axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });
