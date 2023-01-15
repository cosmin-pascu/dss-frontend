import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Review} from "../domain/Review";
import { of } from 'rxjs';
import {MockService} from "./mock.service";


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiBaseUrl = 'http://localhost:8000/find-booking/';

  constructor(private http: HttpClient,
              private mockService: MockService) {
  }

  addReview(review: Review): Observable<Review> {
    const url = this.apiBaseUrl + 'reviews';

    return this.http.post<Review>(url, review)
      .pipe(
        map((response: Review) => {
          return Object.assign(new Review(), response)
        })
      )
  }

  getReviewsByAccommodationId(accommodationId: number): Observable<Array<Review>> {
    const url = this.apiBaseUrl + 'reviews/by-accommodation?accommodationId=' + accommodationId;

    // return of(this.mockService.mockReviews(5));
    return this.http.get<Array<Review>>(url);
  }

  deleteReview(reviewId: number) {
    const url = this.apiBaseUrl + 'reviews/' + reviewId;

    return this.http.delete(url);
  }
}
