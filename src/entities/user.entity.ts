export interface User {
	id: string;
	email: string;
	username: string;
	password: string;
}

export type UserCreateData = Pick<User, 'email' | 'password'> &
	Partial<Pick<User, 'username'>>;

export type UserUpdateData = Partial<Omit<User, 'id'>>;

export type UserFindData = Partial<User>;

export type UserFindUniqueData = Pick<User, 'id'> | Pick<User, 'email'>;
