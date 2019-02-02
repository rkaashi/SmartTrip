import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Restaurant} from '../../Models/restaurant.model';

@Injectable()
export class RestaurantService {
  private Restaurants: Restaurant[] = [];
  private transformedRestaurants: Restaurant[] = [];

  constructor(public http: Http) { }
  GetRecommendedRestaurants(latitude, longitude) {
    return this.http.get('https://localhost:3000/app/restaurants/Lahore/5')
      .map((response: Response) => {
        const getRestaurant = response.json().obj;
        this.transformedRestaurants = [];
        console.log(getRestaurant);

        for (const restaurant of getRestaurant) {
          this.transformedRestaurants.push(new Restaurant(restaurant.Name, restaurant.Type, restaurant.Location, restaurant.Rating, restaurant.ImpThings, restaurant.Image, restaurant._id));
        }
        this.Restaurants = this.transformedRestaurants;
        return this.transformedRestaurants;
      })
      .catch((error: Response) => Observable.throw(error));
  }

  GetPopularRestaurants(latitude, longitude) {
    return this.http.get('https://localhost:3000/app/restaurants/Lahore/5/popular')
      .map((response: Response) => {
        const getRestaurant = response.json().obj;
        this.transformedRestaurants = [];
        console.log(getRestaurant);

        for (const restaurant of getRestaurant) {
          this.transformedRestaurants.push(new Restaurant(restaurant.Name, restaurant.Type, restaurant.Location, restaurant.Rating, restaurant.ImpThings, restaurant.Image, restaurant._id));
        }
        this.Restaurants = this.transformedRestaurants;
        return this.transformedRestaurants;
      })
      .catch((error: Response) => Observable.throw(error));
  }

  GetRestaurants(restaurant: Restaurant) {
    const body = JSON.stringify(restaurant);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://localhost:3000/app/restaurants', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getCoords(latitude, longitude) {
    console.log('Coords2');
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=latitude,longitude&key=AIzaSyAUUhsO9ZW-SEloNRc8lU69bOscTwnD1I4')
      .map((response: Response) => {
        console.log('Coords3');
        const location = response.json().obj;
        console.log(location);
      })
      .catch((error: Response) => Observable.throw(error));
  }

  PostRestaurants(restaurant: Restaurant) {
    const body = JSON.stringify(restaurant);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://localhost:3000/app/postRestaurants', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
