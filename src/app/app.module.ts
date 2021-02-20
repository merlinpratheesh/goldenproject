import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppSharedModule } from './app-shared/app-shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment'
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { UserdataService } from './service/userdata.service';


const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInOptions: [
      {
        // Google provider must be enabled in Firebase Console to support one-tap
        // sign-up.
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // Required to enable ID token credentials for this provider.
        // This can be obtained from the Credentials page of the Google APIs
        // console. Use the same OAuth client ID used for the Google provider
        // configured with GCIP or Firebase Auth.
        clientId: '325755404242-i8ufs5g8moq28o4oh38nv6qf3cbbt1gd.apps.googleusercontent.com'
        
      }],
  
    credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
  
  };
 

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppSharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
    ,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
