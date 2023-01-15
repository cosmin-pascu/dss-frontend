import { Component, OnInit } from '@angular/core';
import {Booking} from "../domain/Booking";
import {BookingService} from "../service/booking.service";
import {NewBooking} from "../domain/NewBooking";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit {

  booking: Booking = new Booking();

  accommodationId?: number;

  constructor(private bookingService: BookingService,
              private datePipe: DatePipe,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.accommodationId = this.route.snapshot.params['id'];
  }

  onSubmit(): void {
    let newBooking = new NewBooking();

    newBooking.accommodation!.accommodationId = this.accommodationId;
    newBooking.checkInDate = this.datePipe.transform(this.booking.checkInDate, "yyyy-MM-dd")!;
    newBooking.checkOutDate = this.datePipe.transform(this.booking.checkOutDate, "yyyy-MM-dd")!;
    newBooking.rooms = this.booking.rooms;
    newBooking.numberOfPeople = this.booking.numberOfPeople;
    newBooking.otherDetails = this.booking.otherDetails;

    this.bookingService.addBooking(newBooking)
      .subscribe(() => {
        this.redirectToHomePage();
      })
  }

  redirectToHomePage(): void {
    this.router.navigateByUrl('home');
  }

}
