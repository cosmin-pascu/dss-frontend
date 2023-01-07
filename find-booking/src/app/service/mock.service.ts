import {Injectable} from "@angular/core";
import {Accommodation} from "../domain/Accommodation";
import {City} from "../domain/City";
import {Country} from "../domain/Country";
import {Booking} from "../domain/Booking";

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
}
