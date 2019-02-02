import {Component, OnChanges, OnInit} from '@angular/core';
import {HotelService} from '../../Services/Hotel/hotel-service.service';
import {Hotel} from '../../Models/hotel.model';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  public ImageValue;
  GoogleimageUrl = '/assets/images/google-play.png';
  AppleimageUrl = '/assets/images/apple.png';
  stars = [1, 2, 3, 4];
  component = 'Hotels';
  hotels = ['/assets/images/h1.jpg', '/assets/images/h2.jpg', '/assets/images/h3.jpg'];
  public images: string[] ;
  public headings: string[] ;
  public texts: string[] ;
  recommendedHotels: Hotel[];
  popularHotels: Hotel[];
  latitude: any;
  longitude: any;
  constructor(private hotelService: HotelService) {
    this.ImageValue = '/assets/images/Hotels.png';
    console.log('calling_1');
    this.hotelService.GetRecommendedHotels(this.latitude, this.longitude).subscribe((hotels: Hotel[]) => {
      this.recommendedHotels = hotels;
      console.log('calling1');
    });

    console.log('calling_2');
    this.hotelService.GetPopularHotels(this.latitude, this.longitude).subscribe((hotels: Hotel[]) => {
      this.popularHotels = hotels;
      console.log('calling2');
    });
  }

  ngOnInit() {
    this.images = ['assets/images/trust.png', 'assets/images/service.png', 'assets/images/worldwide.png'];
    this.headings = ['Trusted Online Travel Leader', 'Service You Can Trust', 'Worldwide Coverage'];
    this.texts = ['300 million members & 30 million authentic reviews ', 'One-stop multilingual service & hassle-free trave', 'Over 1,200,000 hotels in more than 200 countries & flights to over 5,000 cities'];
  }
}
