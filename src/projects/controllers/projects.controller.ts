import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProjectsService } from "../services/projects.service";
import { ProjectDto, ProjectUpdateDto } from "../dto/project.dto";

@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectService: ProjectsService) {}

    @Get()
    public async getProjects() {
        return await this.projectService.findProjects();
    }

    @Get(":id")
    public async getProject(@Param('id') id: string){
        return await this.projectService.findProjectById(id);
    }

    @Post()
    public async createProject(@Body() body: ProjectDto) {
        return await this.projectService.createProject(body);
    }

    @Put(":id")
    public async updateProject(@Body() body: ProjectUpdateDto, @Param('id') id: string) {
        return await this.projectService.updateProject(body, id);
    }

    @Delete(":id")
    public async deleteProject(@Param('id') id: string) {
        return await this.projectService.deleteProject(id);
    }

}