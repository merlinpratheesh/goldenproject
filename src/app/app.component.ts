import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { docData } from 'rxfire/firestore';
import { of, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { UserdataService, usrinfoDetails } from './service/userdata.service';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { AngularFireAuth } from '@angular/fire/auth';

export interface something {
  profileinfo: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'goldenproject';

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
          this.getProfilesBehaviourSub.next(val);
        
      }
    }
    );
    return this.getProfilesBehaviourSub;
  };


someinfodetails: something = {
  profileinfo: undefined,
};
constructor(public developmentservice: UserdataService, private db: AngularFirestore)
{
}
profileRef = this.getProfiles((this.db.doc('profile/uid')));

}

