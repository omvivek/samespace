import { Component } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Songlist from '../Songlist';
import Musiccontrols from '../MusicControls';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = { query: '', songs: [], filteredSongs: [], activeTab: 'forYou', selectedSongId: 1 };

  componentDidMount() {
    this.fetchSongs();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      this.handleTabChange(this.props.tab);
    }
  }

  fetchSongs = async () => {
    try {
      const response = await fetch('https://cms.samespace.com/items/songs');
      const data = await response.json();
      this.setState({ songs: data.data, filteredSongs: data.data });
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  handleTabChange = (tab) => {
    const { songs } = this.state;
    const filteredSongs = tab === 'topTracks' ? songs.filter((song) => song.top_track) : songs;
    this.setState({ filteredSongs });
  };

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const { query, songs } = this.state;
    const filteredSongs = songs.filter(
      (song) =>
        song.name.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ filteredSongs });
  };

  handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleSongSelect = (id) => {
    this.setState({ selectedSongId: id });
  };

  setBackgroundGradient = () => {
    const { songs, selectedSongId } = this.state;
    const currentSong = songs.find((song) => song.id === selectedSongId);
    if (currentSong) {
      return {
        background: `linear-gradient(to left, #000, ${currentSong.accent})`,
      };
    }
    return {};
  };

  handleSongChange = (id) => {
    this.setState({ selectedSongId: id });
  };

  render() {
    const { query, filteredSongs, selectedSongId } = this.state;
    return (
      <div
        className="main-background d-flex flex-row justify-content-around"
        style={this.setBackgroundGradient()}
      >
        
        <div className='d-flex justify-content-start'>

        <div className="start-section sidebar d-flex flex-column justify-content-between">
          <img
            className="logo"
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkI7t0Z7XLVCOrQZIBkHShPPH9g1wV5pOk3nfyehC7Us-xqBjleIjwONL8-W3XpaLGSULO8E4pzmQpjAsUh1_ZWPPaXsHFks1yniSAt4hyphenhyphenB0uHN-0wa8udiBEan0ENuLMG0hGQLxcbVf5o6NOGxxZzgbSP0sQJRk8t2rq4BCa_XlPzlaEHFHcsNDsk/s320/Logo.png"
            alt="logo"
          />
          <img
            className="profile"
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiF6kHHK4FIpKXgFoGeEWRKLPY_BE7f0L274ULqbyOIkGWhVIvvWwYit0-DQQXB0ZFWGxQ-4egIFRoc28D1QTmT5YEMMRG6SxhF_84hM7elMNEwfrUIUsa6aQAHBU2jXbiinNFr7ktgxWrlRwZLHSEm_M9piubgRBEY8jIzWrHNhkK4rQ0KNUCeMlpt/s320/Profile.png"
            alt="profile"
          />
        </div>

        </div>
        
        <div className="middle-section d-none d-md-block">
          <div className="d-flex align-items-center justify-content-around">
            <Link to="/forYou" onClick={() => this.handleTabChange('forYou')}>
              <h5 className='tab-links'>For You</h5>
            </Link>
            <Link to="/topTracks" onClick={() => this.handleTabChange('topTracks')}>
              <h5 className='tab-links'>Top Tracks</h5>
            </Link>
          </div>
          <div className="search-bar">
            <input
              type="text"
              value={query}
              onChange={this.handleInputChange}
              onKeyDown={this.handleEnterKeyPress}
              placeholder="Search Song, Artist"
            />
            <button onClick={this.handleSearch}>
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <div className="song-list">
            {filteredSongs.map((each) => (
              <Songlist
                each={each}
                key={each.id}
                isSelected={each.id === selectedSongId}
                onClick={() => this.handleSongSelect(each.id)}
              />
            ))}
          </div>
        </div>

        
        <div className="d-flex align-items-center justify-content-center">
          <Musiccontrols
            songs={filteredSongs}
            selectedSongId={selectedSongId}
            onSongChange={this.handleSongChange}
          />
        </div>
      </div>
    );
  }
}

export default Home;
