import { IProject } from "src/interface/project.interface";
import { BaseEntity, Column, Entity } from "typeorm";

@Entity('projects')
export class ProjectsEntity extends BaseEntity implements IProject {
    @Column()
    name: string;

    @Column()
    description: string;
}