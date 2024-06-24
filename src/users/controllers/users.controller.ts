import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserToProjectsDto, UserUpdateDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // ============================== User Endpoints ==============================

    @Get()
    public async getUsers() {
        return await this.usersService.findUsers();
    }

    @Get(":id")
    public async getUser(@Param('id') id: string){
        return await this.usersService.findUserById(id);
    }

    @Post()
    public async createUser(@Body() body: UserDto) {
        return await this.usersService.createUser(body);
    }

    @Put(":id")
    public async updateUser(@Body() body: UserUpdateDto, @Param('id') id: string) {
        return await this.usersService.updateUser(body, id);
    }

    @Delete(":id")
    public async deleteUser(@Param('id') id: string) {
        return await this.usersService.deleteUser(id);
    }

    // ============================== User - Project Relation Endpoints ==============================

    @Post("add-to-project")
    public async addUserToProject(@Body() body: UserToProjectsDto) {
        return await this.usersService.addUserToProject(body);
    }

}
