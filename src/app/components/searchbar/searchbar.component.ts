import { AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {SearchWidget} from '../SearchWidget';
import { Hotel } from '../../Models/hotel.model';
import {Restaurant} from '../../Models/restaurant.model';
import { Flight } from '../../Models/flight.model';
import { Road } from '../../Models/road.model';
import {Router} from '@angular/router';
import {HotelService} from '../../Services/Hotel/hotel-service.service';
import {DataService} from '../../Services/Data/data.service';
import {RestaurantService} from '../../Services/Restaurant/restaurant.service';
import {FlightService} from '../../Services/Flight/flight.service';
import {RoadService} from '../../Services/Road/road.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit, OnChanges,  AfterViewInit  {
  @Input() Image: string;
  public searchWidget = new SearchWidget();
  public imageUrl;
  public isHotel ;
  public isRestaurant ;
  public isTravel ;
  public isthingsToDo;
  public Listname;
  options = ['Daewoo Express', 'Skyways'];
  Restaurantoptions = ['Fast Food', 'Ethnic', 'Fast casual', 'Casual dining'];
  Seatsoptions = [1, 2, 3, 4, 5];
  tCompanyOptionSelected: any;
  rest_OptionSelected: any;
  RoadSeatsOptionSelected: any;
  adultOptionSelected: any;
  childOptionSelected: any;
  public No_of_Rooms = 0;
  public mySet = new Set();
  public  dt: any;
  constructor(private router: Router, private hotelService: HotelService, private dataService: DataService, private restaurantService: RestaurantService, private flightService: FlightService, private roadService: RoadService) {
    this.No_of_Rooms = 0;
  }
  ngAfterViewInit() {

    const HTML = '<datalist id=\'browsers\'' + '>' + '</datalist>';

    document.getElementById('myForm_1').insertAdjacentHTML( 'beforeend', HTML );
  }

  ngOnInit() {
    this.Listname = 'browsers';
  }
  submitHotels(f) {
    console.log('Print');
    console.log(f.value.hotelname);
    console.log(f.value);
    if (f.value.hotelname) {
      const hotel = new Hotel(
        f.value.hotelname, f.value.hotelname );
      this.hotelService.GetHotels(hotel)
        .subscribe(
          data => {
            console.log(JSON.stringify(data));
            this.dataService.data_things = JSON.stringify(data);
            this.router.navigate(['/ShowDeals', 'hotel']);
          },
          error => console.error(error)
        );
    }
  }
  submitRestaurants(f) {
    console.log('Print');
    console.log(f.value);
    if (f.value.restaurantName) {
        const restaurant = new Restaurant(
          f.value.restaurantName, f.value.type, f.value.restaurantName );
        this.restaurantService.GetRestaurants(restaurant)
          .subscribe(
            data => {

              this.dataService.data_things = JSON.stringify(data);
              this.router.navigate(['/ShowDeals', 'Restaurant']);
            },
            error => console.error(error)
          );
      }
  }
  submitFlights(f) {
    console.log('Print Flights');
    console.log(f.value);
    if (f.value.depart) {
      const flight1 = new Flight ( f.value.depart, f.value.arrival, f.value.DepartClass, f.value.DepartDate);
      if (f.value.Round_radio) {
        const flight2 = new Flight ( f.value.arrival, f.value.depart, f.value.ArrivalClass, f.value.arrivalDate);
        this.flightService.GetFlights(flight2)
          .subscribe(
            data => {
              this.dataService.data_things = JSON.stringify(data);
            },
            error => console.error(error)
          );
      }
      this.flightService.GetFlights(flight1)
        .subscribe(
          data => {
            this.dataService.data_things += JSON.stringify(data);
            this.router.navigate(['/ShowDeals', 'flight']);
          },
          error => console.error(error)
        );
    }
  }
  submitRoads(f) {
    console.log('Print Roads');
    console.log(f.value);
    if (f.value.sourceCity) {
      const road = new Road ( f.value.sourceCity, f.value.destinationCity, f.value.travelCompany, f.value.DeptDate, f.value.DeptTime);

      this.roadService.GetRoads(road)
        .subscribe(
          data => {

            this.dataService.data_things = JSON.stringify(data);
            this.router.navigate(['/ShowDeals', 'Road']);
          },
          error => console.error(error)
        );
    }
  }
  ngOnChanges() {
    this.imageUrl = this.Image;
    console.log(this.imageUrl);
    if ( this.imageUrl.includes('Hotels') ) {
      console.log('True');
      this.isHotel = true;
    } else if ( this.imageUrl.includes('Restaurants') ) {
      this.isRestaurant = true;
    } else if ( this.imageUrl.includes('travel') ) {
      this.isTravel = true;
    } else if ( this.imageUrl.includes('things') ) {
      this.isthingsToDo = true;
    } else {
      this.isHotel = false;
      this.isRestaurant = false;
      this.isTravel = false;
      this.isthingsToDo = false;
    }
  }
  onKey(event: any) { // without type info
    document.getElementById('browsers').innerHTML = '';
    console.log('Value is:' + event.target.value);

    const html = this.searchWidget.render(event.target.value);
    if ( html !== undefined) {
      document.getElementById('browsers').insertAdjacentHTML( 'beforeend', html.toString() );
    }
    this.searchWidget.clearSet();
  }
  ModeifyPicker(num) {
    this.No_of_Rooms = this.No_of_Rooms + num ;
    if ( this.No_of_Rooms < 0 ) {
      this.No_of_Rooms = 0;
    }
  }

  onOptionsSelected(event) {
    console.log(event);
  }
}
