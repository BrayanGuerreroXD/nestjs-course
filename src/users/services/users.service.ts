import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UserDto, UserToProjectsDto, UserUpdateDto } from '../dto/user.dto';
import { ErrorManager } from '../../utils/error.manager';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity) private readonly userReposirtory: Repository<UsersEntity>,
        @InjectRepository(UsersProjectsEntity) private readonly userProjectRepository: Repository<UsersProjectsEntity>,
    ) {}

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
                .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
                .leftJoinAndSelect('projectsIncludes.project', 'project')
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

    public async addUserToProject(body: UserToProjectsDto): Promise<UsersProjectsEntity> {
        try {
            return await this.userProjectRepository.save(body);
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);
        }
    }

    public async removeUserFromProject(userId: string, projectId: string): Promise<DeleteResult | undefined> {
        try {
            if (!userId || !projectId)
                throw new ErrorManager({
                    type: "BAD_REQUEST",
                    message: 'userId and projectId are required'
                });

            const userProject: DeleteResult = await this.userProjectRepository.createQueryBuilder()
                .delete()
                .from(UsersProjectsEntity)
                .where('user_id = :userId', { userId })
                .andWhere('project_id = :projectId', { projectId })
                .execute();

            if (userProject.affected === 0) 
                throw new ErrorManager({
                    type: "BAD_REQUEST",
                    message: 'User not found in project'
                });
                
            return userProject;
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);          
        }
    }
}
