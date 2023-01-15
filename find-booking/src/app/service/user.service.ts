import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AddUser} from "../domain/AddUser";
import {Observable} from "rxjs";
import {User} from "../domain/User";
import {MockService} from "./mock.service";
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = 'http://localhost:8080/find-booking/users';
  private reviewsBaseUrl = 'http://localhost:8000/find-booking/users';

  constructor(private http: HttpClient,
              private mockService: MockService) {
  }

  createUser(user: AddUser): Observable<any> {
    const url = this.apiBaseUrl + '/register'

    return this.http.post(url, user);
  }

  createUserReviews(user: AddUser): Observable<any> {
    const url = this.reviewsBaseUrl + '/register'

    return this.http.post(url, user);
  }

  getUserByEmail(email: string): Observable<User> {
    const url = this.apiBaseUrl + '/byEmail?email=' + email;

    return this.http.get(url);
  }

  getAllUsers(): Observable<Array<User>> {
    const url = this.apiBaseUrl;

    // return of(this.mockService.mockUsers(5));
    return this.http.get<Array<User>>(url);
  }

  changeUserRole(user: User): Observable<any> {
    const url = this.apiBaseUrl + '/change-role'

    return this.http.put(url, user);
  }

  getLoggedInUser(): Observable<User> {
    const url = this.apiBaseUrl + '/logged-in-user'

    return this.http.get(url);
  }
}
