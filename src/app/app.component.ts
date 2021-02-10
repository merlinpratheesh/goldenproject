import { Component,Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CARS ,UserdataService } from './service/userdata.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

interface names {
  id: number;
  profileName: string;
  email: string;
  gender: string;
  areaOfinterest: string;
  skills: string;
  location: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})

export class AppComponent  {

  
  constructor(private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet,{data: { names: ['merlinpratheesh', 'merlinpratheesh@gmail.com','male','Angular','Js','India']} });
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

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: {names: string[]}) {
    console.log(this.data.names[0]);
    this.names = new FormGroup({
      profileName: new FormControl(this.data.names[0]),
      email: new FormControl(this.data.names[1]),
      gender: new FormControl(this.data.names[2]),
      areaOfinterest: new FormControl(this.data.names[3]),
      skills: new FormControl(this.data.names[4]),
      location: new FormControl(this.data.names[5])

    });
  }


  save() {

  }

  cancel() {
    this.names = null;
  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
