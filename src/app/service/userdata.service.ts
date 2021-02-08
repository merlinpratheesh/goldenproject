import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { map  } from 'rxjs/operators';
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

@Injectable({
  providedIn: 'root'
})


export class UserdataService {

  constructor() { }
}
