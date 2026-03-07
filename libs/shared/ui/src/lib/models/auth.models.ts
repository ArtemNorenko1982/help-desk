export enum UserRole {
  Admin = 'Admin',
  Agent = 'Agent',
  User = 'User',
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  role: UserRole;
  expiresAt: string;
}
