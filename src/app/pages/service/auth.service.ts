import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Inscription complète
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  // Login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  // Stocker le token
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Récupérer le token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Déconnexion
  logout(): void {
    localStorage.removeItem('authToken');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));  
      const expirationDate = payload.exp * 1000;  
      return expirationDate < Date.now();  
    } catch (error) {
      return true; 
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1])); 
        return payload.role;
      }
    }
    return null;
  }  

  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1])); 
        return payload.name;
      }
    }
    return null;
  }  

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        return payload.id;
      }
    }
    return null;
  }
}