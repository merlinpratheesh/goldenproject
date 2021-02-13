import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { projectControls, UserdataService, createProjectFields } from '../service/userdata.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {

  @Input() profile: Observable<createProjectFields>;

  mycreateProjectFields: createProjectFields = {
    projectName: 'merlin',//Heading in testcase list
    description: '',//Sub-Heading in testcase list
    photoUrl: '',//Description in testcase view
    projectUid: '',//stackblitzLink in testcase edit/doubleclick
    creationDate: '',
    profileName: '',

  }



  constructor(public fb: FormBuilder, public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet, public developmentservice: UserdataService, private db: AngularFirestore) {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, { data: { mydata: this.mycreateProjectFields}})
  }



ngOnInit(): void {
}
ngOnDestroy() {

}
}
@Component({
  selector: 'DialogOverviewExampleDialog',
  template: `

    <h2 class="py-4">Edit Car</h2>
    <form [formGroup]="names">
      <div class="form-group row">
        <label for="brand" class="col-sm-2 col-form-label">projectName</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="brand" formControlName="projectName">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">description</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="model" formControlName="description">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">photoUrl</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="year" formControlName="photoUrl">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">projectUid</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="year" formControlName="projectUid">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">creationDate</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="year" formControlName="creationDate">
        </div>
      </div>
      <div class="form-group row">
        <label for="model" class="col-sm-2 col-form-label">profileName</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" id="year" formControlName="profileName">
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
export class DialogOverviewExampleDialog {

  names: FormGroup;

  constructor(public developmentservice: UserdataService, private db: AngularFirestore, 
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);
    //console.log(this.data.names[0]);

    this.names = new FormGroup({

      projectName: new FormControl(this.data.projectName),
      description: new FormControl(this.data.description),
      photoUrl: new FormControl(this.data.photoUrl),
      projectUid: new FormControl(this.data.projectUid),
      creationDate: new FormControl(this.data.creationDate),
      profileName: new FormControl(this.data.profileName)

    });
    console.log(this.data.projectName);

  }


  save() {

    console.log(this.names.get('profileName').value);

    const newItem = {
      projectName: this.names.get('projectName').value,
      description: this.names.get('description').value,
      photoUrl: this.names.get('photoUrl').value,
      projectUid: this.names.get('projectUid').value,
      creationDate: this.names.get('creationDate').value,
      profileName: this.names.get('profileName').value

    };

    this.developmentservice.updateTask(this.names.value);
    this.dialogRef.close();


  }

  cancel() {
    this.names = null;
    this.dialogRef.close();

  }
  openLink(event: MouseEvent): void {
    this.dialogRef.close();
    event.preventDefault();
  }
}
