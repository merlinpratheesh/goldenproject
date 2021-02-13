import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { map  } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

export interface createProjectFields {
  projectName?: string;//Heading in testcase list
  description?: string;//Sub-Heading in testcase list
  photoUrl?: string;//Description in testcase view
  projectUid?: string;//stackblitzLink in testcase edit/doubleclick
  creationDate?:string;
  profileName?: string;
}

export interface projectControls {
  editProfileGroup?: FormGroup;
}

@Injectable({
  providedIn: 'root'
})


export class UserdataService {

  constructor(private db: AngularFirestore) { }

  async updateTask (val: any) : Promise<void>{
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.doc('/privateProject/D4P3KvlZ0iN8l15BldKh9mCCyY12/projectName/sampleProject').update(val),
      ]);
      return promise;
    });
  }
}
