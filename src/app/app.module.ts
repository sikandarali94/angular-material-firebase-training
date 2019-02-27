import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
/* We must import the AngularFireModule before we use it in our app, as shown below.
 */
import { AngularFireModule } from 'angularfire2';
/* Because our Firebase database uses Firestore implementation, we should only import that package which exclusively handles Firestore. That
is why we are importing AngularFirestoreModule, as shown below.
 */
import { AngularFirestoreModule } from 'angularfire2/firestore';
/* For authentication with Angular Firebase using angularfire we first have to import the AngularFireAuthModule into our app, as shown
below.
 */
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { WelcomeComponent } from './welcome/welcome.component';
/* @angular/flex-layout abstracts the CSS for implementing flexbox and instead we use directives that apply CSS flexbox.
 */
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import {StopTrainingComponent} from './training/current-training/stop-training.component';
import {AuthService} from './auth/auth.service';
import {TrainingService} from './training/training.service';
import { environment } from '../environments/environment';
import {UiService} from './shared/ui.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    /* We have to execute the initializeApp() method to initialize Angularfire2. We pass into the initialize app our configuration under
    the firebase key within our environment.ts file.
     */
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, TrainingService, UiService],
  bootstrap: [AppComponent],
  /* In entryComponents, is where we add all components that are neither instantiated by using their selector in our template nor by
  routing. In other words, Angular has no way of finding out whether this component is going to get used and when this is going to be the
  case. In entryComponent, we tell Angular to be prepared to use this component and when we instantiate this component programmatically,
  this doesn't throw an error.
   */
  entryComponents: [StopTrainingComponent]
})
export class AppModule { }
