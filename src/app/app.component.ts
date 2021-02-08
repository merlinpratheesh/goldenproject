import { AfterViewInit, Component,OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService} from 'firebaseui-angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserdataService, usrinfoDetails } from './service/userdata.service';

export interface something{
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
  OnlineCheck: undefined;
  profileRef;

  someinfodetails:something={
    profileinfo:undefined,
  };

  constructor(public developmentservice: UserdataService, private db: AngularFirestore, public afAuth: AngularFireAuth, public firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService) 
  
  {
    this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
    this.myonline = this.getObservableonline(this.developmentservice.isOnline$);
    this.profileRef = this.getProfiles((this.db.doc('profile/uid')));

    console.log(this.profileRef);
    this.OnlineCheck = this.myonline.pipe(
      map((onlineval: any) => {
      return (onlineval);
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