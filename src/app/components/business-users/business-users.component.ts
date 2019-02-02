import { Component, OnInit } from '@angular/core';
import {BusinessService} from '../../Services/Business/business.service';
import {DataService} from '../../Services/Data/data.service';
import {Hotel} from '../../Models/hotel.model';
import {Review} from '../../Models/review.model';
import {Business} from '../../Models/business.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-business-users',
  templateUrl: './business-users.component.html',
  styleUrls: ['./business-users.component.css']
})
export class BusinessUsersComponent implements OnInit {
  private dbtimeslots: Hotel[] = [];
  constructor(private businessService: BusinessService, private route: Router) { }

  ngOnInit() {
    this.businessService.GetBusinessOptions()
      .subscribe(
        data => {
          console.log('Chal Gaya');
          this.dbtimeslots = this.businessService.getHotels();
        },
        error => console.error(error)
      );
    console.log('END');
  }
  submitClaim(obj) {
    console.log(obj);
    if (obj.ID) {
      const user_id = localStorage.getItem('userId');
      const business = new Business(
        obj.ID, user_id );
      this.businessService.UpdateObject(business)
        .subscribe(
          data => {
            this.route.navigate(['/BusinessView', user_id]);
          },
          error => console.error(error)
        );
    }
  }

}
