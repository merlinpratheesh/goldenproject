import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { startWith,map } from 'rxjs/operators';
import {  UserdataService, usrinfoDetails } from '../service/userdata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit,OnDestroy  {

  @Input() profile: usrinfoDetails;
  


  myusrinfoDetails: usrinfoDetails = {
    profileName: '',
    email: '',
    gender:'',
    areaOfinterest:'',
    skills: '',
    location:'',
    membershipEnd: '',
    membershipType: '',
    projectLocation: '',
    photoUrl: ''

  }
  constructor(public developmentservice: UserdataService, private db: AngularFirestore) { 
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
 

    
  }


}
