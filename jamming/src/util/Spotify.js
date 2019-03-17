import React from 'react';

const clientId = 5ba88baf49bb4dbeaaf790b1e0af91e8;
let accessToken = '';
const redirectUri = 'http://localhost:3000/';
let wipeTimer;

const Spotify = {
  getAccessToken () {
    if (accessToken) {
      return accessToken;
    } else { // verify token && get token time
      let url = window.location.href;
      let accessTokenMatch = url.match(/access_token=([^&]*)/);
      let matchedExpireTime = url.match(/expires_in=([^&]*)/);

      if (accessTokenMatch && matchedExpireTime) {

        accessToken = accessTokenMatch[1]
        let expireTime = matchedExpireTime[1]

        wipeTimer = window.setTimeout(() => accessToken = '', expireTime * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else { // redirect user to url
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      }
    }
  }
  searchSpotify(searchQuery){
    return fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`),
    {
      
    }
  }
}

export default Spotify;
