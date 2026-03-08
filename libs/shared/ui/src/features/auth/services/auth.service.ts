import { API_ROUTES } from '../../../lib/constants/api.routes';

export class AuthService {
    // ... other code ...

    login(credentials) {
        return this.http.post(API_ROUTES.AUTH.BASE + '/login', credentials);
    }

    register(userDetails) {
        return this.http.post(API_ROUTES.AUTH.BASE + '/register', userDetails);
    }

    // ... other methods ...
}