/* There are three ways to connect to Firebase using Angular. They are: REST API (using GET, POST, PUT and so forth of the http client of
Angular), SDK (this is provided by Firebase and can be used in any JS project) and Angularfire (A third party package which provides us a
lot of features that the SDK provided but in a manner that embraces observables and nicely integrates into Angular. We can only use this
in Angular). For this project, we will use Angularfire.
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    /* We can use the spread operator to create a new copy of the object rather than returning a reference to the user object in this
    service.
    */
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  /* We can even make a function private.
   */
  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
