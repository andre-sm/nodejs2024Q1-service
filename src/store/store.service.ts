import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user';
import { Artist } from '../interfaces/artist';
import { Album } from '../interfaces/album';
import { Track } from '../interfaces/track';
import { Favorites, FavoritesResponse } from '../interfaces/favs';

@Injectable()
export class StoreService {
    private users: User[] = [];
    private artists: Artist[] = [];
    private albums: Album[] = [];
    private tracks: Track[] = [];
    private favorites: Favorites = {
        artists: [],
        albums: [],
        tracks: [],
    }

    createUser(userData: User): User {
        this.users.push(userData);
        return userData;
    }

    getAllUsers(): User[] {
        return this.users;
    }

    getUserById(id: string): User {
        return this.users.find(user => user.id === id);
    }

    updateUserPassword(updatedUser: User): User {
        const userIndex = this.users.findIndex(user => user.id === updatedUser.id);
        this.users[userIndex] = updatedUser;
        return updatedUser;
    }

    deleteUserById(id: string): Boolean {
        const userIndex = this.users.findIndex((user) => user.id === id);

        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
          return true;
        }
        return false;
    }

    createArtist(newArtist: Artist): Artist {
        this.artists.push(newArtist);
        return newArtist;
    }

    getAllArtists(): Artist[] {
        return this.artists;
    }

    getArtistById(id: string): Artist {
        return this.artists.find(artist => artist.id === id);
    }

    updateArtist(updatedArtist: Artist): Artist {
        const artistIndex = this.artists.findIndex(artist => artist.id === updatedArtist.id);
        this.artists[artistIndex] = updatedArtist;
        return updatedArtist;
    }

    deleteArtistById(id: string): Boolean {
        const artistIndex = this.artists.findIndex(artist => artist.id === id);

        if (artistIndex !== -1) {
            this.artists.splice(artistIndex, 1);
          return true;
        }
        return false;
    }

    setArtistReferencesToNull(artistId: string): void {
        this.albums.forEach(album => {
            if (album.artistId === artistId) {
                album.artistId = null;
            }
        });

        this.tracks.forEach(track => {
            if (track.artistId === artistId) {
                track.artistId = null;
            }
        });
    }

    createAlbum(newAlbum: Album): Album {
        this.albums.push(newAlbum);
        return newAlbum;
    }

    getAllAlbums(): Album[] {
        return this.albums;
    }

    getAlbumById(id: string): Album {
        return this.albums.find(album => album.id === id);
    }

    updateAlbum(updatedAlbum: Album): Album {
        const albumIndex = this.albums.findIndex(album => album.id === updatedAlbum.id);
        this.albums[albumIndex] = updatedAlbum;
        return updatedAlbum;
    }

    deleteAlbumById(id: string): Boolean {
        const albumIndex = this.albums.findIndex(album => album.id === id);

        if (albumIndex !== -1) {
            this.albums.splice(albumIndex, 1);
          return true;
        }
        return false;
    }

    setAlbumReferencesToNull(albumId: string): void {
        this.tracks.forEach(track => {
            if (track.albumId === albumId) {
                track.albumId = null;
            }
        });
    }

    createTrack(newTrack: Track): Track {
        this.tracks.push(newTrack);
        return newTrack;
    }

    getAllTracks(): Track[] {
        return this.tracks;
    }

    getTrackById(id: string): Track {
        return this.tracks.find(track => track.id === id);
    }

    updateTrack(updatedTrack: Track): Track {
        const trackIndex = this.tracks.findIndex(track => track.id === updatedTrack.id);
        this.tracks[trackIndex] = updatedTrack;
        return updatedTrack;
    }

    deleteTrackById(id: string): Boolean {
        const trackIndex = this.tracks.findIndex(track => track.id === id);

        if (trackIndex !== -1) {
            this.tracks.splice(trackIndex, 1);
          return true;
        }
        return false;
    }

    getAllFavs(): FavoritesResponse {
        return {
            artists: this.artists.filter(artist => this.favorites.artists.includes(artist.id)),
            albums: this.albums.filter(album => this.favorites.albums.includes(album.id)),
            tracks: this.tracks.filter(track => this.favorites.tracks.includes(track.id)),
        }
    }

    deleteFromFav(key: string, id: string) {
        const entityIndex = this.favorites[key].findIndex(favId => favId === id);

        if (entityIndex !== -1) {
            this.favorites[key].splice(entityIndex, 1);
        }
    }

    addTrackToFav(id: string) {
        this.favorites.tracks.push(id);
    }

    deleteFavTrack(id: string) {
        const trackIndex = this.favorites.tracks.findIndex(trackId => trackId === id);

        if (trackIndex !== -1) {
            this.favorites.tracks.splice(trackIndex, 1);
          return true;
        }
        return false;
    }

    addAlbumToFav(id: string) {
        this.favorites.albums.push(id);
    }

    deleteFavAlbum(id: string) {
        const albumIndex = this.favorites.albums.findIndex(albumId => albumId === id);

        if (albumIndex !== -1) {
            this.favorites.albums.splice(albumIndex, 1);
          return true;
        }
        return false;
    }

    addArtistToFav(id: string) {
        this.favorites.artists.push(id);
    }

    deleteFavArtist(id: string) {
        const artistIndex = this.favorites.artists.findIndex(artistId => artistId === id);

        if (artistIndex !== -1) {
            this.favorites.artists.splice(artistIndex, 1);
          return true;
        }
        return false;
    }
}
