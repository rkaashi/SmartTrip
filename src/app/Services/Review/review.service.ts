import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Review } from '../../Models/review.model';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ReviewService {
  public reviews;
  public data_things;
  constructor(public http: Http) { }

  GetReviewsById(review: Review) {
    const body = JSON.stringify(review);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.data_things = this.http.post('https://localhost:3000/app/reviews', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));

  }
  postReviews(review: Review) {
    const body = JSON.stringify(review);
    console.log('PostReview Body', body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://localhost:3000/app/postReview', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
}
