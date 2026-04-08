export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
    AGENT: 'agent',
} as const;

export interface UserModel {
    readonly id: number;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt?: string;
}

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface UpdateUserDto {
    username?: string;
    email?: string;
    role?: string;
}