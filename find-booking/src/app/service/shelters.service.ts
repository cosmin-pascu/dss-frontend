import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Shelter} from "../domain/Shelter";

@Injectable({
  providedIn: 'root'
})
export class SheltersService {
  private apiBaseUrl = 'http://localhost:8080/refugees-shelter/';

  constructor(private http: HttpClient) {
  }

  getAllShelters(): Observable<Array<Shelter>> {
    const url = this.apiBaseUrl + 'shelters';

    return this.http.get<Array<Shelter>>(url);
  }

  getSheltersFiltered(filtersMap: Map<string, string>): Observable<Array<Shelter>> {
    const url = this.apiBaseUrl + 'shelters/filtered' + this.generateQueryParams(filtersMap);

    return this.http.get<Array<Shelter>>(url);
  }

  getShelterById(shelterId: number): Observable<Shelter> {
    const url = this.apiBaseUrl + 'shelters/' + shelterId;

    return this.http.get<Shelter>(url)
      .pipe(
        map((response: Shelter) => {
          return Object.assign(new Shelter(), response);
        }
        ));
  }

  addShelter(shelter: Shelter): Observable<Shelter> {
    const url = this.apiBaseUrl + 'shelters';

    return this.http.post<Shelter>(url, shelter)
      .pipe(
        map((response: Shelter) => {
          return Object.assign(new Shelter(), response)
        })
      )
  }

  editShelter(shelter: Shelter): Observable<Shelter> {
    const url = this.apiBaseUrl + 'shelters/' + shelter.shelterId;

    return this.http.put<Shelter>(url, shelter)
      .pipe(
        map((response: Shelter) => {
          return Object.assign(new Shelter(), response)
        })
      )
  }

  uploadPhotoToShelter(shelterId: number, photo: Blob) {
    const url = this.apiBaseUrl + 'shelters/' + shelterId + '/upload-photo';
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
