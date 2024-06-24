import { Injectable } from "@nestjs/common";
import { ProjectsEntity } from "../entities/projects.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ProjectDto, ProjectUpdateDto } from "../dto/project.dto";
import { ErrorManager } from "../../utils/error.manager";

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(ProjectsEntity) private readonly projectReposirtory: Repository<ProjectsEntity>,
    ) {}

    public async createProject(body: ProjectDto): Promise<ProjectsEntity> {
        try {
            return await this.projectReposirtory.save(body);
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);           
        }
    }
    
    public async findProjects(): Promise<ProjectsEntity[]> {
        try {
            const projects: ProjectsEntity[] =  await this.projectReposirtory.find();
            if (!projects.length) {
                throw new ErrorManager({
                    type: "NO_CONTENT",
                    message: 'Projects not found'
                });
            }
            return projects;
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);            
        }
    }
    
    public async findProjectById(id: string): Promise<ProjectsEntity> {
        try {
            const project: ProjectsEntity = await this.projectReposirtory
                .createQueryBuilder('project')
                .leftJoinAndSelect('project.usersIncludes', 'usersIncludes')
                .leftJoinAndSelect('usersIncludes.user', 'user')
                .where({ id })
                .getOne();
            if (!project) {
                throw new ErrorManager({
                    type: "NOT_FOUND",
                    message: 'Project not found'
                });
            }
            return project;
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);           
        }
    }

    public async updateProject(body: ProjectUpdateDto, id: string): Promise<UpdateResult | undefined> {
        try {
            const project: UpdateResult = await this.projectReposirtory.update(id, body);
            if (project.affected === 0) 
                throw new ErrorManager({
                    type: "BAD_REQUEST",
                    message: 'Project not found'
                });
            return project;
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);           
        }
    }
    
    public async deleteProject(id: string): Promise<DeleteResult | undefined> {
        try {
            const project: DeleteResult = await this.projectReposirtory.delete(id);
            if (project.affected === 0) 
                throw new ErrorManager({
                    type: "BAD_REQUEST",
                    message: 'Project not found'
                });
            return project;
        } catch (e) {
            throw ErrorManager.createSignatureError(e.message);           
        }
    }
}