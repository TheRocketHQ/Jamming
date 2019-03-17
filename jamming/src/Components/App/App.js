import React, { Component } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import  Spotify from '../../util/Spotify';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }
  
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }}

  removeTrack(track) {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(playlistName, playlistTracks) {
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    // Spotify.savePlaylist(this.state.playlistName, trackURIs);

    this.setState({
      searchResults: [],
      playlistName: 'New Playlist'
    })
  }

  search(searchQuery){
    Spotify.search(searchQuery).then( tracks =>
      this.setState({
        searchResults: tracks
}));
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar 
              onSearch={this.search}
            />
          <div class="App-playlist">
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
            />
            <SearchResults searchResults={this.state.searchResults}/>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
