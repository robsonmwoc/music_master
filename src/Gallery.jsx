import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import './App.css';

export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }

  playAudio(previewUrl) {
    let audio = new Audio(previewUrl);

    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio
      });
    } else {
      if(this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({playing: false});
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        });
      }
    }
  }

  playButton(track) {
    if(this.state.playingUrl === track.preview_url) {
      return (<Icon name='pause' />);
    } else {
      return(<Icon name='play' />)
    }
  }

  card(track, k) {
    const trackImg = track.album.images[0].url;

    return (
      <Card raised key={k}>
        <Card.Content>
          <div
            className='track-thumb'
            onClick={() => this.playAudio(track.preview_url)}
          >
            <Image size='medium' src={trackImg} />
            <div className='track-button'>{this.playButton(track)}</div>
          </div>
          <Card.Header>{this.props.artist.name}</Card.Header>
          <Card.Meta>Album: {track.album.name}</Card.Meta>
          <Card.Description><strong>Track: {track.name}</strong></Card.Description>
        </Card.Content>
      </Card>
    )
  }

  render() {
    if(this.props.tracks.length === 0) return '';

    const { tracks } = this.props;

    return(
      <Card.Group className='track'>
        {
          tracks.map((track, k) => {
            return this.card(track, k)
          })
        }
      </Card.Group>
    )
  }
}

// <div>
//   {
//     tracks.map((track, k) => {
//       const trackImg = track.album.images[0].url;
//
//       return (
//         <div
//           key={k}
//           className='track'
//           onClick={() => this.playAudio(track.preview_url)}
//         >
//           <img src={trackImg} className='track-img' alt='track' />
//           <div className='track-play'>
//             <div className='track-play-inner'>
//               {
//                 this.state.playingUrl === track.preview_url
//                 ? <span>| |</span>
//                 : <span>&#9654;</span>
//               }
//             </div>
//           </div>
//           <p className='track-text'>{track.name}</p>
//         </div>
//       )
//     })
//   }
// </div>
