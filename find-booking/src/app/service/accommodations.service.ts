import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Accommodation} from "../domain/Accommodation";

@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {
  private apiBaseUrl = 'http://localhost:8080/refugees-shelter/';

  constructor(private http: HttpClient) {
  }

  getAllAccommodations(): Observable<Array<Accommodation>> {
    const url = this.apiBaseUrl + 'accommodations';

    return this.http.get<Array<Accommodation>>(url);
  }

  getAccommodationsFiltered(filtersMap: Map<string, string>): Observable<Array<Accommodation>> {
    const url = this.apiBaseUrl + 'accommodations/filtered' + this.generateQueryParams(filtersMap);

    return this.http.get<Array<Accommodation>>(url);
  }

  getAccommodationById(accommodationId: number): Observable<Accommodation> {
    const url = this.apiBaseUrl + 'accommodations/' + accommodationId;

    return this.http.get<Accommodation>(url)
      .pipe(
        map((response: Accommodation) => {
          return Object.assign(new Accommodation(), response);
        }
        ));
  }

  addAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    const url = this.apiBaseUrl + 'accommodations';

    return this.http.post<Accommodation>(url, accommodation)
      .pipe(
        map((response: Accommodation) => {
          return Object.assign(new Accommodation(), response)
        })
      )
  }

  editAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    const url = this.apiBaseUrl + 'accommodations/' + accommodation.accommodationId;

    return this.http.put<Accommodation>(url, accommodation)
      .pipe(
        map((response: Accommodation) => {
          return Object.assign(new Accommodation(), response)
        })
      )
  }

  uploadPhotoToAccommodation(accommodationId: number, photo: Blob) {
    const url = this.apiBaseUrl + 'accommodations/' + accommodationId + '/upload-photo';
    let formData = new FormData();

    if (photo) {
      formData.append('photo', photo);
    }

    return this.http.post(url, formData);
  }

  generateQueryParams(filtersMap: Map<string, string>): string {
    let queryParams = '';
    const iterator = filtersMap[Symbol.iterator]();

    if (filtersMap.size != 0) {
      queryParams += '?';

      for (const item of iterator) {
        queryParams += item[0] + '=' + item[1] + '&';
      }

      queryParams = queryParams.slice(0, -1);
    }

    return queryParams;
  }
}
