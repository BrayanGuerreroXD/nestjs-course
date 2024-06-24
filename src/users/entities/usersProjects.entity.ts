import { Column, Entity, ManyToOne } from "typeorm";
import { ACCESS_LEVEL } from "../../constants/roles";
import { UsersEntity } from "./users.entity";
import { ProjectsEntity } from "../../projects/entities/projects.entity";
import { BaseEntity } from "../../config/base.entity";

@Entity('users_projects')
export class UsersProjectsEntity extends BaseEntity {
    @Column({ type: 'enum', enum: ACCESS_LEVEL })
    accessLevel: ACCESS_LEVEL;

    @ManyToOne( () => UsersEntity, user => user.projectsIncludes )
    user: UsersEntity;

    @ManyToOne( () => ProjectsEntity, project => project.usersIncludes )
    project: ProjectsEntity;
}