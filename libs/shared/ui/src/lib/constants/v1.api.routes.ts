export const V1_API_ROUTES = {
  AUTH: {
    BASE: '/api/v1/auth',
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
  },
  TICKETS: {
    GET_MY: '/api/v1/tickets/my',
    GET_ALL: '/api/v1/tickets',
    GET_BY_ID: (id: number) => `/api/v1/tickets/${id}`,
    CREATE: '/api/v1/tickets',
    UPDATE: (id: number) => `/api/v1/tickets/${id}`,
    DELETE: (id: number) => `/api/v1/tickets/${id}`,
  },
} as const;

export const AUTH_TOKEN_KEY = 'hd_auth_token';
