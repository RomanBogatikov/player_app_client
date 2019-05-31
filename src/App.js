import React, { Component } from 'react';
// import Playlists from './components/Playlists'
import './App.css';

// function App() {
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: '',
      email: '',
      password: '',
      title: '',
    }
    this.getPlaylists = this.getPlaylists.bind(this)
    this.renderPlaylists = this.renderPlaylists.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getPlaylists() {
    fetch('/users/1')
    .then(response => response.json())
    // .then(resJSON => console.log(resJSON.playlists))
    // .then(resJSON => this.renderPlaylists(resJSON.playlists))
    .then(resJSON => this.setState({
      playlists: resJSON.playlists
    }))
    .catch(error => console.log(error))
  }

  renderPlaylists(playlists) {
    console.log(playlists)
    if (playlists.length !== 0) {
      return playlists.map( (playlist) => {
        if (playlist.songs) {
          return (
            <React.Fragment>
              <p>{playlist.title}</p>
              <ul>List of songs:
                {playlist.songs.map( song => (
                  <li key={song.id}>{song.title}</li>
                ) )}
              </ul>
            </React.Fragment>
          )
        } else {
          return (
            <React.Fragment>
            <p>{playlist.title}</p>
            <ul>List of songs:
            </ul>
          </React.Fragment>
          )
        }
      })
    }
  }

  handleChange (event) {
    this.setState({[event.target.id] : event.target.value})
  }

  handleSubmit(event) {
    console.log("title=", event.target.title.value);
    event.preventDefault();
    fetch('/playlists', {
      body:JSON.stringify({
        title: event.target.title.value,
        user_id: '1',
      }),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(addedPlaylist => addedPlaylist.json())
    // .then(playlist => console.log(playlist))
    .then(jsonedPlaylist => this.setState({playlists: [jsonedPlaylist]}))
  }

  render() {
    return (
      <div className="App">
      <h1 style={{marginTop: "20vh", marginBottom: "5vh"}}>
      Playlists
    </h1>
    <form>
      <label htmlFor="email">Email: </label>
      <br />
      <input
        name="email"
        id="email"
        type="email"
      />
      <br /><br />
      <label htmlFor="password">Password:</label>
      <br />
      <input
        name="password"
        id="password"
        type="password"
      />
      </form>
      <br />
      <button
        onClick={this.login}
      >
          Login
      </button>
    <br />
    <button
      onClick={this.getPlaylists}
      style={{marginTop: "10vh"}}
    >
      Get Playlists
    </button>

    <form onSubmit={this.handleSubmit}>
      <label htmlFor="title">
        <input type="text" name="title" id="title" placeholder="playlist title" onChange={this.handleChange}/>
        <input type="submit" value="Create playlist"/>
      </label>
    </form>


    {this.renderPlaylists(this.state.playlists)}




      </div>
    );
  }
}

export default App;
