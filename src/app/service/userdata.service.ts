import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { map  } from 'rxjs/operators';

export const CARS = [
  {
    id: 0,
    profileName: 'merlinpratheesh',
    email: 'merlinpratheesh@gmail.com',
    gender: 'male',
    areaOfinterest: 'Angular',
    skills: 'Js',
    location: 'India',




  }
];
@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor() { }
}
