import React, { Component } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';

import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
        <div class="App-playlist">
          <Playlist />
          <SearchResults />
        </div>
        </div>
      </div>
      
    );
  }
}

export default App;
