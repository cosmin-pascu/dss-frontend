import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AddUser} from "../domain/AddUser";
import {Observable} from "rxjs";
import {User} from "../domain/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = 'http://localhost:8080/refugees-shelter/users';

  constructor(private http: HttpClient) {
  }

  createUser(user: AddUser): Observable<any> {
    const url = this.apiBaseUrl + '/register'

    return this.http.post(url, user);
  }

  getUserByEmail(email: string): Observable<User> {
    const url = this.apiBaseUrl + '/byEmail?email=' + email;

    return this.http.get(url);
  }

}
