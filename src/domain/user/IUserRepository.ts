import { Token } from 'typedi';
import { User } from "./User";

export interface UserQueryParams {
    id?: number;
    login?: string;
}

export interface UserListQueryParams {

}

export interface IUserRepository {
    get(query: UserQueryParams): Promise<User>;
    getList(query: UserListQueryParams): Promise<User[]>;
    save(user: User): Promise<User>;
    delete(id: number): Promise<void>;
}
