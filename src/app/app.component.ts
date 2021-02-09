import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainSectionGroup, UserdataService,projectDetails, usrinfoDetails } from './service/userdata.service';

export interface something {
  profileinfo: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

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
  profileRef=this.getProfiles((this.db.doc('profile/' + 'uid')));
  keyRef = this.getSections((this.db.doc('projectKey/' + 'DefaultProject')));
  userselectedProject = 'SHOW';


  someinfodetails: something = {
    profileinfo: undefined,
  };

  constructor(public developmentservice: UserdataService, private db: AngularFirestore, public afAuth: AngularFireAuth, public firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService) {
    this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
    this.myonline = this.getObservableonline(this.developmentservice.isOnline$);
    this.OnlineCheck = this.myonline.pipe(
      map((onlineval: any) => {
        return (onlineval);
      }));

  }

  projctDetails(some) {
    this.userselectedProject = some.keyref;
    console.log(some.keyref);
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