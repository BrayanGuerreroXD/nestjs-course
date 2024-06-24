import { Injectable } from "@nestjs/common";
import { ProjectsEntity } from "../entities/projects.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ProjectDto, ProjectUpdateDto } from "../dto/project.dto";

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(ProjectsEntity) private readonly projectReposirtory: Repository<ProjectsEntity>,
    ) {}

    public async createProject(body: ProjectDto): Promise<ProjectsEntity> {
        try {
            return await this.projectReposirtory.save(body);
        } catch (e) {
            throw new Error(e);            
        }
    }
    
    public async findProjects(): Promise<ProjectsEntity[]> {
        try {
            return await this.projectReposirtory.find();
        } catch (e) {
            throw new Error(e);            
        }
    }
    
    public async findProjectById(id: string): Promise<ProjectsEntity> {
        try {
            return await this.projectReposirtory
                .createQueryBuilder('Project')
                .where({ id })
                .getOne();
        } catch (e) {
            throw new Error(e);            
        }
    }

    public async updateProject(body: ProjectUpdateDto, id: string): Promise<UpdateResult | undefined> {
        try {
            const project: UpdateResult = await this.projectReposirtory.update(id, body);
            if (project.affected === 0) 
                throw new Error('Project not found');
            return project;
        } catch (e) {
            throw new Error(e);            
        }
    }
    
    public async deleteProject(id: string): Promise<DeleteResult | undefined> {
        try {
            const project: DeleteResult = await this.projectReposirtory.delete(id);
            if (project.affected === 0) 
                throw new Error('Project not found');
            return project;
        } catch (e) {
            throw new Error(e);            
        }
    }
}