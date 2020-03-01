import { Injectable, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../login/models/login.Model';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { NetworkService } from '../core/network.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(
    private _router: Router,
    private http: HttpClient,
    private network: NetworkService
  ) {}

  login(user: LoginModel) {
    return this.http.post<LoginModel>(
      environment.serverUrl + 'account/login',
      user
    );
  }
  logout() {
    let LoginUser = JSON.parse(localStorage.getItem('LoginUser'));
    if (LoginUser !== null) {
      this.http
        .post<LoginModel>(environment.serverUrl + 'account/logout', LoginUser)
        .subscribe(
          success => {
            localStorage.clear();
            window.location.replace('http://localhost:85/login');
            // window.location.replace('http://localhost:4200/login');
            //  window.location.replace('http://10.230.196.38/smartwallettest/login');
            //window.location.replace('http://10.230.196.38/SmartWalletUI/login');
          },
          error => {
            localStorage.clear();
            window.location.replace('http://localhost:85/login');
            // window.location.replace('http://localhost:4200/login');
            // window.location.replace('http://10.230.196.38/smartwallettest/login');
            //window.location.replace('http://10.230.196.38/SmartWalletUI/login');

            console.log(error);
          }
        );
    }
  }

  // logoutOnClose() {
  //   let LoginUser = JSON.parse(localStorage.getItem('LoginUser'));
  //   if (LoginUser !== null) {
  //     this.http
  //       .post<LoginModel>(environment.serverUrl + 'account/logout', LoginUser)
  //       .subscribe(
  //         success => {
  //           localStorage.clear();
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //   }
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.network.online) {
      if (this.isAuthenticated()) {
        let userRole = localStorage.getItem('Role');
        if (next.data.role) {
          if (userRole == next.data.role) return true;
        }
      } else {
        this.logout();
      }
    } else {
      // momken hena na5leeha yroute 3ala page feeha no connection
    }
  }
  /**
   * this is used to clear anything that needs to be removed
   */
  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    let res = localStorage.getItem('Token') !== null && !this.isTokenExpired();

    return res;
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  isTokenExpired(): boolean {
    let token = this.decode();
    return token.exp ? false : true;
  }
  /**
   * this is used to clear local storage and also the route to login
   */

  decode() {
    return decode(localStorage.getItem('Token'));
  }
}