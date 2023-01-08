import {Injectable} from "@angular/core";
import {Accommodation} from "../domain/Accommodation";
import {City} from "../domain/City";
import {Country} from "../domain/Country";
import {Booking} from "../domain/Booking";
import {Review} from "../domain/Review";
import {User} from "../domain/User";
import {RoleType} from "../domain/RoleType";

@Injectable({
  providedIn: 'root'
})
export class MockService {

  mockAccommodations(n: number): Array<Accommodation> {
    let accommodations = [this.mockAccommodation(0)];

    for (let i = 1; i < n; i++) {
      accommodations.push(this.mockAccommodation(i));
    }

    return accommodations;
  }

  mockAccommodation(x: number): Accommodation {
    let accommodation = new Accommodation();

    accommodation.accommodationId = x;
    accommodation.name = 'mocked';
    accommodation.description = 'someDescription';
    accommodation.phone = '0712345464';
    accommodation.numberOfBookedSlots = 3;
    accommodation.totalNumberOfSlots = 100;
    accommodation.photo = undefined;
    accommodation.city = this.mockCity(x);
    accommodation.countryFlagImageSrc = undefined;
    accommodation.address = 'Street Marcana, Nr. 23'

    return accommodation;
  }

  mockCity(x: number): City {
    let city = new City();
    city.cityId = x;
    city.name = 'Bucharest';
    city.country = this.mockCountry(x);

    return city;
  }

  mockCountry(x: number): Country {
    let country = new Country();
    country.countryId = x;
    country.name = 'Romania';

    return country;
  }

  mockBooking(): Booking {
    let booking = new Booking();
    booking.bookingId = 1;

    return booking;
  }

  mockReviews(n: number): Array<Review> {
    let reviews = [];

    for (let i = 0; i < n; i++) {
      reviews.push(this.mockReview(i));
    }

    return reviews;
  }

  private mockReview(x: number): Review {
    let review = new Review();

    review.reviewId = x;
    review.user = this.mockUser(x);
    review.accommodationId = 0;
    review.stars = x;
    review.comment = this.generateComment(x);
    review.timestamp = '13-02-1989';

    return review;
  }

  private generateComment(x: number): string {
    let comment = 'a';

    for (let i = 0; i < 4 * x; i++) {
      comment += 'b';
    }

    return comment;
  }

  mockUsers(n: number): Array<User> {
    let users = [];

    for (let i = 0; i < n; i ++) {
      users.push(this.mockUser(i))
    }

    return users;
  }

  mockUser(x: number): User {
    let user = new User();

    user.userId = 1;
    user.email = 'someEmail@email.com';
    if (x % 2 == 0) {
      user.roleType = RoleType.ADMIN;
    } else {
      user.roleType = RoleType.GUEST;
    }
    user.firsName = 'Raul';
    user.lastName = 'Gonzalez';

    return user;
  }
}
