import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateUserForm {
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    password: string;
}