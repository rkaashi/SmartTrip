import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-things-to-do',
  templateUrl: './things-to-do.component.html',
  styleUrls: ['./things-to-do.component.css']
})
export class ThingsToDoComponent implements OnInit {
  public ImageValue;
  public images: string[] ;
  public headings: string[] ;
  public texts: string[] ;
  stars = [1, 2, 3, 4];
  component = 'Places';
  places = ['/assets/images/t1.jpg', '/assets/images/t2.jpg', '/assets/images/t3.jpg'];
  constructor() {
    this.ImageValue = '/assets/images/thingsTodo.jpg';
  }

  ngOnInit() {
    this.images = ['assets/images/discover.png', 'assets/images/review.png', 'assets/images/booking.png'];
    this.headings = ['Discover Great Things', 'See the latest reviews', 'Book right Things'];
    this.texts = ['Choose from 760,000 attractions, tours & activities', 'Millions of travel reviews and photos from our global travel community', 'Skip the line and pre-book things to do — at home or while you travel'];
  }

}
