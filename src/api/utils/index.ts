import bcrypt from 'bcrypt';
import { Pagination } from '../types';

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 12);
}

export const comparePassword = (hashedPassword: string, password: string) => {
    return bcrypt.compare(password, hashedPassword);
}

export const responseFormatter = (success?: any, error?: any) => {
    return {
        data: success,
        error: error
    }
}

export const getPagination = (pagination?: Pagination) => {
    let skip = 0;
    let take = 20;

    if (pagination.pageSize) {
        take = pagination.pageSize;
    }

    if (pagination.page) {
        skip = (pagination.page - 1) * take;
    }

    return { skip, take };
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms))