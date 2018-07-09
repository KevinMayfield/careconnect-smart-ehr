import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {KeycloakService} from "../../service/keycloak.service";
import {environment} from "../../../environments/environment";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {



  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(
  ) {
    localStorage.removeItem('access_token');

    window.location.href = this.authService.getLogonServer()+'logout??afterAuth=' + document.baseURI + '/login';
  }

}
