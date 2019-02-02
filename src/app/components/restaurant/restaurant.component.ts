import { Component, OnInit } from '@angular/core';
import {Hotel} from '../../Models/hotel.model';
import {Restaurant} from '../../Models/restaurant.model';
import {RestaurantService} from '../../Services/Restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  public ImageValue;
  public images: string[] ;
  public headings: string[] ;
  public texts: string[] ;
  stars = [1, 2, 3, 4];
  component = 'Restaurants';
  restaurant = ['/assets/images/r1.jpg', '/assets/images/r2.jpg', '/assets/images/r3.jpg'];
  recommendedRestaurants: Restaurant[];
  popularRestaurants: Restaurant[];
  latitude: any;
  longitude: any;
  constructor(private restaurantService: RestaurantService) {
    this.ImageValue = '/assets/images/Restaurants.jpg';
  }

  ngOnInit() {
    this.images = ['assets/images/eat.png', 'assets/images/review.png', 'assets/images/reserved.png'];
    this.headings = ['Find the best places to eat', 'See the latest reviews', 'Reserve a table'];
    this.texts = [' 4.3 million restaurants - everything from street food to fine dining', 'Millions of restaurant reviews and photos from our global travel community', 'Use FlyScore to compare flights, then book the one that is right for you'];

    this.restaurantService.GetRecommendedRestaurants(this.latitude, this.longitude).subscribe((restaurants: Restaurant[]) => {
      this.recommendedRestaurants = restaurants;
    });

    this.restaurantService.GetPopularRestaurants(this.latitude, this.longitude).subscribe((restaurants: Restaurant[]) => {
      this.popularRestaurants = restaurants;
    });
  }

}
