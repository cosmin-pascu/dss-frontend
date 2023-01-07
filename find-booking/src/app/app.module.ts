import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialModule} from "./angular-material.module";
import {AppRoutingModule} from './app-routing.module';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HomePageComponent} from "./home-page/home-page.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {SidenavFilterComponent} from "./sidenav-filter/sidenav-filter.component";
import {SheltersListComponent} from "./shelter/shelters-list/shelters-list.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {NewShelterComponent} from "./shelter/new-shelter/new-shelter.component";
import {ShelterDetailsComponent} from "./shelter/shelter-details/shelter-details.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    WelcomePageComponent,
    HomePageComponent,
    SidenavFilterComponent,
    SheltersListComponent,
    NewShelterComponent,
    ShelterDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
