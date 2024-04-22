import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import {UserService} from "../user.service";
import {LogService} from "../../log/log.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private userService: UserService,
              private logService: LogService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if(token && !this.authService.isTokenExpired(token)){
      if (request.headers.has('Include-Token')) {

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } else {
      if(this.logService.isDebugEnabled()){
        console.log("Expired token logging out")
      }
      this.userService.logout();
      this.authService.clearUserStorage();
    }
    return next.handle(request);
  }
}
