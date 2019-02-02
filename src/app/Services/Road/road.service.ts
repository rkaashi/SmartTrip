import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Road } from '../../Models/road.model';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RoadService {

  private roads: Road[] = [];
  private transformedRoads: Road[] = [];
  constructor(public http: Http) { }

  GetPopularRoads(latitude, longitude) {
    return this.http.get('https://localhost:3000/app/roads/Lahore')
      .map((response: Response) => {
        const getRoads = response.json().obj;
        this.transformedRoads = [];
        console.log('flights' + getRoads);

        for (const road of getRoads) {
          this.transformedRoads.push(new Road(road.Source, road.Destination, road.Company, road.Date, road.Time, road.Name, road.Price, road.TotalSeats, road.AvailableSeats, road.Image, road._id));
        }
        this.roads = this.transformedRoads;
        return this.transformedRoads;
      })
      .catch((error: Response) => Observable.throw(error));
  }

  GetRoads(road: Road) {
    const body = JSON.stringify(road);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://localhost:3000/app/roads', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
