import React, { Component } from 'react';
import "./App.css";
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from './../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      playlistName: 'Tits playlist',
      playlistTracks: [
        { name: 'tonysong',
          artist: 'tony',
          album: 'tony alubm',
          id: 'id444'
      },
      {   name: 'joey song',
          artist: 'joey',
          album: 'joey alubm',
          id: 'id555'
      }
      ],
      searchResults: [
        { name: 'mdonna song',
          artist: 'mdonna',
          album: 'mdonna alubm',
          id: 'id123'
      },
      { name: 'tonysong',
          artist: 'tony',
          album: 'tony alubm',
          id: 'id444'
      },
      {   name: 'joey song',
          artist: 'joey',
          album: 'joey alubm',
          id: 'id555'
      }
      ]
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
  }

  search(term) {
    console.log(term)
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


