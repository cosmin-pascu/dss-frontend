import {Component, OnDestroy, OnInit} from '@angular/core';
import {Accommodation} from "../../domain/Accommodation";
import {AccommodationsService} from "../../service/accommodations.service";
import {ApplyFilterService} from "../../service/apply-filter.service";
import {Subscription} from "rxjs";
import {AuthorizationService} from "../../service/authorization.service";

@Component({
  selector: 'app-accommodations-list',
  templateUrl: './accommodations-list.component.html',
  styleUrls: ['./accommodations-list.component.css']
})
export class AccommodationsListComponent implements OnInit, OnDestroy {

  accommodationsList: Accommodation[] | undefined;
  subscription?: Subscription;
  filterMap: Map<string, string> = new Map<string, string>();

  constructor(private accommodationsService: AccommodationsService,
              private applyFilterService: ApplyFilterService,
              private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.accommodationsService.getAllAccommodations().subscribe(result => {
      this.accommodationsList = result;
      this.setCountryFlags();
    });

    this.subscription = this.applyFilterService.getFilters().subscribe(map => {
      this.accommodationsService.getAccommodationsFiltered(map).subscribe(result => {
        this.accommodationsList = result;
        this.setCountryFlags();
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }

  isAccommodationAlmostFull(accommodation: Accommodation): boolean {
    return accommodation.numberOfBookedSlots! / accommodation.totalNumberOfSlots! > 0.75;
  }

  isUserAdmin(): boolean {
    return this.authorizationService.isUserAdmin();
  }

  setCountryFlags(): void {
    this.accommodationsList?.forEach(accommodation => {
      accommodation.countryFlagImageSrc = this.matchCountryWithFlagImageSrc(accommodation.city!.country!.name!);
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
