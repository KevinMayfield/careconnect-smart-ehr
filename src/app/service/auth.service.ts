import {EventEmitter, Injectable} from '@angular/core';


import {Router} from '@angular/router';
import {User} from "../model/user";
import {KeycloakService} from "./keycloak.service";
import {environment} from "../../environments/environment";
import {CookieService} from "ngx-cookie";
import {Oauth2Service} from "./oauth2.service";




@Injectable()
export class AuthService {
  set User(value: User) {
    this._User = value;
  }


  private semaphore : boolean = false;

  private _User :User = undefined;

  private UserEvent : EventEmitter<User> = new EventEmitter();

  private cookieEvent : EventEmitter<any> = new EventEmitter();

  public auth : boolean = false;



  constructor(
             private router: Router,
             private oauth2 : Oauth2Service,
             private _cookieService:CookieService,
             private keycloakService : KeycloakService
              ) {

    this.updateUser();

  }


  setLocalUser(User : User) {
    if (User != undefined) console.log('User set ' + User.email + ' ' + User.userName );
    this._User = User;
    this.UserEvent.emit(this._User);
  }

  getAccessToken() {
    if (this._User == undefined) {
      this.updateUser();
    } else {
      console.log("User not undefined");
    }
    return this.oauth2.getToken();
  }



  getCookieEventEmitter() {

    return this.cookieEvent;
  }
  setCookie() {
      let jwt: any = undefined;
      if (this.getCookie() !=undefined) {
        jwt = this._cookieService.get('ccri-token');
      } else {
        if (KeycloakService.auth != undefined && KeycloakService.auth.authz != undefined) {
          jwt = KeycloakService.auth.authz.token;

          this._cookieService.put('ccri-token', jwt, {
            domain: this.getCookieDomain(),
            path: '/',
            expires: new Date((new Date()).getTime() + 3 * 60000)
          });
        }
      }
      if (jwt != undefined) {
        this.cookieEvent.emit(jwt);
      } else {
        console.log('jwt not recorded')
        //this.keycloakService.logout();
      }
  }

  getCookieDomain() {

      let cookieDomain :string = 'CAT_COOKIE_DOMAIN';
      if (cookieDomain.indexOf('CAT_') != -1) cookieDomain = environment.oauth2.cookie_domain;
      return cookieDomain;

  }

    getLogonServer() {

        let loginUrl :string = 'LOGIN_URL';
        if (loginUrl.indexOf('LOGIN_') != -1) loginUrl = environment.login;
        return loginUrl;

    }

  getCookie() {

    // This should also include a check for expired cookie, return undefined if it is.
    return this._cookieService.get('ccri-token');
  }


  getUserEventEmitter() {
    return this.UserEvent;
  }

  updateUser() {


      let basicUser = new User();

      basicUser.cat_access_token = this.oauth2.getToken();

      this.setLocalUser(basicUser);
  }





}
