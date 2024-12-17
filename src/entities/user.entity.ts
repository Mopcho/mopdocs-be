export interface UserEntity {
	id: string;
	email: string;
	username?: string;
	password: string;
	createdAt: string;
	updatedAt: string;
}

export type UserCreateData = Pick<UserEntity, 'email' | 'password'> &
	Partial<Pick<UserEntity, 'id' | 'username'>>;

export type UserUpdateData = Partial<
	Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>
>;

export type UserFindData = Partial<UserEntity>;

export type UserFindUniqueData =
	| Pick<UserEntity, 'id'>
	| Pick<UserEntity, 'email'>;
