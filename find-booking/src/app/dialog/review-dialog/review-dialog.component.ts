import {Component, Inject, OnInit} from '@angular/core';
import {Review} from "../../domain/Review";
import {Rating} from "../../domain/Rating";
import {ReviewService} from "../../service/review.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Accommodation} from "../../domain/Accommodation";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit {

  review: Review = new Review();

  rating: Rating = new Rating(1, 5, false, false, false);

  accommodationId?: number;

  constructor(private reviewService: ReviewService,
              private activeRoute: ActivatedRoute,
              private userService: UserService,
              public dialogRef: MatDialogRef<ReviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Accommodation) { }

  ngOnInit(): void {
    this.accommodationId = this.activeRoute.snapshot.params['id'];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addComment(): void {
    this.prepareReviewFormat();

    this.userService.getLoggedInUser().subscribe(user => {
      this.review.user = user;
      this.reviewService.addReview(this.review).subscribe(result => {
        this.dialogRef.close();
      })
    });
  }

  prepareReviewFormat() {
    this.review.accommodation!.accommodationId = this.data.accommodationId;
    this.review.stars = this.rating.value;
  }

}
