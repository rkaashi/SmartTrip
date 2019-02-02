import {OnChanges, Component, Input, OnInit, OnDestroy} from '@angular/core';

import {Router} from '@angular/router';
import {DataService} from '../../Services/Data/data.service';
import {ReviewService} from '../../Services/Review/review.service';
import {Review} from '../../Models/review.model';

@Component({
  selector: 'app-recommend-popular',
  templateUrl: './recommend-popular.component.html',
  styleUrls: ['./recommend-popular.component.css']
})
export class RecommendPopularComponent implements OnInit, OnChanges {
  @Input() comp: string;
  @Input() recommended: string;
  @Input() popular: string;
  recommendedFlag = false;
  popularFlag = false;

  constructor(private router: Router, private reviewService: ReviewService, private dataService: DataService) {
  }

  getRepeater(ratingTotal) {
    return new Array(ratingTotal);
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('Recommended', this.recommended);
    if (this.recommended.length > 0 ) {
      console.log('this.recommended');
      this.recommendedFlag = true;
    }
    if (this.popular.length > 0 ) {
      console.log('this.recommended');
      this.popularFlag = true;
    }
  }
  SubmitDeals(obj) {
    console.log('This Deal:', obj);
    if (obj.ID) {
      const review = new Review(
        obj.ID );
      this.reviewService.GetReviewsById(review)
        .subscribe(
          data => {
            this.dataService.data_things = JSON.stringify(data);
            this.router.navigate(['/review', obj.ID ]);
          },
          error => console.error(error)
        );
    }
  }
}
