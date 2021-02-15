import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { projectControls, UserdataService, createProjectFields, userProfile } from '../service/userdata.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import firebase from 'firebase/app';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit, OnDestroy {

  @Input() profile: Observable<createProjectFields>;
  @Input() profileinfoUid: Observable<createProjectFields>;


  myuserProfile: userProfile = {
    userAuthenObj: null,//Receive User obj after login success
  };
  
  mycreateProjectFields: createProjectFields = {
    projectName: '',//Heading in testcase list
    description: '',//Sub-Heading in testcase list
    photoUrl: '',//Description in testcase view
    projectUid: '',//stackblitzLink in testcase edit/doubleclick
    creationDate: '',
    profileName: '',

  }



  constructor(public fb: FormBuilder, public dialog: MatDialog,
    public developmentservice: UserdataService, private db: AngularFirestore) {
      
  }


  editOpenDialog(mydata: createProjectFields, NewUid:userProfile): void {
    const dialogRef = this.dialog.open(EditProjectDialog, { data: { mydata: this.profile, NewUid: this.profileinfoUid} });
  }

  addNewOpenDialog(mydata: createProjectFields, NewUid:userProfile): void {
    const dialogRef = this.dialog.open(AddNewProjectDialog, { data: { mydata: this.profile, NewUid: this.profileinfoUid} });
  }



  ngOnInit(): void {
  }
  ngOnDestroy() {

  }
}
@Component({
  selector: 'EditProjectDialog',
  template: `
  <h2 class="py-4" style="color: black; width:500px;" >EDIT PROJECT DETAILS</h2>
    <form  fxLayout="column" [formGroup]="names">
      <mat-form-field>
        <input matInput placeholder="Task Name" formControlName="projectName" />
      </mat-form-field>

      <mat-form-field>
        <textarea
          matInput
          placeholder="Task Description"
          formControlName="description"
        ></textarea>
      </mat-form-field>


      <mat-form-field>
        <input
          matInput
          [matDatepicker]="dp"
          placeholder="Date"
          formControlName="creationDate"
        />
        <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
        <mat-datepicker #dp></mat-datepicker>
      </mat-form-field>
      
      <mat-form-field>
        <input
          matInput
          placeholder="Task Created By"
          formControlName="profileName"
        />
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="photoUrl" formControlName="photoUrl" />
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="GoogleUid" formControlName="projectUid" />
      </mat-form-field>
      <div class="form-group row">
        <div class="col-sm-4 offset-sm-2">
          <button type="submit" class="btn btn-primary mr-2" (click)="save()">Save</button>
          <button type="reset" class="btn btn-outline-primary" (click)="cancel()">Cancel</button>
        </div>
      </div>
    </form>


    
  `
})
export class EditProjectDialog {

  names: FormGroup;

  constructor(public developmentservice: UserdataService, private db: AngularFirestore,
    public dialogRef: MatDialogRef<EditProjectDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);

    console.log(this.data.NewUid.photoUrl);
    console.log(this.data.NewUid.projectUid);



    this.names = new FormGroup({

      projectName: new FormControl(this.data.mydata.value.projectName),
      description: new FormControl(this.data.mydata.value.description),
      creationDate: new FormControl(this.data.mydata.value.creationDate),
      profileName: new FormControl(this.data.NewUid.displayName),
      photoUrl: new FormControl(this.data.NewUid.photoURL),
      projectUid: new FormControl(this.data.NewUid.uid),

    });

  }


  save() {


    this.developmentservice.updateTask(this.names.value , this.data.NewUid.uid);
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

@Component({
  selector: 'AddNewProjectDialog',
  template: `
  <h2 class="py-4" style="color: black; width:500px;" >EDIT PROJECT DETAILS</h2>
    <form  fxLayout="column" [formGroup]="names">
      <mat-form-field>
        <input matInput placeholder="Task Name" formControlName="projectName" />
      </mat-form-field>

      <mat-form-field>
        <textarea
          matInput
          placeholder="Task Description"
          formControlName="description"
        ></textarea>
      </mat-form-field>


      <mat-form-field>
        <input
          matInput
          [matDatepicker]="dp"
          placeholder="Date"
          formControlName="creationDate"
        />
        <mat-datepicker-toggle matSuffix [for]="dp"></mat-datepicker-toggle>
        <mat-datepicker #dp></mat-datepicker>
      </mat-form-field>
      
      <mat-form-field>
        <input
          matInput
          placeholder="Task Created By"
          formControlName="profileName"
        />
      </mat-form-field>
      <mat-form-field>
        <input matInput placeholder="photoUrl" formControlName="photoUrl" />
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="GoogleUid" formControlName="projectUid" />
      </mat-form-field>
      <div class="form-group row">
        <div class="col-sm-4 offset-sm-2">
          <button type="submit" class="btn btn-primary mr-2" (click)="save()">Save</button>
          <button type="reset" class="btn btn-outline-primary" (click)="cancel()">Cancel</button>
        </div>
      </div>
    </form>


    
  `
})
export class AddNewProjectDialog {

  names: FormGroup;
  createProjectFields: any;

  constructor(public developmentservice: UserdataService, private db: AngularFirestore,
    public dialogRef: MatDialogRef<AddNewProjectDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(this.data);

    console.log(this.data.NewUid.photoUrl);
    console.log(this.data.NewUid.projectUid);



    this.names = new FormGroup({

      projectName: new FormControl(),
      description: new FormControl(),
      creationDate: new FormControl(),
      profileName: new FormControl(this.data.NewUid.displayName),
      photoUrl: new FormControl(this.data.NewUid.photoURL),
      projectUid: new FormControl(this.data.NewUid.uid),

    });


  }

  save() {

    console.log(this.names.value.projectName);


    this.db.doc<any>('/privateProject/'+this.data.NewUid.uid+'/private/'+this.names.value.projectName).set(this.names.value);


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
