/* To use Web Token authentication, instead of having this harmful security rule on Firebase console:

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}

We should instead change the rule to:

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}

Essentially we are saying in the above security code is that allow the data on the database to be read and written to if the incoming
request has an authenticated user (that is basically the information stored in the request.auth property).
The receiving of the web token from the server, the storing of the web token on the client (usually it is stored on localStorage), and
the sending of the web token to the server for authentication is all handled automatically with Angularfire when we use the authentication
methods it provides us.
 */
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
import {AuthData} from './auth-data.model';
import {Router} from '@angular/router';
/* We have to import AngularFireAuth from 'angularfire2/auth' before we can use it in our Typescript file.
 */
import { AngularFireAuth } from 'angularfire2/auth';
import {TrainingService} from '../training/training.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {}

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
  }

  logout() {
    this.trainingService.cancelSubscriptions();
    /* The signOut() method provided by Angularfire will automatically get rid of the web token on the client side.
     */
    this.afAuth.auth.signOut();
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  /* We can even make a function private.
   */
  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
