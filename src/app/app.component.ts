import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as firebase from 'firebase';
import { createProjectDetails, UserdataService } from './service/userdata.service';
import { Timestamp } from 'rxjs/internal/operators/timestamp';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  mycreateProjectDetails: createProjectDetails = {
    projectName: '',//Heading in testcase list
    description: '',//Sub-Heading in testcase list
    photoUrl: '',//Description in testcase view
    projectUid: '',//stackblitzLink in testcase edit/doubleclick
    creationDate:'',
    profileName: '',

  }

  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public developmentservice: UserdataService,
    private db: AngularFirestore,) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, 
      { 
        width: '500px',

        data: { mydata: this.mycreateProjectDetails } }
      
      );

  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title>Hi {{data.name}}</h1>

 <form formGroup="createProjectDetails" >
  <mat-form-field>
    <input matInput placeholder="Task Name" formControlName="projectName">
  </mat-form-field>

  <mat-form-field>
    <textarea matInput placeholder="Task Description" formControlName="description"></textarea>
  </mat-form-field>

  <mat-form-field>
  <input matInput placeholder="Task Created By" formControlName="profileName">
</mat-form-field>

  <mat-form-field>
    <input matInput [matDatepicker]="dp" placeholder="Date" formControlName="creationDate">
    <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
    <mat-datepicker #dp></mat-datepicker>
  </mat-form-field>

  <mat-form-field>  
  <input matInput placeholder="photoUrl" formControlName="photoUrl">
  </mat-form-field>

  <mat-form-field>
  <input matInput placeholder="GoogleUid" formControlName="projectUid">
  </mat-form-field>



  <div mat-dialog-actions>
  <button type="submit" class="btn btn-primary mr-2" (click)="save()">Save</button>
  <button type="reset" class="btn btn-outline-primary" (click)="cancel()">Cancel</button>
  </div>
  
  </form>`,
  styles: [`
  .example-container {
    width: 500px;
    max-width: 100%;
    flex-direction: column;
  }
 
`]





})
export class DialogOverviewExampleDialog {

  createProjectDetails: FormGroup;


  constructor(
    public fb: FormBuilder,
    public developmentservice: UserdataService, private db: AngularFirestore,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(this.data);
      const newItem = {

        creationDate: Date(),
        description: 'Angular Project',
        photoUrl:'afterauth.photoURL' ,
        profileName: 'merlin',
        projectName: 'React',
        projectUid:'afterauth.displayName',
         };
         this.db.doc<any>('projectList/' + 'publicProject').set(newItem);

      this.createProjectDetails = new FormGroup({

      });
  }

  save() {
    this.developmentservice.createProject(this.createProjectDetails.value);
    console.log(this.createProjectDetails.value);
    this.dialogRef.close();
}

cancel() {
  this.createProjectDetails = null;
  this.dialogRef.close();
}




  onNoClick(): void {
    this.dialogRef.close();
  }
  validDates = {
    "2018-11-22:00:00.0000": true
  }
  myFilter = (d: Date): boolean => {
    console.log(d);
    return this.validDates[d.toISOString()];
  }
}


/**  Copyright 2020 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */