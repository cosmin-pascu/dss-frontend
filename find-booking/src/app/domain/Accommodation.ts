import {City} from "./City";
import {Photo} from "./Photo";

export class Accommodation {
  accommodationId?: number;
  name?: string;
  description?: string;
  phone?: string;
  numberOfBookedSlots?: number;
  totalNumberOfSlots?: number;
  photo?: Photo;
  city?: City;
  countryFlagImageSrc?: string;

  constructor() {
    this.photo = new Photo();
  }
}
