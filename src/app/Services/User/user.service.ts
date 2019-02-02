import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { User } from '../../Models/user.model';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  signup(user: User, option?: string) {
    const body = JSON.stringify(user);
    console.log('Body:' + body);
    const headers = new Headers({'Content-Type': 'application/json'});
    if (option === 'fb') {
      return this.http.post('https://localhost:3000/app/FbSignUp', body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    } else {
      return this.http.post('https://localhost:3000/app/signUp', body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

  }

  signin(user: User) {
    console.log('hello5');
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://localhost:3000/app/signIn', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
  isBusinessUser() {
    return localStorage.getItem('BusinessUser');
  }

}
