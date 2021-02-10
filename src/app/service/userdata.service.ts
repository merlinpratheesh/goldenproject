import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { map  } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

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

export interface projectControls {
  editProfileGroup?: FormGroup;
}

@Injectable({
  providedIn: 'root'
})


export class UserdataService {

  constructor(private db: AngularFirestore) { }

  async updateProfile (val: any) : Promise<void>{
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.doc('profile/' + 'uid').update(val),
      ]);
      return promise;
    });
  }
}
