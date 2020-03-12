import { UserListQueryParams } from '../../../domain/user/IUserRepository';
import { User } from '../../../domain/user/User';
import { JsonController, Get, Param, QueryParams, Post, Body, Put, OnUndefined, NotFoundError, Delete } from "routing-controllers";
import { IUserRepository } from '../../../domain/user/IUserRepository';
import { CreateUserForm } from './validation/CreateUserForm';
import { generatePasswordHash } from '../../../components/crypto';
import { userRepository } from '../../../infrastructure/repositories/UserRepository';
import { UpdateUserForm } from './validation/UpdateUserForm ';

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

    @Put('/:id')
    @OnUndefined(204)
    public async updateUser(
        @Param('id') id: number,
        @Body() form: UpdateUserForm
    ): Promise<void> {
        const user = await this.userRepository.get({ id });
        
        if (!user) {
            throw new NotFoundError('User with id ' + id + ' not found');
        }

        const { firstName, lastName, password } = form;
        const hashPassword = generatePasswordHash(password);

        user.updateProfile({
            firstName,
            lastName,
            password: hashPassword
        });

        await this.userRepository.save(user);
    }

    @Delete('/:id')
    @OnUndefined(204)
    public async deleteUser(@Param('id') id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}