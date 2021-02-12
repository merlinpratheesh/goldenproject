import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { map  } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

export interface createProjectDetails {
  projectName?: string;//Heading in testcase list
  description?: string;//Sub-Heading in testcase list
  photoUrl?: string;//Description in testcase view
  projectUid?: string;//stackblitzLink in testcase edit/doubleclick
  creationDate?:firebase. firestore. Timestamp;
  profileName?: string;
}

export interface projectControls {


  createProjectDetails?: FormGroup
}
@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private db: AngularFirestore) { }

  async createProject (value: any) : Promise<void>{
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.doc('projectList/' + 'publicProject').update(value),
        this.db.firestore.doc('projectList/' + 'publicProject/').set({public: firebase.firestore.FieldValue.arrayUnion(value)},{merge: true})

      ]);
      return promise;
    });
  }
}
