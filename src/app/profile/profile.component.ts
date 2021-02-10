import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { projectFlags,UserdataService, usrinfoDetails } from '../service/userdata.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {

  @Input() profile: Observable<usrinfoDetails>;
  @Input() newUid:any;

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

  myprojectFlags: projectFlags = {

    userAuthenObj: false,

  };





  constructor(public fb: FormBuilder, private _bottomSheet: MatBottomSheet, public developmentservice: UserdataService, private db: AngularFirestore) {
  }
  openBottomSheet(mydata: any): void {

    this._bottomSheet.open(BottomSheetOverviewExampleSheet, { data: {mydata, uid:'newUid'} });
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
          <input type="text" class="form-control" id="brand" formControlName="profileName">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">email</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="model" formControlName="email">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">gender</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="year" formControlName="gender">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">areaOfinterest</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="year" formControlName="areaOfinterest">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">skills</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="year" formControlName="skills">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">location</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="year" formControlName="location">
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
     @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, public newUid:any) {
    console.log(this.data);
    //console.log(this.data.names[0]);

    this.names = new FormGroup({

      profileName: new FormControl(this.data.profileName),
      email: new FormControl(this.data.email),
      gender: new FormControl(this.data.gender),
      areaOfinterest: new FormControl(this.data.areaOfinterest),
      skills: new FormControl(this.data.skills),
      location: new FormControl(this.data.location)

    });
  }


  save() {
    
    console.log(this.names.get('profileName').value);
    
    const newItem = {
      profileName:this.names.get('profileName').value,
      email:this.names.get('email').value,
      gender:this.names.get('gender').value,
      areaOfinterest:this.names.get('areaOfinterest').value,
      skills:this.names.get('skills').value,
      location:this.names.get('location').value

    };
   console.log(this.newUid)
    this.developmentservice.updateProfile(this.names.value);
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
