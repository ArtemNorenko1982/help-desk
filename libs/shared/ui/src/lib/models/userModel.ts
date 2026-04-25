export const USER_ROLES = {
    ADMIN: 'Admin',
    USER: 'User',
    GUEST: 'Guest',
    AGENT: 'Agent',
} as const;

export type UserRoleValue = typeof USER_ROLES[keyof typeof USER_ROLES];

export interface UserModel {
    id?: number;
    username: string;
    email: string;
    role: UserRoleValue;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    role: UserRoleValue;
}