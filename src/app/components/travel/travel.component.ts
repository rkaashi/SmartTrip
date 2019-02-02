import { Component, OnInit } from '@angular/core';
import {enableProdMode} from '@angular/core';
import {FlightService} from '../../Services/Flight/flight.service';
import {Flight} from '../../Models/flight.model';
import {Road} from '../../Models/road.model';
import {RoadService} from '../../Services/Road/road.service';

enableProdMode();
@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  public ImageValue: string ;
  public images: string[] ;
  public headings: string[] ;
  public texts: string[] ;
  popularFlights: Flight[];
  popularRoads: Road[];
  public option = [1, 2, 3, 4];
  constructor(private flightService: FlightService, private roadService: RoadService) {
    this.ImageValue = '/assets/images/travel.png';
  }

  ngOnInit() {

    this.images = ['assets/images/discount.png', 'assets/images/review.png', 'assets/images/flyscore.png'];
    this.headings = ['The lowest Travel prices', 'See the latest reviews', 'FlyScore'];
    this.texts = ['Find the best deals from hundreds of sites with just one search', 'Millions of travel reviews and photos from our global travel community', 'Use FlyScore to compare flights, then book the one that is right for you'];

    this.flightService.GetPopularFlights(12, 13 ).subscribe((flights: Flight[]) => {
      this.popularFlights = flights;
    });

    this.roadService.GetPopularRoads(12, 13 ).subscribe((roads: Road[]) => {
      this.popularRoads = roads;
      console.log('Travel Roads:' + roads);
    });
  }
}
