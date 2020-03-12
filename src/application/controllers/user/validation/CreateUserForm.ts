import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateUserForm {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    login: string;

    @IsString()
    password: string;
}