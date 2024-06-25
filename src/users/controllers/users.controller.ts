import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserToProjectsDto, UserUpdateDto } from '../dto/user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@Controller('users')
@UseGuards(AuthGuard)
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
    @PublicAccess()
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

    @Delete("remove-from-project/:userId/:projectId")
    public async removeUserFromProject(@Param('userId') userId: string, @Param('projectId') projectId: string) {
        return await this.usersService.removeUserFromProject(userId, projectId);
    }

}
