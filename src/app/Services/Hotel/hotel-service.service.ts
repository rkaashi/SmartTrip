import { Http, Response, Headers } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Hotel } from '../../Models/hotel.model';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class HotelService {
  private hotels: Hotel[] = [];
  private Stars = [];
  private transformedhotels: Hotel[] = [];

  constructor(public http: Http) { }
  GetRecommendedHotels(latitude, longitude) {
    return this.http.get('https://localhost:3000/app/hotels/Lahore/5')
      .map((response: Response) => {
        const gethotels = response.json().obj;
        this.transformedhotels = [];
        console.log(gethotels);

        for (const hotel of gethotels) {
          this.transformedhotels.push(new Hotel(hotel.Name, hotel.Location, hotel.Price, hotel.Rating,  hotel.TotalRooms, hotel.FreeRooms, hotel.Image, hotel._id));
        }
        this.hotels = this.transformedhotels;
        return this.transformedhotels;
      })
      .catch((error: Response) => Observable.throw(error));
  }

  GetPopularHotels(latitude, longitude) {
    return this.http.get('https://localhost:3000/app/hotels/Lahore/5/popular')
      .map((response: Response) => {
        const gethotels = response.json().obj;
        this.transformedhotels = [];
        console.log(gethotels);

        for (const hotel of gethotels) {
          this.transformedhotels.push(new Hotel(hotel.Name, hotel.Location, hotel.Price, hotel.Rating, hotel.TotalRooms, hotel.FreeRooms, hotel.Image, hotel._id));
        }
        this.hotels = this.transformedhotels;
        return this.transformedhotels;
      })
      .catch((error: Response) => Observable.throw(error));
  }

  GetHotels(hotel: Hotel) {
    const body = JSON.stringify(hotel);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://localhost:3000/app/hotels', body, {headers: headers})
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

  PostHotels(hotel: Hotel) {
    const body = JSON.stringify(hotel);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://localhost:3000/app/PostHotels', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
