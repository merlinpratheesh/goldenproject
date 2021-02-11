import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { first, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

export interface userProfile {
  userAuthenObj: firebase.User
}


export interface projectDetails {
  projectName: string;//Heading in testcase list
  description: string;//Sub-Heading in testcase list
  photoUrl: string;//Description in testcase view
  projectUid: string;//stackblitzLink in testcase edit/doubleclick
  creationDate: string;
  profileName: string;
}
export interface SubSection {
  viewvalue: string;
}

export interface MainSectionGroup {
  disabled: boolean;
  name: string;
  section: SubSection[];
}
export interface usrinfoDetails {
  projectName:string,
  profileName: string,
  email?: string,
  gender?: string,
  areaOfinterest?: string,
  skills?: string,
  location?: string,
  membershipEnd?:firebase. firestore. Timestamp;
  membershipType?: string,
  projectLocation?: string,
  photoUrl: string,
}
export interface projectControls {
  editProfileGroup?: FormGroup;
}


@Injectable({
  providedIn: 'root'
})

export class UserdataService {

  isOnline$!: Observable<boolean>;


  constructor(private db: AngularFirestore) {
    this.isOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine));
  }

  async updateProfile (val: any) : Promise<void>{
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.doc('profile/' + 'D4P3KvlZ0iN8l15BldKh9mCCyY12').update(val),
      ]);
      return promise;
    });
  }

  docExists(uid: string):any {
    return this.db.doc(`profile/` + `${uid}`).valueChanges().pipe(first()).toPromise();
  }
  async findOrCreate(uid: string) :Promise<usrinfoDetails> {
    const doc:usrinfoDetails = await this.docExists(uid);
    if (doc) {
      console.log('returned', doc);
      return doc;
    } else {
      return undefined;
    }
  }

  
}
