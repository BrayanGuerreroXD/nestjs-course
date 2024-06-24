import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    getHelloCat(): string {
        return 'Hello Cat!';
    }
}
