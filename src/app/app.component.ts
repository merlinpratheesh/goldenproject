import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { docData } from 'rxfire/firestore';
import { of, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { UserdataService, usrinfoDetails, userProfile } from './service/userdata.service';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'goldenproject';

  myuserProfile: userProfile = {
    userAuthenObj: null,//Receive User obj after login success
  };

  Profiles = of(undefined);
  getProfilesSubscription: Subscription;
  getProfilesBehaviourSub = new BehaviorSubject(undefined);
  getProfiles = (profileDetails: AngularFirestoreDocument<usrinfoDetails>) => {
    if (this.getProfilesSubscription !== undefined) {
      this.getProfilesSubscription.unsubscribe();
    }
    this.getProfilesSubscription = profileDetails.valueChanges().subscribe((val: any) => {
      if (val === undefined) {
        this.getProfilesBehaviourSub.next(undefined);
      } else {
        if (val.profileMoreinfo.length === 0) {
          this.getProfilesBehaviourSub.next(null);
        } else {
          if (val.profileMoreinfo.length !== 0) {
            this.getProfilesBehaviourSub.next(val.profileMoreinfo);
          }
        }
      }
    });
    return this.getProfilesBehaviourSub;
  };
  myonline;
  subjectonline = new BehaviorSubject(undefined);
  getObservableonlineSub: Subscription = new Subscription;
  getObservableonline = (localonline: Observable<boolean>) => {
    this.getObservableonlineSub?.unsubscribe();
    this.getObservableonlineSub = localonline.subscribe((valOnline: any) => {
      console.log(valOnline);
      this.subjectonline.next(valOnline);
    });
    return this.subjectonline;
  }

  myauth;
  loggedinstate: Observable<string> = new BehaviorSubject(undefined);
  subjectauth = new BehaviorSubject(undefined);
  getObservableauthStateSub: Subscription = new Subscription;
  getObservableauthState = (authdetails: Observable<firebase.User>) => {
    if (this.getObservableauthStateSub !== undefined) {
      this.getObservableauthStateSub.unsubscribe();
    }
    this.getObservableauthStateSub = authdetails.subscribe((val: any) => {
      this.subjectauth.next(val);
    });
    return this.subjectauth;
  };
  OnlineCheck: undefined;
  profileRef;
  constructor(
    public developmentservice: UserdataService,
    private db: AngularFirestore,
    public afAuth: AngularFireAuth,
    public firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
  ) {

    this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();

    this.myonline = this.getObservableonline(this.developmentservice.isOnline$);
    this.myauth = this.getObservableauthState(this.afAuth.authState);

    this.OnlineCheck = this.myonline.pipe(
      switchMap((onlineval: any) => {
        if (onlineval === true) {
          return this.myauth.pipe(
            map((afterauth: firebase.User) => {
              console.log(afterauth);
              if (afterauth == null && afterauth == undefined) {
                this.profileRef = this.getProfiles((this.db.doc('profile/uid')));
                console.log('reached here', onlineval);
                return of(onlineval);
              }
              else {
                this.myuserProfile.userAuthenObj = afterauth;
                console.log(afterauth);
                this.profileRef = this.getProfiles((this.db.doc('profile/' + afterauth.uid)));
                console.log('reached here', onlineval);
                return of(onlineval);
              }
            }));
        }
        else{
          console.log('reached here', onlineval);
          return of(onlineval);
        }      

      }));
  }


  ngAfterViewInit(): void {

  }
  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log('successCallback', data);

  }

  errorCallback(data: FirebaseUISignInFailure) {
    console.warn('errorCallback', data);
  }

  uiShownCallback() {
    console.log('UI shown');
  }

  logout() {
    this.afAuth.signOut();
  }

}

