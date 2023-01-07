import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {City} from "../domain/City";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiBaseUrl = 'http://localhost:8080/refugees-shelter/';

  constructor(private http: HttpClient) {
  }

  getAllCities(): Observable<Array<City>> {
    const url = this.apiBaseUrl + 'cities';

    return this.http.get<Array<City>>(url);
  }
}
