export interface UserAttributes {
	id: number;
	login: string;
	password?: string;
    firstName: string;
    lastName: string;
}

export type WorkType = {
    id: number;
    name: string;
}