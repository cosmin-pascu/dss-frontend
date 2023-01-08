import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {NewAccommodationComponent} from "./accommodation/new-accommodation/new-accommodation.component";
import {AccommodationDetailsComponent} from "./accommodation/accommodation-details/accommodation-details.component";
import {NewBookingComponent} from "./new-booking/new-booking.component";
import {ReviewsComponent} from "./reviews/reviews.component";
import {UsersManagementComponent} from "./users-management/users-management.component";

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'welcome', component: WelcomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'new-accommodation', component: NewAccommodationComponent},
  {path: 'accommodation/:id', component: AccommodationDetailsComponent},
  {path: 'new-booking/:id', component: NewBookingComponent},
  {path: 'reviews/:id', component: ReviewsComponent},
  {path: 'users-management', component: UsersManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
