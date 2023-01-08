import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {AuthorizationService} from "../service/authorization.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    if (!this.isUserLoggedIn()) {
      this.redirectToLogin();
    }
  }

  logout(): void {
    this.authService.logout();
    this.redirectToLogin();
  }

  redirectToLogin(): void {
    const url = 'login';
    this.router.navigateByUrl(url);
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isUserAdmin(): boolean {
    return this.authorizationService.isUserAdmin();
  }

}
