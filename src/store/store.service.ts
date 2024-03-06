import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user';
import { Artist } from '../interfaces/artist';

@Injectable()
export class StoreService {
    private users: User[] = [];
    private artists: Artist[] = [];

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
}
