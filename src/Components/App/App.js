import React, { Component } from 'react';
import "./App.css";
import SearchBar from './../SearchBar/SearchBar';
import SearchResults from './../SearchResults/SearchResults';
import Playlist from './../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props)
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
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


  render() {
  return (
    <div>
      <h1>
        Li<span className="highlight">st</span>r
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
          <Playlist onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
        </div>
      </div>
    </div>
  )
  }
}

export default App;


