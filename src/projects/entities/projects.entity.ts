import { BaseEntity } from "../../config/base.entity";
import { IProject } from "../../interface/project.interface";
import { UsersProjectsEntity } from "../../users/entities/usersProjects.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('projects')
export class ProjectsEntity extends BaseEntity implements IProject {
    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany( () => UsersProjectsEntity, user => user.project )
    usersIncludes: UsersProjectsEntity[];
}