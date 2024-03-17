import { Artist } from './artist';
import { Album } from './album';
import { Track } from './track';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface FavoriteEntity {
  id: string;
  artistId?: string;
  artist?: Artist;
  albumId?: string;
  album?: Album;
  trackId?: string;
  track?: Track;
}
