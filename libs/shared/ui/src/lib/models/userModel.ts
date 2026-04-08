export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
    AGENT: 'agent',
} as const;

export interface UserModel {
    id: number;
    username: string;
    email: string;
    role: keyof typeof USER_ROLES;
    createdAt: string;
    updatedAt?: string;
}