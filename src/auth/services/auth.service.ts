import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UsersEntity } from 'src/users/entities/users.entity';
import { AuthBody } from '../interfaces/auth.interface';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService
    ) {}

    public async validateUser(body: AuthDto): Promise<UsersEntity | null> {
        // Check if the user exists in the database by username
        const userByUsername = await this.userService.findBy({
            key: 'username',
            value: body.username
        });

        // Check if the user exists in the database by email
        const userByEmail = await this.userService.findBy({
            key: 'email',
            value: body.username
        });

        // Check if the password is correct
        if (userByUsername) {
            const match = await bcrypt.compare(body.password, userByUsername.password);
            if (match) return userByUsername;
        }

        if (userByEmail) {
            const match = await bcrypt.compare(body.password, userByEmail.password);
            if (match) return userByEmail;
        }

        return null;
    }

    public signJWT({ payload, secret, expires,
    }: {
        payload: jwt.JwtPayload;
        secret: string;
        expires: number | string;
    }): string {
        return jwt.sign(payload, secret, { expiresIn: expires });
    }

    public async generateJWT(user: UsersEntity): Promise<any> {
        const getUser = await this.userService.findUserById(user.id);
    
        const payload = {
            role: getUser.role,
            sub: getUser.id,
        };
    
        return {
            accessToken: this.signJWT({
                payload,
                secret: process.env.JWT_SECRET,
                expires: '1h',
            }),
            user,
        };
    }

}