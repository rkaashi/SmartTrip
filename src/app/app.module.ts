import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';
import { ReviewComponent } from './components/review/review.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import { HotelComponent } from './components/hotel/hotel.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { TravelComponent } from './components/travel/travel.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ShowDealsComponent } from './components/show-deals/show-deals.component';
import { SignupComponent } from './components/signup/signup.component';
import {TabsModule} from 'ngx-tabs';
import { BrandMessagingComponent } from './components/brand-messaging/brand-messaging.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ThingsToDoComponent } from './components/things-to-do/things-to-do.component';
import { BusinessUsersComponent } from './components/business-users/business-users.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddItemComponent } from './components/add-item/add-item.component';
import { RecommendPopularComponent } from './components/recommend-popular/recommend-popular.component';
import {HttpModule} from '@angular/http';
import {HotelService} from './Services/Hotel/hotel-service.service';
import {UserService} from './Services/User/user.service';
import {RestaurantService} from './Services/Restaurant/restaurant.service';
import {DataService} from './Services/Data/data.service';
import {FlightService} from './Services/Flight/flight.service';
import {ReviewService} from './Services/Review/review.service';
import {RoadService} from './Services/Road/road.service';
import { BusinessViewComponent } from './components/business-view/business-view.component';
import {BusinessService} from './Services/Business/business.service';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('170544920278683')
      }
    ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    ReviewComponent,
    HotelComponent,
    RestaurantComponent,
    TravelComponent,
    SearchbarComponent,
    ShowDealsComponent,
    SignupComponent,
    BrandMessagingComponent,
    StarRatingComponent,
    PaymentComponent,
    ThingsToDoComponent,
    BusinessUsersComponent,
    AddItemComponent,
    RecommendPopularComponent,
    BusinessViewComponent
  ],
  imports: [
    SocialLoginModule,
    HttpModule,
    CommonModule,
    BrowserModule,
    AngularFontAwesomeModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    NouisliderModule,
    NgbModule,
    TabsModule,
    MatTabsModule,
    MatRadioModule,
    MatMenuModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: 'hotel', component: HotelComponent, data: {depth: 1}},
      { path: 'restaurant', component: RestaurantComponent, data: {depth: 1} },
      { path: 'travel', component: TravelComponent, data: {depth: 1} },
      { path: 'thingsToDo', component: ThingsToDoComponent, data: {depth: 1} },
      { path: 'BusinessUsers', component: BusinessUsersComponent, data: {depth: 1} },
      { path: 'AddItem', component: AddItemComponent, data: {depth: 1} },
      { path: 'ShowDeals/:name', component: ShowDealsComponent , data: {depth: 2}},
      { path: 'review/:objID', component: ReviewComponent , data: {depth: 3}},
      { path: 'signup', component: SignupComponent , data: {depth: 2}},
      { path: 'BusinessView/:userId', component: BusinessViewComponent , data: {depth: 2}},
      { path: 'payment', component: PaymentComponent , data: {depth: 4}},
      { path: '', redirectTo: '/hotel', pathMatch: 'full'}
    ])
  ],
  providers: [ HotelService, UserService, RestaurantService, DataService, FlightService, ReviewService, RoadService, BusinessService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
