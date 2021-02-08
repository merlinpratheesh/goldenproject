import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface projectDetails{
  projectName: string;//Heading in testcase list
  description:string;//Sub-Heading in testcase list
  photoUrl: string;//Description in testcase view
  projectUid: string;//stackblitzLink in testcase edit/doubleclick
  creationDate:string;
  profileName:string;
}
@Injectable({
  providedIn: 'root'
})

export class UserdataService {

  constructor( private db: AngularFirestore) {
 
   }}