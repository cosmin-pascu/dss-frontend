import { Component, OnInit } from '@angular/core';
import {Review} from "../domain/Review";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {AuthorizationService} from "../service/authorization.service";
import {ReviewService} from "../service/review.service";
import {ReviewDialogComponent} from "../dialog/review-dialog/review-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  accommodationId?: number;
  reviewsList: Review[] = [];

  constructor(private route: ActivatedRoute,
              public datePipe: DatePipe,
              private authorizationService: AuthorizationService,
              private reviewService: ReviewService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.accommodationId = this.route.snapshot.params['id'];

    this.reviewService.getReviewsByAccommodationId(this.accommodationId!).subscribe(result => {
      this.reviewsList = result;
    });

  }

  deleteReview(reviewId: number) {
    this.reviewService.deleteReview(reviewId).subscribe(() => this.fakeReloadPage());
  }

  fakeReloadPage() {
    const url = this.router.url;
    this.router.navigateByUrl('/').then(() => this.router.navigateByUrl(url));
  }

  isUserAdmin(): boolean {
    return this.authorizationService.isUserAdmin();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '260px',
      data: {accommodationId: this.accommodationId},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fakeReloadPage();
    });
  }
}
