import React, { Component } from 'react';
import {
  Header,
  Grid,
  Form,
  Icon
} from 'semantic-ui-react';

import './App.css';
import Profile from './Profile';
import Gallery from './Gallery';


const ACCESS_TOKEN = 'BQBAzQvClg8OnCjjvkXkYIGTrpUul1K4HXSERajm3Yn6PnK13wFSgpDg7liEBWbCZNARj5J3cPCg03AeIxoWOCBifXeS-QB4aGu0H9pJ8FQuMbEhUzjlOiPKYVohEK8Tddz3PXlEmPCy8KeC8PJ_obSmiitCmkO6yweiLansISaHriE&refresh_token=AQClPeInwue693_9MEHSP24VD2niLFdK8SukRX-k-HEjAZz2ZDKNkmkw189mUp82dazo2jb-HzIEeiWcW8wAvfPrYM2NTfaTgzqBwL0EGGJQSMmx3f1FjVzcMK_RE43LyKw';
const BASE_URL = 'https://api.spotify.com/v1/search';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    const FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = '	https://api.spotify.com/v1/artists';

    const request_params = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, request_params)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({artist});

        const album_url = `${ALBUM_URL}/${artist.id}/top-tracks?country=BR&`;
        fetch(album_url, request_params)
          .then(response => response.json())
          .then(json => {
            const { tracks } = json;
            this.setState({tracks});
          })
      });
  }

  render() {
    return (
      <div className='App'>
        <Grid>
          <Grid.Column>
            <Header as='h1'>Music Master</Header>

            <Form>
              <Form.Input
                type='text'
                placeholder='Search for an Artist'
                value={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.search()
                  }
                }}
              />
              <Form.Button
                icon='search'
                onClick={() => this.search()}
              />
            </Form>

            { this.state.artist !== null ?
              <Profile artist={this.state.artist} />
              : <div></div>
            }

            <Gallery tracks={this.state.tracks} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
