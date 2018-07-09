import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FhirService} from "../../service/fhir.service";
import {EprService} from "../../service/epr.service";
import {KeycloakService} from "../../service/keycloak.service";
import {CookieService} from "ngx-cookie";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  errorMessage : string;

  logonRedirect : string = undefined;

  subscription: any;

  jwt : any = undefined;

  constructor(
      private _cookieService: CookieService,
      private fhirService: FhirService,
      private authService: AuthService
    ) {
  }

  // https://symbiotics.co.za/integrating-keycloak-with-an-angular-4-web-application/


  ngOnInit() {

      let jwt: any = undefined;
      jwt = this._cookieService.get('ccri-token')
      if (jwt === undefined) {
          window.location.href = this.authService.getLogonServer()+'/login?afterAuth=' + document.baseURI + '/login';
      } else {
          console.log('logged in');

          this.fhirService.authoriseOAuth2();
      }



  }





}
