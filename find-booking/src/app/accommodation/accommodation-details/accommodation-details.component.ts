import { Component, OnInit } from '@angular/core';
import {Accommodation} from "../../domain/Accommodation";
import {AccommodationsService} from "../../service/accommodations.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorizationService} from "../../service/authorization.service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})
export class AccommodationDetailsComponent implements OnInit {

  accommodation: Accommodation;
  accommodationId?: number;

  errorMessage: string = "";

  constructor(private accommodationsService: AccommodationsService,
              private activeRoute: ActivatedRoute,
              private authorizationService: AuthorizationService,
              private router: Router) {
    this.accommodation = new Accommodation();
  }

  ngOnInit(): void {
    this.accommodationId = this.activeRoute.snapshot.params['id'];

    this.accommodationsService.getAccommodationById(this.accommodationId!).subscribe(result => {
      this.accommodation = result;
    })
  }

  isAccommodationAlmostFull(accommodation: Accommodation): boolean {
    return accommodation.numberOfBookedSlots! / accommodation.totalNumberOfSlots! > 0.75;
  }

  isUserAdmin(): boolean {
    return this.authorizationService.isUserAdmin();
  }

  onFreeSpot(): void {
    this.accommodation.numberOfBookedSlots! -= 1;
    if (this.accommodation.numberOfBookedSlots! < 0) {
      this.errorMessage = "There were no left slots to free";
      return;
    }

    this.accommodationsService
      .editAccommodation(this.cloneAccommodationWithoutPhoto(this.accommodation))
      .subscribe((editedAccommodation) => {
        this.accommodation = editedAccommodation;
        this.fakeReloadPage();
      },
      (error) => {
        this.errorMessage = "Could not free spot. Please try again."
    })
  }

  onBookSpot(): void {
    this.accommodation.numberOfBookedSlots! += 1;

    if (this.accommodation.numberOfBookedSlots! > this.accommodation.totalNumberOfSlots!) {
      this.errorMessage = "All the slots are already booked.";
      return;
    }

    this.accommodationsService
      .editAccommodation(this.cloneAccommodationWithoutPhoto(this.accommodation))
      .subscribe((editedAccommodation) => {
          this.accommodation = editedAccommodation;
          this.fakeReloadPage();
        },
        (error) => {
          this.errorMessage = "Could not new-booking spot. Please try again."
        })
  }

  fakeReloadPage(): void {
    this.router.navigateByUrl('accommodation/' + this.accommodation.accommodationId);
  }

  cloneAccommodationWithoutPhoto(accommodation: Accommodation): Accommodation {
    let clonedAccommodation = new Accommodation();

    clonedAccommodation.accommodationId = accommodation.accommodationId;
    clonedAccommodation.name = accommodation.name;
    clonedAccommodation.phone = accommodation.phone;
    clonedAccommodation.description = accommodation.description;
    clonedAccommodation.city = accommodation.city;
    clonedAccommodation.numberOfBookedSlots = accommodation.numberOfBookedSlots;
    clonedAccommodation.totalNumberOfSlots = accommodation.totalNumberOfSlots;

    return clonedAccommodation;
  }

}
