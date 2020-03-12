import { UserListQueryParams } from '../../../domain/user/IUserRepository';
import { User } from '../../../domain/user/User';
import { JsonController, Get, Param, QueryParams, Post, Body } from "routing-controllers";
import { IUserRepository } from '../../../domain/user/IUserRepository';
import { CreateUserForm } from './validation/CreateUserForm';
import { generatePasswordHash } from '../../../components/crypto';
import { userRepository } from '../../../infrastructure/repositories/UserRepository';

@JsonController('/api/user')
export class UserController {
    private userRepository: IUserRepository = userRepository;

    @Get('/:id')
    public async getUser(@Param('id') id: number): Promise<User> {
        return this.userRepository.get({ id });
    }
    
    @Get('/')
    public async getUserList(@QueryParams() params: UserListQueryParams) : Promise<User[]> {
        return this.userRepository.getList(params);
    }

    @Post('/')
    public async createUser(@Body() form: CreateUserForm): Promise<User> {
        const { password, ...data } = form;
		const hashPassword = generatePasswordHash(password);
        const user = new User({ ...data, password: hashPassword });
        return this.userRepository.save(user);
    }
    




}