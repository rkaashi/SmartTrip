import {Component, HostListener, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../Services/Data/data.service';
import {Review} from '../../Models/review.model';
import {ReviewService} from '../../Services/Review/review.service';

@Component({
  selector: 'app-show-deals',
  templateUrl: './show-deals.component.html',
  styleUrls: ['./show-deals.component.css']
})
export class ShowDealsComponent implements OnInit, OnChanges {
  public isSelect = false;
  public isCol = false;
  public Name;
  step = 0;
  someRange = [ 0, 15000];
  max = 15000;
  min = 0;
  public isHotel = false;
  public isRestaurant = false;
  fiveStarFilter = false;
  fourStarFilter = false;
  threeStarFilter = false;

  dbtimeslots = [];
  collection = [];
  p = 1;

  constructor(private router: ActivatedRoute, private dataService: DataService, private reviewService: ReviewService, private route: Router) {
  }

  ngOnChanges() {

  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      console.log('PARAMS:', params.get('name'));
      this.Name = params.get('name');
    });

    this.collection = this.dataService.data_things['obj'];
    console.log('Getting Data', this.collection);
    this.dbtimeslots = this.collection;
    if (this.collection[0].Type) {
      this.isRestaurant = true;
    } else {
      this.isHotel = true;
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log('Iwidth is' + event.target.innerWidth);
    console.log('Owidth is' + event.target.outerWidth);
    if (event.target.outerWidth <= 1300) {
      this.isSelect = true;
    } else {
      this.isSelect = false;
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onChange(value) {
    console.log('Value of slider changed to', value);
    this.max = value[1];
    this.min = value[0];
    const coll = [];
    for (let i = 0; i < this.dbtimeslots.length; i++) {
      if (this.dbtimeslots[i].Price > this.min && this.dbtimeslots[i].Price < this.max) {
        coll.push(this.dbtimeslots[i]);
      }
    }
    if (this.max.toString() === '15000' && this.min.toString() === '0') {
      this.dbtimeslots = this.collection;
    } else {
      this.dbtimeslots = coll;
    }
  }
  onFiveFilterChange(eve: any) {
    this.fiveStarFilter = !this.fiveStarFilter;
    this.check();
  }
  onFourFilterChange(eve: any) {
    this.fourStarFilter = !this.fourStarFilter;
    this.check();
  }
  onThreeFilterChange(eve: any) {
    this.threeStarFilter = !this.threeStarFilter;
    this.check();
  }
  check() {
    if ( this.fiveStarFilter === false && this.fourStarFilter === false && this.threeStarFilter === false ||
      this.fiveStarFilter === true && this.fourStarFilter === true && this.threeStarFilter === true) {
      this.dbtimeslots = this.collection;
    } else {
      if (this.fiveStarFilter === true && this.fourStarFilter === true) {
        this.dispose();
        this.add(5);
        this.add(4);
      } else if (this.fiveStarFilter === true && this.threeStarFilter === true) {
        this.dispose();
        this.add(5);
        this.add(3);
      } else if (this.threeStarFilter === true && this.fourStarFilter === true) {
        this.dispose();
        this.add(3);
        this.add(4);
      } else if (this.fiveStarFilter === true ) {
        this.dispose();
        this.add(5);
      } else if (this.fourStarFilter === true ) {
        this.dispose();
        this.add(4);
      } else if (this.threeStarFilter === true ) {
        this.dispose();
        this.add(3);
      }
    }
  }
  add(str) {
    for (let i = 0; i < this.collection.length; i++) {
      if (this.collection[i].Rating === str) {
        this.dbtimeslots.push(this.collection[i]);
      }
    }
  }
  dispose() {
    this.dbtimeslots = [];
  }
  SubmitDeals(obj) {
    console.log('This Deal:', obj);
    if (obj._id) {
      const review = new Review(
        obj._id );
      this.reviewService.GetReviewsById(review)
        .subscribe(
          data => {
            this.dataService.data_things = JSON.stringify(data);
            this.route.navigate(['/review', obj._id ]);
          },
          error => console.error(error)
        );
    }
  }
}
