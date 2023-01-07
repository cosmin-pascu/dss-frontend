import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {Country} from "../domain/Country";
import {CountryService} from "../service/country.service";
import {City} from "../domain/City";
import {CityService} from "../service/city.service";
import {ApplyFilterService} from "../service/apply-filter.service";

@Component({
  selector: 'app-sidenav-filter',
  templateUrl: './sidenav-filter.component.html',
  styleUrls: ['./sidenav-filter.component.css']
})
export class SidenavFilterComponent implements OnInit {

  countryCtrl = new FormControl();
  cityCtrl = new FormControl();

  countries?: Country[];
  filteredCountries?: Observable<Country[]>;

  cities?: City[];
  filteredCities?: Observable<City[]>;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver,
              private countryService: CountryService,
              private cityService: CityService,
              private applyFilterService: ApplyFilterService) {}

  ngOnInit(): void {
    this.countryService.getAllCountries().subscribe(result => {
      this.countries = result;
      this.setCountryFlags();
      this.setFilteredCountries();
    })

    this.cityService.getAllCities().subscribe(result => {
      this.cities = result;
      this.setFilteredCities();
      this.setCountryFlagsForCities();
    })
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  public filterCitiesBySelectedCountry(): void {
    if (this.countryCtrl.value) {
      this.filteredCities = this.filteredCities?.pipe(
        map(cities => cities.filter(city => city.country!.name === this.countryCtrl.value))
      )
    } else {
      this.setFilteredCities()
    }
  }

  private setFilteredCountries(): void {
    this.filteredCountries = this.countryCtrl.valueChanges.pipe(
      startWith(''),
      map(country => (country ? this._filterCountries(country) : this.countries!.slice())),
    );
  }

  private _filterCountries(value: string): Country[] {
    const filterValue = value.toLowerCase();

    return this.countries!.filter(country => country.name!.toLowerCase().includes(filterValue));
  }

  private setFilteredCities(): void {
    this.filteredCities = this.cityCtrl.valueChanges.pipe(
      startWith(''),
      map(city => (city ? this._filterCities(city) : this.cities!.slice())),
    );
  }

  private _filterCities(value: string): City[] {
    const filterValue = value.toLowerCase();

    return this.cities!.filter(city => city.name!.toLowerCase().includes(filterValue));
  }

  public onApplyFilter(): void {
    this.applyFilterService.sendFilters(this.generateFiltersMap());
  }

  generateFiltersMap(): Map<string, string> {
    let filtersMap = new Map<string, string>();

    if (this.countryCtrl.value && this.validateCountry(this.countryCtrl.value)) {
      filtersMap.set('countryName', this.countryCtrl.value);
    }

    if (this.cityCtrl.value && this.validateCity(this.cityCtrl.value)) {
      filtersMap.set('cityName', this.cityCtrl.value);
    }

    return filtersMap;
  }

  validateCountry(countryName: string): boolean {
    for (let country of this.countries!) {
      if (country.name === countryName)
        return true;
    }

    return false;
  }

  validateCity(cityName: string): boolean {
    for (let city of this.cities!) {
      if (city.name === cityName)
        return true;
    }

    return false;
  }

  setCountryFlagsForCities(): void {
    this.cities?.forEach(city => {
      for (let country of this.countries!) {
        if (country.countryId === city.country?.countryId) {
          city.country = country;
          break;
        }
      }
    })
  }

  setCountryFlags(): void {
    this.countries?.forEach(country => {
      country.flag = this.matchCountryWithFlagImageSrc(country.name!);
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
