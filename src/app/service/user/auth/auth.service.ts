import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {LogService} from "../../log/log.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly tokenKey = 'authToken';
  private readonly userEmailKey = 'userEmail';
  private readonly userIdKey = 'userId';
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private logService: LogService) { }

  setUserStorage(token: string, userId: string, userEmail: string): void {
    if(this.logService.isDebugEnabled()){
      console.log("[setUserStorage] TOKEN: " + token + " userEmail: " + userEmail + " userId: " + userId)
    }
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userEmailKey, userEmail);
    localStorage.setItem(this.userIdKey, userId);
  }

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    if(this.logService.isDebugEnabled()){
      console.log("[getToken] " + this.tokenKey);
    }
    return localStorage.getItem(this.tokenKey);
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.userEmailKey);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userIdKey);
  }

  isLoggedIn(): boolean{
    if(this.logService.isDebugEnabled()){
      console.log(this.getToken());
    }
    return this.getToken() != null;
  }

  clearUserStorage(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userEmailKey);
    localStorage.removeItem(this.userIdKey);
  }
}
