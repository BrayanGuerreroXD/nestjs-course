import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProjectDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}

export class ProjectUpdateDto {

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

}