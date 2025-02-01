export interface UserProfile {
    id: number;
    email: string;
}

export interface AuthResponse {
    token: string;
    type: string;
}

export interface AuthError {
    code: string;
    message: string;
}
