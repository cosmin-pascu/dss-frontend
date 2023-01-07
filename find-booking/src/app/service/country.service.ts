import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country} from "../domain/Country";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiBaseUrl = 'http://localhost:8080/refugees-shelter/';

  constructor(private http: HttpClient) {
  }

  getAllCountries(): Observable<Array<Country>> {
    const url = this.apiBaseUrl + 'countries';

    return this.http.get<Array<Country>>(url);
  }
}
