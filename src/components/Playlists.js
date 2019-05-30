import React, { Component } from 'react'

class Playlists extends Component {


  render() {
    // fetch('http://localhost:3000/')
    fetch('http://localhost:3000/ledgers?playlist_id=1&song_id=1')
    .then(response => response.json())
    .then(resJSON => console.log(resJSON))
    return (
      <div></div>
    )
  }
}

export default Playlists
