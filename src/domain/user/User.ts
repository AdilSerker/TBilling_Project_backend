import { getSalt, generatePasswordHash } from "../../components/crypto";

export interface CreateParams {
    id?: number;
    firstName: string;
    lastName: string;
    login: string;
    password: string;
}

export interface UpdateParams {
    firstName?: string;
    lastName?: string;
    password?: string;
}

export class User {
    public id?: number;
    public firstName: string;
    public lastName: string;
    public login: string;
    public password: string;

    constructor(params: CreateParams) {
        const { id, firstName, lastName, login, password } = params;

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.login = login;
        this.password = password;
    }

    public checkPass(password: string): boolean {
		const salt = getSalt(this.password);
		const hashPassword = generatePasswordHash(password, salt);

		return this.password === hashPassword;
    }
    
    public getScheme() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            login: this.login,
            password: this.password
        } 
    }

    public updateProfile({ firstName, lastName, password }: UpdateParams) {
        this.firstName = firstName || this.firstName;
        this.lastName = lastName || this.lastName;

        this.password = password || this.password;
    }
}