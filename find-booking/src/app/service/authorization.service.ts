import {Injectable, OnInit} from "@angular/core";
import {UserService} from "./user.service";
import {RoleType} from "../domain/RoleType";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private userService: UserService) {}

    ngOnInit(): void {}

    setUserRole(loggedInUserEmail: string): void {
      this.userService.getUserByEmail(loggedInUserEmail).subscribe(user => {
        localStorage.setItem('user_role', user.roleType!)
      })
    }

    isUserAdmin(): boolean {
    const userRole = localStorage.getItem('user_role');
    // return true;

    return userRole != null && userRole === RoleType.ADMIN;
    }

}
