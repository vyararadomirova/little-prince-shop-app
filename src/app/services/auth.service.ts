import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, LoginData, RegisterData } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3030/users';
    private userSubject = new BehaviorSubject<User | null>(null);
    public user$ = this.userSubject.asObservable();

    constructor(private http: HttpClient) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.userSubject.next(JSON.parse(storedUser));
        }
    }

    login(data: LoginData): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/login`, data)
            .pipe(tap(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
            }));
    }

    register(data: RegisterData): Observable<User> {
        return this.http.post<User>(`${this.apiUrl}/register`, data)
            .pipe(tap(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
            }));
    }

    logout(): void {
        localStorage.removeItem('user');
        this.userSubject.next(null);
    }

    get isLoggedIn(): boolean {
        return this.userSubject.value !== null;
    }

    get currentUser(): User | null {
        return this.userSubject.value;
    }
}