import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { first, map  } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { fromEvent, merge, Observable, of } from 'rxjs';

export interface createProjectFields {
  projectName?: string;//Heading in testcase list
  description?: string;//Sub-Heading in testcase list
  photoUrl?: string;//Description in testcase view
  projectUid?: string;//stackblitzLink in testcase edit/doubleclick
  creationDate?:string;
  profileName?: string;
}

export interface userProfile {
  userAuthenObj: firebase.User
}

export interface projectControls {
  editProfileGroup?: FormGroup;
}

@Injectable({
  providedIn: 'root'
})


export class UserdataService {
  isOnline$: Observable<boolean>;


  constructor(private db: AngularFirestore) { 
    this.isOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine));
  }

  async updateTask (value: any, uidtoupdate: string) : Promise<void>{
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.doc('/privateProject/' + `${uidtoupdate}`+'/private/AngularProject' ).update(value),
      ]);        

      return promise;
    });
  }


  docExists(uid: string):any {
    return this.db.doc(`privateProject/` + `${uid}`+'/private/AngularProject' ).valueChanges().pipe(first()).toPromise();
  }
  async findOrCreate(uid: string) :Promise<createProjectFields> {
    const doc:createProjectFields = await this.docExists(uid);
    if (doc) {
      console.log('returned', doc);
      return doc;
    } else {
      return undefined;
    }
  }
}
