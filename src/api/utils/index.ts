import bcrypt from 'bcrypt';

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