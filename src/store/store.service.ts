import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user';

@Injectable()
export class StoreService {
    private users: User[] = [];

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
}
