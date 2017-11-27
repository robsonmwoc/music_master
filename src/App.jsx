import React, { Component } from 'react';
import {
  Header,
  Grid,
  Form,
  Icon,
  Input,
  Button
} from 'semantic-ui-react';

import './App.css';
import Profile from './Profile';
import Gallery from './Gallery';
import Github from './Github';

const ACCESS_TOKEN = 'your_access_token';
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
        <style>
          {`
            body > div,
            body > div > div {
              height: 100%;
            }
          `}
        </style>
        <Grid
          textAlign='center'
          style={{ height: '100%', marginTop: '50px' }}
          verticalAlign='top'
        >
          <Grid.Column style={{ maxWidth: '80%' }}>
            <Header as='h1' className='app-title'>
              <Icon name='music' className='app-logo' />
              {' '}Music Master
            </Header>

            <Form>
              <Input
                action={<Button content='Search' onClick={() => this.search()} />}
                placeholder='Search for an Artist'
                style={{ marginLeft: '-80px' }}
                value={this.state.query}
                onChange={event => { this.setState({ query: event.target.value }) }}
                // onKeyPress={event => { event.key === 'Enter' ? this.search() : '' }}
              />
            </Form>

            <Profile artist={this.state.artist} />
            <Gallery tracks={this.state.tracks} artist={this.state.artist} />

          </Grid.Column>
        </Grid>

        <Github />
      </div>
    )
  }
}
