export interface User {
    _id: string;
    email: string;
    username?: string;
    accessToken?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    username: string;
    password: string;
}