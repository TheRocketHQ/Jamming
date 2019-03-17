import React from 'react';

let accessToken = '';
const redirectUri = 'http://rocketca.surge.sh/';
let wipeTimer;

const Spotify = {
  getAccessToken () {
    if (accessToken) {
      return accessToken;
    } else {
      let url = window.location.href;
      let accessTokenMatch = url.match(/access_token=([^&]*)/);
      let matchedExpireTime = url.match(/expires_in=([^&]*)/);

      if (accessTokenMatch && matchedExpireTime) {

        accessToken = accessTokenMatch[1]
        let expireTime = matchedExpireTime[1]

        wipeTimer = window.setTimeout(() => accessToken = '', expireTime * 1000);
        window.history.pushState('Access Token', null, '/');

        return accessToken;
      } else { 
        window.location = `https://accounts.spotify.com/authorize?client_id=$ba88baf49bb4dbeaaf790b1e0af91e8&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      }
    }
  },

  search(searchQuery){
    return fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track&q=TERM`), {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }.then( response => { 
        if (response.ok) {
          return response.json();
        } else {
          console.log('API Request Failed');
        }
      }).then( jsonResponse => {
          if (!jsonResponse.tracks) {
            return [];
          }

          return jsonResponse.tracks.items.map( track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            cover: track.album.images[2].url,
            preview: track.preview_url
          }));
        });
    },

    savePlaylist(playlistName, trackUris){
      let userId;
      let playlistId;
      const headers = { headers: { Authorization: `Bearer ${accessToken}` } };
      const header = { Authorization: `Bearer ${accessToken}` };
      
      let userUrl = `https://api.spotify.com/v1/me`;
  
      fetch(userUrl, headers)
        .then(response => response.json())
        .then(jsonResponse => userId = jsonResponse.id)
        .then(() => {
          const createPlaylistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;

          fetch(createPlaylistUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ name: playlistName })
          }).then( response => response.json())
            .then( jsonResponse => playlistId = jsonResponse.id)
            .then(() => {
              const createTrackUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;

              fetch(createTrackUrl, {
                method: 'POST',
                headers: header,
                body: JSON.stringify({ uris: trackUris })
              });
            });
        });
      }
  };

export default Spotify;
