import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {RegisterRequest} from "../../entity/user/request/register-request";
import {AuthResponse} from "../../entity/user/response/auth-response";
import {AuthRequest} from "../../entity/user/request/auth-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(registerRequest: RegisterRequest): Observable<AuthResponse> {
    let url = environment.apiUrl + `/app/user/register`;
    return this.httpClient.post<AuthResponse>(url, registerRequest);
  }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    let url = environment.apiUrl + `/app/user/auth`;
    return this.httpClient.post<AuthResponse>(url, authRequest);
  }

  logout(): Observable<any> {
    console.log("LOGGED OUT")
    let url = environment.apiUrl + `/app/user/auth/logout`;
    return this.httpClient.post<AuthResponse>(url, { headers: new HttpHeaders().set('Include-Token', 'true') });
  }
}
