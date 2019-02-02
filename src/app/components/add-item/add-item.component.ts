import { Component, OnInit } from '@angular/core';
import {Hotel} from '../../Models/hotel.model';
import {DataService} from '../../Services/Data/data.service';
import {Router} from '@angular/router';
import {RestaurantService} from '../../Services/Restaurant/restaurant.service';
import {FlightService} from '../../Services/Flight/flight.service';
import {RoadService} from '../../Services/Road/road.service';
import {HotelService} from '../../Services/Hotel/hotel-service.service';
import {Restaurant} from '../../Models/restaurant.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  OptionSelected: any;
  Options = ['Hotel', 'Restaurant', 'Flight', 'Road'];
  restaurantOptions = ['Fast Food', 'Ethnic', 'Fast casual', 'Casual dining'];
  restaurantOptionSelected: any;
  flightOptions = ['Economy class', 'Buniess class', 'First class'];
  flightOptionSelected: any;
  roadOptions = ['Daewoo Express', 'Skyways'];
  roadOptionsSelected: any;
  constructor(private router: Router, private hotelService: HotelService, private dataService: DataService, private restaurantService: RestaurantService, private flightService: FlightService, private roadService: RoadService) { }

  ngOnInit() {
  }
  submitForm(form) {
    console.log(form.value);
    if (form.value.type === 'Hotel') {
      const hotel = new Hotel(
        form.value.name, form.value.location, form.value.price, form.value.rating, 200, 50, form.value.image);
      this.hotelService.PostHotels(hotel)
        .subscribe(
          data => {
            console.log(JSON.stringify(data));
            this.dataService.data_things = JSON.stringify(data);
            this.router.navigate(['/hotel']);
          },
          error => console.error(error)
        );
    } else if (form.value.type === 'Restaurant') {
      const restaurant = new Restaurant(
        form.value.name, form.value.R_type, form.value.location, form.value.price, form.value.rating, 'Car Parking', form.value.image );
      this.restaurantService.PostRestaurants(restaurant)
        .subscribe(
          data => {

            this.dataService.data_things = JSON.stringify(data);
            this.router.navigate(['/restaurant']);
          },
          error => console.error(error)
        );
    } else if (form.value.type === 'Flight') {} else if (form.value.type === 'Road') {}
  }
}
