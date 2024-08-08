import React, { Component } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

class Musiccontrols extends Component {
  state = {
    isPlaying: false,
    currentTime: 0,
    isMuted: false,
  };

  audioRef = React.createRef();

  componentDidUpdate(prevProps) {
    if (prevProps.selectedSongId !== this.props.selectedSongId) {
      this.audioRef.current.play();
      this.setState({ isPlaying: true });
    }
  }

  updateCurrentTime = () => {
    const audio = this.audioRef.current;
    const seekBar = document.querySelector('.seek-bar');
    const percentage = (audio.currentTime / audio.duration) * 100;
    
    seekBar.style.setProperty('--seek-value', `${percentage}%`);
    this.setState({ currentTime: audio.currentTime });
  };

  handleSeek = (event) => {
    const audio = this.audioRef.current;
    audio.currentTime = event.target.value;
    this.setState({ currentTime: audio.currentTime });
  };

  togglePlayPause = () => {
    const { isPlaying } = this.state;
    const audio = this.audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    this.setState({ isPlaying: !isPlaying });
  };

  toggleMute = () => {
    const audio = this.audioRef.current;
    audio.muted = !audio.muted;
    this.setState({ isMuted: audio.muted });
  };

  playNext = () => {
    const { songs, selectedSongId, onSongChange } = this.props;
    const currentIndex = songs.findIndex(song => song.id === selectedSongId);
    const nextIndex = (currentIndex + 1) % songs.length;
    const nextSongId = songs[nextIndex].id;

    onSongChange(nextSongId);
  };

  playPrevious = () => {
    const { songs, selectedSongId, onSongChange } = this.props;
    const currentIndex = songs.findIndex(song => song.id === selectedSongId);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    const previousSongId = songs[previousIndex].id;

    onSongChange(previousSongId);
  };

  render() {
    const { songs, selectedSongId } = this.props;
    const { currentTime, isPlaying, isMuted } = this.state;
    const currentSong = songs.find(song => song.id === selectedSongId);

    if (!currentSong) {
      return null;
    }

    const { cover, name, artist, url } = currentSong;
    const im = 'https://cms.samespace.com/assets/' + cover;

    return (
      <div className="music-controls">
        <h1 className="mb-2 textalin">{name}</h1>
        <p className="artist-colo mb-4 textalin">{artist}</p>
        <img className="img-css mb-3" src={im} alt={cover} />
        <audio ref={this.audioRef} src={url} onTimeUpdate={this.updateCurrentTime} />
        <input
          type="range"
          min="0"
          max={this.audioRef.current?.duration || 0}
          value={currentTime}
          onChange={this.handleSeek}
          className="seek-bar"
        />
        <div className="button-back d-flex align-items-center justify-content-between mt-3">
          <button className="volume-back btn back-button">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
          <div className='d-flex'>
            <button className="btn me-3 back-button" onClick={this.playPrevious}>
              <i className="fa-solid fa-backward"></i>
            </button>
            <button className="volume-back btn me-3" onClick={this.togglePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className="btn back-button" onClick={this.playNext}>
              <i className="fa-solid fa-forward"></i>
            </button>
          </div>
          <button className="volume-back btn back-button" onClick={this.toggleMute}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>
    );
  }
}

export default Musiccontrols;
