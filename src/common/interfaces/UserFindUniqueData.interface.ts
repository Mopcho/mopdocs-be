import { UserEntity } from 'src/entities';

export type UserFindUniqueData = Partial<Pick<UserEntity, 'email' | 'id'>>;
