import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { map  } from 'rxjs/operators';
import { fromEvent, merge, Observable, of } from 'rxjs';


export interface usrinfoDetails {
  profileName: string,
  email: string,
  gender:string,
  areaOfinterest:string,
  skills: string,
  location:string,
  membershipEnd: string,
  membershipType: string,
  projectLocation: string,
  photoUrl: string,
}
export interface userProfile {
  userAuthenObj: firebase.User
}

@Injectable({
  providedIn: 'root'
})


export class UserdataService {

  isOnline$!: Observable<boolean>;


  constructor() {
    this.isOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine));
   }
}
