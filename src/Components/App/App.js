import React, { Component } from 'react';
import "./App.css";
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from './../Playlist/Playlist';
import Spotify from './../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playlistName: 'playlist name',
      playlistTracks: [],
      searchResults: []
    }

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)

  }

  removeTrack(track) {
    let newList = this.state.playlistTracks.filter(track.id)
    this.setState({ playlistTracks: newList })
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => 
      savedTrack.id === track.id)) {
        return;
    }
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackUris)
    .then(function() {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term)
    .then((searchResults) => {
      this.setState({ searchResults: searchResults })
      console.log(this.state.searchResults)
    }
    )
  }

  render() {
  return (
    <div>
      <h1>
        Li<span className="highlight">st</span>r
      </h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults 
          onAdd={this.addTrack} 
          searchResults={this.state.searchResults}/>
          <Playlist 
          onSave={this.savePlaylist} 
          onNameChange={this.updatePlaylistName} 
          onRemove={this.removeTrack} 
          playlistName={this.state.playlistName} 
          playlistTracks={this.state.playlistTracks}/>
        </div>
      </div>
    </div>
  )
  }
}

export default App;


