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

  shelter: Accommodation;
  shelterId?: number;

  errorMessage: string = "";

  constructor(private shelterService: AccommodationsService,
              private activeRoute: ActivatedRoute,
              private authorizationService: AuthorizationService,
              private router: Router) {
    this.shelter = new Accommodation();
  }

  ngOnInit(): void {
    this.shelterId = this.activeRoute.snapshot.params['id'];

    this.shelterService.getAccommodationById(this.shelterId!).subscribe(result => {
      this.shelter = result;
    })
  }

  isShelterAlmostFull(shelter: Accommodation): boolean {
    return shelter.numberOfBookedSlots! / shelter.totalNumberOfSlots! > 0.75;
  }

  isUserAdmin(): boolean {
    return this.authorizationService.isUserAdmin();
  }

  onFreeSpot(): void {
    this.shelter.numberOfBookedSlots! -= 1;
    if (this.shelter.numberOfBookedSlots! < 0) {
      this.errorMessage = "There were no left slots to free";
      return;
    }

    this.shelterService
      .editAccommodation(this.cloneShelterWithoutPhoto(this.shelter))
      .subscribe((editedShelter) => {
        this.shelter = editedShelter;
        this.fakeReloadPage();
      },
      (error) => {
        this.errorMessage = "Could not free spot. Please try again."
    })
  }

  onBookSpot(): void {
    this.shelter.numberOfBookedSlots! += 1;

    if (this.shelter.numberOfBookedSlots! > this.shelter.totalNumberOfSlots!) {
      this.errorMessage = "All the slots are already booked.";
      return;
    }

    this.shelterService
      .editAccommodation(this.cloneShelterWithoutPhoto(this.shelter))
      .subscribe((editedShelter) => {
          this.shelter = editedShelter;
          this.fakeReloadPage();
        },
        (error) => {
          this.errorMessage = "Could not book spot. Please try again."
        })
  }

  fakeReloadPage(): void {
    this.router.navigateByUrl('shelter/' + this.shelter.accommodationId);
  }

  cloneShelterWithoutPhoto(shelter: Accommodation): Accommodation {
    let clonedShelter = new Accommodation();

    clonedShelter.accommodationId = shelter.accommodationId;
    clonedShelter.name = shelter.name;
    clonedShelter.phone = shelter.phone;
    clonedShelter.description = shelter.description;
    clonedShelter.city = shelter.city;
    clonedShelter.numberOfBookedSlots = shelter.numberOfBookedSlots;
    clonedShelter.totalNumberOfSlots = shelter.totalNumberOfSlots;

    return clonedShelter;
  }

}
