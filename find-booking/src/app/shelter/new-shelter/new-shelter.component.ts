import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Country} from "../../domain/Country";
import {map, Observable, startWith} from "rxjs";
import {City} from "../../domain/City";
import {CountryService} from "../../service/country.service";
import {CityService} from "../../service/city.service";
import {Shelter} from "../../domain/Shelter";
import {SheltersService} from "../../service/shelters.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-shelter',
  templateUrl: './new-shelter.component.html',
  styleUrls: ['./new-shelter.component.css']
})
export class NewShelterComponent implements OnInit {

  countryCtrl = new FormControl();
  cityCtrl = new FormControl();

  countries?: Country[];
  filteredCountries?: Observable<Country[]>;

  cities?: City[];
  filteredCities?: Observable<City[]>;

  shelter: Shelter = new Shelter();

  photoSelected: boolean = false;

  errorMessage?: string;

  constructor(private countryService: CountryService,
              private cityService: CityService,
              private shelterService: SheltersService,
              private router: Router
  ) { }

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

  onSelectFile($event: any) {
    if ($event != null && $event.target.files.length > 0) {
      this.shelter.photo!.photoFile = $event.target.files[0];
      this.photoSelected = true;
    }
  }

  isPhotoSelected(): boolean {
    return this.photoSelected;
  }

  onSubmit(): void {
    if (!this.setCityForShelter()) {
      this.errorMessage = 'Please select a city';
      return;
    }

    if (!this.validateFields()) {
      this.errorMessage = 'Please fill all the fields';
      return;
    }

    this.shelterService
      .addShelter(this.cloneShelterWithoutPhoto(this.shelter))
      .subscribe((savedShelter) => {
        if (this.shelter.photo?.photoFile && savedShelter.shelterId) {
          this.uploadPhoto(savedShelter.shelterId, this.shelter.photo.photoFile);
          this.redirectToHomePage();
        } else {
          this.redirectToHomePage();
        }
      })
  }

  cloneShelterWithoutPhoto(shelter: Shelter): Shelter {
    let clonedShelter = new Shelter();

    clonedShelter.name = shelter.name;
    clonedShelter.phone = shelter.phone;
    clonedShelter.description = shelter.description;
    clonedShelter.city = shelter.city;
    clonedShelter.numberOfBookedSlots = shelter.numberOfBookedSlots;
    clonedShelter.totalNumberOfSlots = shelter.totalNumberOfSlots;

    return clonedShelter;
  }

  uploadPhoto(shelterId: number, photo: Blob): void {
    this.shelterService
      .uploadPhotoToShelter(shelterId, photo)
      .subscribe(
        () => {
          this.redirectToHomePage();
        }
      )
  }

  redirectToHomePage(): void {
    this.router.navigateByUrl('home');
  }

  validateFields(): boolean {
    return this.shelter.name != null && this.shelter.phone != null && this.shelter.totalNumberOfSlots != null &&
      this.shelter.numberOfBookedSlots != null && this.shelter.description != null;
  }

  setCityForShelter(): boolean {
    if (this.cityCtrl.value) {
      for (let city of this.cities!) {
        if (city.name === this.cityCtrl.value) {
          this.shelter.city = city;
          return true;
        }
      }
    }

    return false;
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

  generateFiltersMap(): Map<string, string> {
    let filtersMap = new Map<string, string>();

    if (this.countryCtrl.value && this.validateCountry(this.countryCtrl.value)) {
      filtersMap.set('countryName', this.countryCtrl.value);
    }

    if (this.cityCtrl.value && this.validateCountry(this.cityCtrl.value)) {
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
    for (let city of this.countries!) {
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
