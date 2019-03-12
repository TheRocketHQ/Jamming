import React, { Component } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';

import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults: []};
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar />
          <div class="App-playlist">
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}/>
            <SearchResults searchResults={this.state.searchResults}/>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
