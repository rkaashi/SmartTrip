import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {
  @Output() notify: EventEmitter<number> = new EventEmitter<number>();
  rating: number;
  constructor() { }

  ngOnInit() {
  }

  onSelectionChange(obj) {
    console.log('Rate value', obj);
    this.notify.emit(obj);
  }

}
