import {Accommodation} from "./Accommodation";

export class NewBooking {
  accommodation?: Accommodation;
  checkInDate?: string;
  checkOutDate?: string;
  rooms?: number;
  numberOfPeople?: number;
  otherDetails?: string;


  constructor() {
    this.accommodation = new Accommodation();
  }
}


