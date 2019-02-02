import {AfterViewInit, Component, OnChanges, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { trigger, transition, style, animate } from '@angular/animations';
import {DataService} from '../../Services/Data/data.service';
import {UserService} from '../../Services/User/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Review} from '../../Models/review.model';
import {ReviewService} from '../../Services/Review/review.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ReviewComponent implements OnInit, AfterViewInit {
  stars = [1, 2, 3, 4];
  closeResult: string;
  modalReference: NgbModalRef;
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
  private objId;
  constructor(private modalService: NgbModal, private dataService: DataService, private userService: UserService, private router: ActivatedRoute, private route: Router, private reviewService: ReviewService) { }

  ngAfterViewInit() {
    console.log('AfterViewInit');
  }


  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      console.log('PARAMS:', params.get('objID'));
      this.objId = params.get('objID');
    });
    this.collectionReview = this.dataService.data_things['obj'];
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
  }
  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
  submit(f) {

    console.log('Review Values', f.value);
    const userId = localStorage.getItem('userId');
    console.log('userId', userId);
    const currentDate = new Date();
    const date = this.Months[currentDate.getMonth()] + ',' + currentDate.getDate() + ',' + currentDate.getFullYear();
    console.log('ObjID', this.objId);
    if (userId) {
      const review = new Review(this.objId, userId, this.userRating, f.value.title, f.value.description, date);
      this.reviewService.postReviews(review)
        .subscribe(
          data => {

            console.log('Collection_1:' + this.collectionReview);
            console.log('Data is:' + data);
            console.log('dataStrinfiy is:' + JSON.stringify(data));
            this.collectionReview.push(data);
            console.log('Collection_2:' + this.collectionReview);
            this.modalReference.close();
          },
          error => console.error(error)
        );
    }
  }
  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  getRepeater(ratingTotal) {
    return new Array(ratingTotal);
  }

}
