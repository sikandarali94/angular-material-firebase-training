/* Angularfire helps us with authentication as well.
 */
/* There are three ways to connect to Firebase using Angular. They are: REST API (using GET, POST, PUT and so forth of the http client of
Angular), SDK (this is provided by Firebase and can be used in any JS project) and Angularfire (A third party package which provides us a
lot of features that the SDK provided but in a manner that embraces observables and nicely integrates into Angular. We can only use this
in Angular). For this project, we will use Angularfire.
 */
/* There are three basic terms we need to know in order to understand how Firestore stores its data: collections (these are like folders),
documents (comparable to documents or files) and data (this is the dat inside the document). To know in detail about Firestore, we should
look at the docs for it.
Documents are stored within a collection. We can have collections nested, however, we can't have a collection within a collection but only
a collection within a document. These nested collections are called sub-collections.
 */
/* Angularfire2 is a dependancy of firebase and that is why we have to install both. To install both we write this in the console:
"npm install angularfire2 firebase --save"
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Router} from '@angular/router';
/* We have to import AngularFireAuth from 'angularfire2/auth' before we can use it in our Typescript file.
 */
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    /* Within the AngularFireAuth object, we have within the auth object a method called createUserWithEmailAndPassword() to create a user
    with email and password on Firebase. The two arguments we pass to this method is email and password. The method returns a promise where
    we can listen to the success case and of course also listen to the error case.
    We have to make sure to enable authentication with email and password on the Firebase console under 'Sign-in method' within
    'Authentication'.
     */
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch(error => {
      console.log(error);
    });
  }

  login(authData: AuthData) {
    /* Within the AngularFireAuth object, we have within the auth object a method called signInWithEmailAndPassword() that authenticates
    the login information of email and password against the users Firebase has (where the email and password of each every user is stored).
    It takes arguments of email and password, as shown below and returns a promise.
     */
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log(result);
      this.authSuccessfully();
    })
      .catch(error => {
        console.log(error);
      });
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
