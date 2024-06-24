import { IUser } from "src/interface/user.interface";
import { BaseEntity } from "../../config/base.entity";
import { Column, Entity } from "typeorm";

@Entity('users')
export class UsersEntity extends BaseEntity implements IUser {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    role: string;
}