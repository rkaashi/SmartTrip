import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Review} from '../../Models/review.model';
import {UserService} from '../../Services/User/user.service';
import {DataService} from '../../Services/Data/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReviewService} from '../../Services/Review/review.service';
import {BusinessService} from '../../Services/Business/business.service';

@Component({
  selector: 'app-business-view',
  templateUrl: './business-view.component.html',
  styleUrls: ['./business-view.component.css']
})
export class BusinessViewComponent implements OnInit {
  stars = [1, 2, 3, 4];
  closeResult: string;
  private collectionReview = [];
  private reviewsNumbers = 0;
  private avgRating = 0;
  private calculateFiveStars = 0;
  private calculateFourStars = 0;
  private calculateThreeStars = 0;
  Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  private calculateTwoStars = 0;
  private calculateOneStars = 0;
  private userRating: number;
  private userId;
  private reviews: Review[] = [];
  collection: any = [];
  constructor(private dataService: DataService, private userService: UserService, private reviewService: ReviewService, private router: ActivatedRoute, private route: Router, private businessService: BusinessService) { }


  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      console.log('PARAMS:', params.get('userId'));
      this.userId = params.get('userId');
    });
    this.businessService.GetBusinessViews(this.userId )
      .subscribe(
        data => {
          console.log('YA kuch kr dy:', data);
          const review = new Review(
            data );
          this.reviewService.GetReviewsById(review)
            .subscribe(
              data_ => {
                console.log('Kr k daka dy ');
                this.collection = data_['obj'];
                for (let i = 0; i < data_['obj'].length; i++) {
                  console.log('Rating' + this.collection[i].Rating);
                  this.reviews.push(new Review(this.collection[i].Object_id, this.collection[i].User_id, this.collection[i].Rating, this.collection[i].Title,  this.collection[i].Date, this.collection[i]._id));
                }
                this.collectionReview = this.reviews;
                console.log('Reviews', this.collectionReview);
                this.reviewsNumbers = this.collectionReview.length;
                let sum = 0;
                for (let i = 0; i < this.reviewsNumbers; i++ ) {
                  if (this.collectionReview[i].Rating === 5) {
                    this.calculateFiveStars++;
                  } else if (this.collectionReview[i].Rating === 4) {
                    this.calculateFourStars++;
                  } else if (this.collectionReview[i].Rating === 3) {
                    this.calculateThreeStars++;
                  } else if (this.collectionReview[i].Rating === 2) {
                    this.calculateTwoStars++;
                  } else if (this.collectionReview[i].Rating === 1) {
                    this.calculateOneStars++;
                  }
                  sum += this.collectionReview[i].Rating;

                }
                const num = (sum / this.reviewsNumbers).toFixed( 1 );
                this.avgRating =  parseFloat(num);
                },
              error => console.error(error)
            );
        },
        error => console.error(error)
      );
  }



  getAvgRating(num) {
    if (num === 0) {
      return new Array(Math.floor( this.avgRating ));
    } else {
      return new Array(5 - Math.floor( this.avgRating ));
    }
  }
  onNotify(message: number): void {
    console.log('Rate value2', message);
    this.userRating = message;
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  getRepeater(ratingTotal) {
    return new Array(ratingTotal);
  }

}
