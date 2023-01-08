import {User} from "./User";
import {Accommodation} from "./Accommodation";

export class Review {
  reviewId?: number;
  stars?: number;
  comment?: string;
  user?: User;
  accommodationId?: number;
  timestamp?: string;
  accommodation?: Accommodation;

  constructor() {
    this.user = new User();
    this.accommodation = new Accommodation();
  }
}
