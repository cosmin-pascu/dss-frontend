import {Component, OnDestroy, OnInit} from '@angular/core';
import {Shelter} from "../../domain/Shelter";
import {SheltersService} from "../../service/shelters.service";
import {ApplyFilterService} from "../../service/apply-filter.service";
import {Subscription} from "rxjs";
import {AuthorizationService} from "../../service/authorization.service";

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css']
})
export class BookingsListComponent implements OnInit, OnDestroy {

  sheltersList: Shelter[] | undefined;
  subscription?: Subscription;
  filterMap: Map<string, string> = new Map<string, string>();

  constructor(private sheltersService: SheltersService,
              private applyFilterService: ApplyFilterService,
              private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.sheltersService.getAllShelters().subscribe(result => {
      this.sheltersList = result;
      this.setCountryFlags();
    });

    this.subscription = this.applyFilterService.getFilters().subscribe(map => {
      this.sheltersService.getSheltersFiltered(map).subscribe(result => {
        this.sheltersList = result;
        this.setCountryFlags();
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }

  isShelterAlmostFull(shelter: Shelter): boolean {
    return shelter.numberOfBookedSlots! / shelter.totalNumberOfSlots! > 0.75;
  }

  isUserAdmin(): boolean {
    // return this.authorizationService.isUserAdmin();
    return true;
  }

  setCountryFlags(): void {
    this.sheltersList?.forEach(shelter => {
      shelter.countryFlagImageSrc = this.matchCountryWithFlagImageSrc(shelter.city!.country!.name!);
    })
  }

  matchCountryWithFlagImageSrc(country: string): string {
    switch (country) {
      case "Andorra":
        return '../../assets/images/andorra_flag_round.png';
      case "Austria":
        return '../../assets/images/austria_flag_round.png';
      case "Canada":
        return '../../assets/images/canada_flag_round.jpg';
      case "France":
        return '../../assets/images/france_flag_round.jpg';
      case "Italy":
        return '../../assets/images/italy_flag_round.png';
      case "Romania":
        return '../../assets/images/romania_flag_round.jpg';
      case "Switzerland":
        return '../../assets/images/switzerland_flag_round.png';
      case "USA":
        return '../../assets/images/usa_flag_round.png';

      default:
        return '../../assets/images/question_mark_round.png';
    }
  }
}
