import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {NewShelterComponent} from "./shelter/new-shelter/new-shelter.component";
import {ShelterDetailsComponent} from "./shelter/shelter-details/shelter-details.component";

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'new-shelter', component: NewShelterComponent},
  {path: 'shelter/:id', component: ShelterDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
