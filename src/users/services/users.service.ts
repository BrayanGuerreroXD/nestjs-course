import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDto, UserUpdateDto } from '../dto/user.dto';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity) private readonly userReposirtory: Repository<UsersEntity>,
    ) {}

    getHelloCat(): string {
        return 'Hello Cat!';
    }

    public async createUser(body: UserDto): Promise<UsersEntity> {
        try {
            return await this.userReposirtory.save(body);
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);          
        }
    }
    
    public async findUsers(): Promise<UsersEntity[]> {
        try {
            const users : UsersEntity[] = await this.userReposirtory.find();
            if (!users.length) {
                throw new ErrorManager({
                    type: "NO_CONTENT",
                    message: 'Users not found'
                });
            }
            return users;
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);       
        }
    }
    
    public async findUserById(id: string): Promise<UsersEntity> {
        try {
            const user: UsersEntity =  await this.userReposirtory
                .createQueryBuilder('user')
                .where({ id })
                .getOne();
            if (!user) 
                throw new ErrorManager({
                    type: "NOT_FOUND",
                    message: 'User not found'
                });
            return user;
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);          
        }
    }

    public async updateUser(body: UserUpdateDto, id: string): Promise<UpdateResult | undefined> {
        try {
            const user: UpdateResult = await this.userReposirtory.update(id, body);
            if (user.affected === 0) 
                throw new ErrorManager({
                    type: "BAD_REQUEST",
                    message: 'User not found'
                });
            return user;
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);          
        }
    }
    
    public async deleteUser(id: string): Promise<DeleteResult | undefined> {
        try {
            const user: DeleteResult = await this.userReposirtory.delete(id);
            if (user.affected === 0) 
                throw new ErrorManager({
                    type: "BAD_REQUEST",
                    message: 'User not found'
                });
            return user;
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);          
        }
    }
}
