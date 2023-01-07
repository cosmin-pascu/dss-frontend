import {Component, OnInit} from '@angular/core';
import {User} from "../domain/User";
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {AddUser} from "../domain/AddUser";
import {RoleType} from "../domain/RoleType";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  errorMessage?: string;

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.initFirebase();
  }

  registerUser(): void {
    if (!this.validateFields())
      return;

    this.authService
      .createUser(this.user.email!, this.user.password!)
      .then((result) => {
        this.handleRegisterSuccess();
      })
      .catch((error) => {
        this.handleRegisterError();
      })
  }

  handleRegisterSuccess(): void {
    this.userService.createUser(this.generateGuestUser(this.user)).subscribe(() => {});
    this.redirectToLoginPage();
  }

  handleRegisterError(): void {
    this.errorMessage = "Please try a stronger password or another email."
  }

  generateGuestUser(user: User): AddUser {
    let addUser = new AddUser();

    addUser.firstName = user.firsName;
    addUser.lastName = user.lastName;
    addUser.email = user.email;
    addUser.roleType = RoleType.GUEST;

    return addUser;
  }

  validateFields(): boolean {
    return this.validateField(this.user.email) && this.validateField(this.user.password) &&
      this.validateField(this.user.firsName) && this.validateField(this.user.lastName);
  }

  validateField(field?: string): boolean {
    return field != null && field.length > 0;
  }

  redirectToLoginPage(): void {
    this.router.navigateByUrl('login');
  }

}
