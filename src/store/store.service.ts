import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user';

@Injectable()
export class StoreService {
    private users: User[] = [];

    createUser(userData: User): User {
        this.users.push(userData);
        const { password, ...newUserData } = userData;
        return newUserData;
    }

    getAllUsers(): User[] {
        return this.users.map(user => {
            const { password, ...rest } = user;
            return rest;
        });
    }

    getUserById(id: string): User {

    }
}
