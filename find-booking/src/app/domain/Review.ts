import {User} from "./User";

export class Review {
  reviewId?: number;
  stars?: number;
  comment?: string;
  user?: User;
  accommodationId?: number;
  timestamp?: string;

  constructor() {
    this.user = new User();
  }
}
