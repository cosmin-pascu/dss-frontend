import { Component, OnInit } from '@angular/core';
import {Shelter} from "../../domain/Shelter";
import {SheltersService} from "../../service/shelters.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorizationService} from "../../service/authorization.service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-shelter-details',
  templateUrl: './shelter-details.component.html',
  styleUrls: ['./shelter-details.component.css']
})
export class ShelterDetailsComponent implements OnInit {

  shelter: Shelter;
  shelterId?: number;

  errorMessage: string = "";

  constructor(private shelterService: SheltersService,
              private activeRoute: ActivatedRoute,
              private authorizationService: AuthorizationService,
              private router: Router) {
    this.shelter = new Shelter();
  }

  ngOnInit(): void {
    this.shelterId = this.activeRoute.snapshot.params['id'];

    this.shelterService.getShelterById(this.shelterId!).subscribe(result => {
      this.shelter = result;
    })
  }

  isShelterAlmostFull(shelter: Shelter): boolean {
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
      .editShelter(this.cloneShelterWithoutPhoto(this.shelter))
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
      .editShelter(this.cloneShelterWithoutPhoto(this.shelter))
      .subscribe((editedShelter) => {
          this.shelter = editedShelter;
          this.fakeReloadPage();
        },
        (error) => {
          this.errorMessage = "Could not book spot. Please try again."
        })
  }

  fakeReloadPage(): void {
    this.router.navigateByUrl('shelter/' + this.shelter.shelterId);
  }

  cloneShelterWithoutPhoto(shelter: Shelter): Shelter {
    let clonedShelter = new Shelter();

    clonedShelter.shelterId = shelter.shelterId;
    clonedShelter.name = shelter.name;
    clonedShelter.phone = shelter.phone;
    clonedShelter.description = shelter.description;
    clonedShelter.city = shelter.city;
    clonedShelter.numberOfBookedSlots = shelter.numberOfBookedSlots;
    clonedShelter.totalNumberOfSlots = shelter.totalNumberOfSlots;

    return clonedShelter;
  }

}
