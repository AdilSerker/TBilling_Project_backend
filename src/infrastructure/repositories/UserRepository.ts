import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import { User } from './../../domain/user/User';
import { Service } from "typedi";
import { IUserRepository, UserListQueryParams, UserQueryParams } from './../../domain/user/IUserRepository';
import { UserModel } from '../models/UserModel';
import { NotFoundError } from '../../components/http-error';

export class UserRepository implements IUserRepository {
    public async get(query: UserQueryParams): Promise<User> {
        let user;
        if (query.id) {
            user = await getRepository(UserModel).findOne(query.id);
        } else if (query.login) {
            user = await getRepository(UserModel).findOne({ login: query.login });
        } else {
            throw new NotFoundError(`user not found`);
        }

        return this.createInstance(user);
    }

    public async getList(query: UserListQueryParams) : Promise<User[]> {
        const users = await getRepository(UserModel).find();

        return users.map(this.createInstance);
    }

    public async save(user: User): Promise<User> {
        const userModel = await getRepository(UserModel).save(plainToClass(UserModel, user.getScheme()));
        
        return this.createInstance(userModel);
    }

    public async delete(id: number): Promise<void> {
        await getRepository(UserModel).delete(id);
    }

    private createInstance(user: UserModel): User {
        return new User(user);
    }
}

export const userRepository = new UserRepository();
