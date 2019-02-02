import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../Services/User/user.service';
import {User} from '../../Models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  BusinessValue =  'true';
  constructor(private userService: UserService, private router: Router) {
  }

  submit(f) {
    console.log(f.value);
    if (f.value.Business !== true) {
      this.BusinessValue = 'false';
    }
    const user = new User(
       f.value.email, f.value.password, f.value.name, f.value.address, f.value.city, f.value.state, f.value.phone, f.value.age, f.value.gender, this.BusinessValue
    );
    this.userService.signup(user)
      .subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          this.router.navigateByUrl('/hotel');
        },
        error => console.error(error)
      );
  }

  ngOnInit() {
    // this.myForm = new FormGroup({
    //   name: new FormControl(null, Validators.required),
    //   mobile: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [
    //     Validators.required,
    //     Validators.pattern('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?')
    //   ]),
    //   password: new FormControl(null, Validators.required),
    //   address: new FormControl(null, Validators.required),
    //   city: new FormControl(null, Validators.required),
    //   state: new FormControl(null, Validators.required),
    //   country: new FormControl(null, Validators.required),
    //   Cpassword: new FormControl(null, Validators.required),
    //   gender: new FormControl(null, Validators.required),
    //   age: new FormControl(null, Validators.required)
    // });
  }


}
