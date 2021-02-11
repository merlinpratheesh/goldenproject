import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {  UserdataService, usrinfoDetails } from '../service/userdata.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup } from '@angular/forms';
import firebase from 'firebase/app';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {

  @Input() profile: Observable<usrinfoDetails>;
  @Input() profileinfoUid: firebase.User;;


  myusrinfoDetails: usrinfoDetails = {
    profileName: '',
    email: '',
    gender: '',
    areaOfinterest: '',
    skills: '',
    location: '',
    membershipEnd: '',
    membershipType: '',
    projectLocation: '',
    photoUrl: ''

  }






  constructor(public fb: FormBuilder, private _bottomSheet: MatBottomSheet, public developmentservice: UserdataService, private db: AngularFirestore) {
  }

  openBottomSheet(): void {

    this._bottomSheet.open(BottomSheetOverviewExampleSheet, { data: { mydata: this.profile, NewUid: this.profileinfoUid.uid } });
  }




  ngOnInit(): void {
  }
  ngOnDestroy() {

  }
}
@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  template: `

    <h2 class="py-4">Edit Car</h2>
    <form [formGroup]="names">
      <div class="form-group row">
        <label for="brand" class="col-sm-2 col-form-label">profileName</label>
        <div class="col-sm-6">
          <input type="text" class="form-control"  formControlName="profileName">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">email</label>
        <div class="col-sm-6">
          <input type="text" class="form-control"  formControlName="email">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">gender</label>
        <div class="col-sm-6">
          <input type="text" class="form-control"  formControlName="gender">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">areaOfinterest</label>
        <div class="col-sm-6">
          <input type="text" class="form-control"  formControlName="areaOfinterest">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">skills</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" formControlName="skills">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">location</label>
        <div class="col-sm-6">
          <input type="text" class="form-control"  formControlName="location">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-4 offset-sm-2">
          <button type="submit" class="btn btn-primary mr-2" (click)="save()">Save</button>
          <button type="reset" class="btn btn-outline-primary" (click)="cancel()">Cancel</button>
        </div>
      </div>
    </form>
  `
})
export class BottomSheetOverviewExampleSheet {

  names: FormGroup;

  constructor(public developmentservice: UserdataService, private db: AngularFirestore, private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    console.log(this.data);


    console.log(this.data.mydata.value.profileName);



    //console.log(this.data.names[0]);

    this.names = new FormGroup({

      profileName: new FormControl(this.data.mydata.value.profileName),
      email: new FormControl(this.data.mydata.value.email),
      gender: new FormControl(this.data.mydata.value.gender),
      areaOfinterest: new FormControl(this.data.mydata.value.areaOfinterest),
      skills: new FormControl(this.data.mydata.value.skills),
      location: new FormControl(this.data.mydata.value.location)

    });
  }


  save() {
      this.developmentservice.updateProfile(this.names.value);
      console.log(this.names.value);
      this._bottomSheetRef.dismiss();
  }





  cancel() {
    this.names = null;
    this._bottomSheetRef.dismiss();
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
