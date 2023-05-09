import { gql } from '@apollo/client';

export const GET_PLAYLISTS = gql`
  query {
    getPlaylists {
      id
      title
    }
  }
`

export const GET_SONGS = gql`
  query GetPlaylist($activeMenuId: Int!) {
    getSongs(playlistId: $activeMenuId) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`