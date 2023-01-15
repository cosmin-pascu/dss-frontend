import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../domain/User";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../service/user.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {AuthorizationService} from "../service/authorization.service";
import {Router} from "@angular/router";
import {MatSort, Sort} from "@angular/material/sort";
import {RoleType} from "../domain/RoleType";

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {

  usersList: User[] = [];

  displayedColumnsUsers: string[] = ['userId', 'firstName', 'lastName', 'email', 'roleType', 'action'];
  dataSourceUsers: MatTableDataSource<User> = new MatTableDataSource();

  constructor(private userService: UserService,
              private _liveAnnouncer: LiveAnnouncer,
              private authorizationService: AuthorizationService,
              private router: Router) { }

  @ViewChild(MatSort) sortUsers: MatSort = new MatSort();

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(result => {
      this.usersList = result;
      this.dataSourceUsers = new MatTableDataSource(this.usersList);
    })
  }

  ngAfterViewInit() {
    this.dataSourceUsers!.sort = this.sortUsers;
  }

  announceUsersSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  isUserAdmin(): boolean {
    return this.authorizationService.isUserAdmin();
  }

  makeAdmin(row: any, event: any) {
    this.changeUserRole(row.email, RoleType.ADMIN);
  }

  makeUser(row: any, event: any) {
    this.changeUserRole(row.email, RoleType.USER);
  }

  changeUserRole(email: string, role: RoleType) {
    let user = new User();
    user.email = email;
    user.roleType = role;

    this.userService.changeUserRole(user).subscribe(result => {
      this.fakeReloadPage();
    })
  }

  fakeReloadPage() {
    const url = this.router.url;
    this.router.navigateByUrl('/').then(() => this.router.navigateByUrl(url));
  }

}
