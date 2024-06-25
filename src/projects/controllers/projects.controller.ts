import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ProjectsService } from "../services/projects.service";
import { ProjectDto, ProjectUpdateDto } from "../dto/project.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { AccessLevelGuard } from "src/auth/guards/access-level.guard";
import { AccessLevel } from "src/auth/decorators/access-level.decorator";
import { ACCESS_LEVEL } from "src/constants/roles";

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {

    constructor(private readonly projectService: ProjectsService) {}

    @Get()
    public async getProjects() {
        return await this.projectService.findProjects();
    }

    @Get(":projectId")
    public async getProject(@Param('projectId', new ParseUUIDPipe) id: string){
        return await this.projectService.findProjectById(id);
    }

    @Post()
    public async createProject(@Body() body: ProjectDto) {
        return await this.projectService.createProject(body);
    }

    @Put(":projectId")
    @AccessLevel("OWNER")
    public async updateProject(@Body() body: ProjectUpdateDto, @Param('projectId', new ParseUUIDPipe) id: string) {
        return await this.projectService.updateProject(body, id);
    }

    @Delete(":projectId")
    public async deleteProject(@Param('projectId', new ParseUUIDPipe) id: string) {
        return await this.projectService.deleteProject(id);
    }

}