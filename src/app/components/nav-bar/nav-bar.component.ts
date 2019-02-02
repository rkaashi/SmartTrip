import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../Models/user.model';
import {Router} from '@angular/router';
import {UserService} from '../../Services/User/user.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  modalReference: NgbModalRef;
  closeResult: string;
  isExpanded: boolean;
  imageUrl = '/assets/images/Hotal.png';
  constructor(private modalService: NgbModal, private userService: UserService, private router: Router,  private socialAuthService: AuthService) {
  }

  ngOnInit() {
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

  submit(f) {
    console.log(f.value);
    console.log('hello1');
    const user = new User(
      f.value.email, f.value.password
    );
    console.log('hello2');
    this.userService.signin(user)
      .subscribe(
        data => {
          console.log('DATA is here:', JSON.stringify(data));
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('BusinessUser', data.BusinessUser);
          this.modalReference.close();
          this.router.navigateByUrl('/hotel');
        },
        error => console.error(error)
      );
    console.log('hello4');
  }
  isLoggedIn() {
    console.log('Log IN:' + this.userService.isLoggedIn());
    return this.userService.isLoggedIn();
  }

  isBusinessUser() {
    console.log('Business User:' + this.userService.isBusinessUser());
    if (this.userService.isBusinessUser() === null || this.userService.isBusinessUser() === 'false') {
      console.log('Print2');
      return false;
    } else {
      return true;
    }
  }

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/hotel');
  }
  businessCall() {
    const user_id = localStorage.getItem('userId');
    this.router.navigate(['/BusinessView', user_id]);
  }
  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + ' sign in data : ' , userData);
        const user = new User(
          userData.email, 'unknow', userData.name, '', '', '', '', '', '', 'false', userData.id
      );
        console.log('User Data is:' + user);
        this.userService.signup(user, 'fb')
          .subscribe(
            data => {

              localStorage.setItem('token', userData.token);
              localStorage.setItem('userId', userData.id);
              localStorage.setItem('BusinessUser', 'false');
              this.modalReference.close();
              this.router.navigateByUrl('/hotel');
            },
            error => console.error(error)
          );
      }
    );
  }
}
