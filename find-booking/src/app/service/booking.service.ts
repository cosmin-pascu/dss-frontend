import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MockService} from "./mock.service";
import {Booking} from "../domain/Booking";
import {map, Observable} from "rxjs";
import { of } from 'rxjs';
import {NewBooking} from "../domain/NewBooking";


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiBaseUrl = 'http://localhost:8080/find-booking/';

  constructor(private http: HttpClient,
              private mockService: MockService) {
  }

  addBooking(booking: NewBooking): Observable<Booking> {
    const url = this.apiBaseUrl + 'bookings';

    // return of(this.mockService.mockBooking());

    return this.http.post<Booking>(url, booking)
      .pipe(
        map((response: Booking) => {
          return Object.assign(new Booking(), response)
        })
      )
  }
}
