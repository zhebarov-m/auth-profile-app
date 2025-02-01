import { apiService } from '../../base';
import { AuthResponse, UserProfile } from './types.ts';

export class AuthService {
    static login(email: string, password: string): Promise<AuthResponse> {
        return apiService.post<AuthResponse>('/login', { email, password });
    }

    static register(email: string, password: string): Promise<AuthResponse> {
        return apiService.post<AuthResponse>('/register', { email, password });
    }

    static getUserProfile(): Promise<UserProfile> {
        return apiService.get<UserProfile>('/profile');
    }
}
