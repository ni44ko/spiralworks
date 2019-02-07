import { Injectable } from '@angular/core';
import { config } from 'src/app/shared/config';
import { HttpClient } from '@angular/common/http';
import { PassDataService } from './pass-data.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from 'src/app/shared/models/Login';
import { map } from 'rxjs/operators';
import { UserRegister } from 'src/app/shared/models/UserRegister';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  rootUrl: string;

  constructor(private httpClient: HttpClient, private ds: PassDataService, private alertify: AlertifyService) {
    this.rootUrl = ds.isInDevMode() ? config.ApiAuth_Dev : config.ApiAuth_Prod;
  }

  login(object: Login) {
    return this.httpClient.post(this.rootUrl + '/login', object)
      .pipe(
        map((response: any) => {
          const user = response;
          console.log('response: ' + response);
          if (user) {

            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            console.log('services token: ' + JSON.stringify(this.decodedToken));
          }
        })
      )
  }

  register(object: UserRegister) {
    return this.httpClient.post(this.rootUrl + '/register', object);
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.success('logged out');

  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
