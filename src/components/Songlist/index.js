import React, { Component } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

class Songlist extends Component {
  state = {
    duration: '',
  };

  componentDidMount() {
    this.getAudioDuration();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.each.url !== this.props.each.url) {
      this.getAudioDuration();
    }
  }

  
  getAudioDuration = () => {
    const { url } = this.props.each;
    const audio = new Audio(url);
    audio.addEventListener('loadedmetadata', () => {
      const duration = this.formatDuration(audio.duration);
      this.setState({ duration });
    });
  };


  formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  render() {
    const { each, isSelected, onClick } = this.props;
    const { duration } = this.state;
    const { cover, name, artist } = each;
    const imageUrl = `https://cms.samespace.com/assets/${cover}`;

    return (
      <div
        className="songlist-item d-flex justify-content-center"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <button className={isSelected ? 'selected' : 'back'}>
          <div className="d-flex justify-content-center align-items-center">
            <img className="img" src={imageUrl} alt={cover} />
            <div className="song-item d-flex justify-content-between align-items-center">
              <div className="d-flex flex-column">
                <h1 className="name-css">{name}</h1>
                <p className="artist-css">{artist}</p>
              </div>
              <p className="duration-css">{duration}</p>
            </div>
          </div>
        </button>
      </div>
    );
  }
}

export default Songlist;
