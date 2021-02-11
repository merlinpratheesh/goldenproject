import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MainSectionGroup, UserdataService, projectDetails, userProfile, usrinfoDetails } from './service/userdata.service';
import firebase from 'firebase/app';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  myuserProfile: userProfile = {
    userAuthenObj: null,//Receive User obj after login success
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
        this.getProfilesBehaviourSub.next(val);
      }
    }
      
    );
    return this.getProfilesBehaviourSub;
  };

Sections = of(undefined);
getSectionsSubscription: Subscription;
getSectionsBehaviourSub = new BehaviorSubject(undefined);
getSections = (MainAndSubSectionkeys: AngularFirestoreDocument<MainSectionGroup>) => {
  if (this.getSectionsSubscription !== undefined) {
    this.getSectionsSubscription.unsubscribe();
  }
  this.getSectionsSubscription = MainAndSubSectionkeys.valueChanges().subscribe((val: any) => {
    if (val === undefined) {
      this.getSectionsBehaviourSub.next(undefined);
    } else {
      if (val.MainSection.length === 0) {
        this.getSectionsBehaviourSub.next(null);
      } else {
        if (val.MainSection.length !== 0) {
          this.getSectionsBehaviourSub.next(val.MainSection);
        }
      }
    }
  });
  return this.getSectionsBehaviourSub;
};

OnlineCheck: undefined;
profileRef;
keyRef = this.getSections((this.db.doc('projectKey/' + 'DefaultProject')));
userselectedProject = 'SHOW';
newUidRef:any;

constructor(
  public developmentservice: UserdataService,
  private db: AngularFirestore, public afAuth: AngularFireAuth,
  public firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService)

{
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
              this.profileRef = this.getProfiles((this.db.doc('profile/' + afterauth.uid)));

              this.myuserProfile.userAuthenObj = afterauth;

              console.log('119',this.myuserProfile.userAuthenObj);

              console.log('reached here', onlineval);
              return of(onlineval);
            }
          }));
      }
      else {
        console.log('reached here', onlineval);
        return of(onlineval);
      }

    }));
}

projctDetails(some) {
  this.userselectedProject = some.keyref;
  console.log('136',some);

  console.log('136',some.keyref);
  this.profileRef = this.getProfiles((this.db.doc('profile/' + some.profileRef)));
  console.log(this.profileRef);
  this.getSectionsSubscription?.unsubscribe();
  this.keyRef = this.getSections((this.db.doc('projectKey/' + some.keyref)));
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