import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { docData } from 'rxfire/firestore';
import { of, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { UserdataService, createProjectFields, userProfile } from './service/userdata.service';
import { NgAnalyzedFile } from '@angular/compiler';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit,OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService} from 'firebaseui-angular';
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
  OnlineCheck: undefined;

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
  getProfiles = (profileDetails: AngularFirestoreDocument<createProjectFields>) => {
    if (this.getProfilesSubscription !== undefined) {
      this.getProfilesSubscription.unsubscribe();
    }
    this.getProfilesSubscription = profileDetails.valueChanges().subscribe((val: any) => {
      if (val === undefined) {
        this.getProfilesBehaviourSub.next(undefined);
      } else {
          this.getProfilesBehaviourSub.next(val);
          console.log(val);
        
      }
    }
    );
    return this.getProfilesBehaviourSub;
  };
  Profiles:Observable<any>;

constructor(public developmentservice: UserdataService, 
  public afAuth: AngularFireAuth, 
  public firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
  public dialog: MatDialog, private db: AngularFirestore)
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
            if (afterauth !== null && afterauth !== undefined) {//id is available
              this.myuserProfile.userAuthenObj = afterauth;
              this.developmentservice.findOrCreate(afterauth.uid).then((success :createProjectFields ) => {
                console.log('110', success);
                if(success === undefined){

                  const newItem = {
                    projectName: '',//Heading in testcase list
                    description: '',//Sub-Heading in testcase list
                    photoUrl: '',//Description in testcase view
                    projectUid: '',//stackblitzLink in testcase edit/doubleclick
                    creationDate: '',
                    profileName: '',
                  };
                  this.db.doc<any>('/privateProject/'+afterauth.uid+'/private/AngularProject').set(newItem);
                }else{   

                  this.Profiles = this.getProfiles((this.db.doc('/privateProject/'+afterauth.uid+'/private/AngularProject')));


                  console.log(this.Profiles);

                }
              });
              return of(onlineval);
            }
            else {
   
              this.myuserProfile.userAuthenObj=afterauth;

  


              return of(onlineval);
            }
            
          }));
      }
    }
    ));
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

