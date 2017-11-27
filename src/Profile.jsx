import React, { Component } from 'react';
import { Item, Label } from 'semantic-ui-react'

import './App.css';

export default class Profile extends Component {
  render() {
    if(this.props.artist === null) return '';

    let artist = {
      name: '',
      followers: { total: '' },
      images: [{ url: '' }],
      genres: []
    };
    artist = this.props.artist !== null ? this.props.artist : artist;

    return(
      <Item.Group divided className='artist-profile'>
        <Item>
          <Item.Image src={artist.images[0].url} />

          <Item.Content>
            <Item.Header as='h2' style={{ fontSize: '25px' }}>{artist.name}</Item.Header>
            <Item.Meta>
              <span>Followers: {artist.followers.total}</span>
            </Item.Meta>
            <Item.Extra>{
              artist.genres.map((genre, k) => {
                return (<Label key={k}>{genre}</Label>)
              })
            }</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    )
  }
}
