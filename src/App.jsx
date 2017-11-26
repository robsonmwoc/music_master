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

const ACCESS_TOKEN = 'BQBj9Kmot_8PldVrlEYcQ3AgdMRuepQakooU_hFFhIUHfQakqoB4smfa8uVIdjz6eK6IHGNIP4G5QSx2D7bPhPuO-RD3AcR5jGtypX4_zpH5JR-_ydEyk1Vm2GQBVuief5U9Guh8GzKuZpq6I9P0iZbOigyO78adQ1lLjYvCWH4y6gU&refresh_token=AQA3D2rZbZ_nKponVegiCwh3VX-QatwLRNAKgdJYFFXxg7pC1hrf-eqBIYDO40XS34M3XX23jtX3wIfZSLOfBE5OuDw05We7texUR3ANiyFAqQ-tGd7T0H0Pcech-KBcQMc';
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
          <Grid.Column style={{ maxWidth: 600 }}>
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
                onKeyPress={event => { event.key === 'Enter' ? this.search() : '' }}
              />
            </Form>

            <Profile artist={this.state.artist} />
            <Gallery tracks={this.state.tracks} />

          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
