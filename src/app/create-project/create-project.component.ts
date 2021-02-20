import { Component, Inject, Input, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { startWith, map, take, first } from 'rxjs/operators';
import { projectControls, UserdataService, userProfile, projectDetails } from '../service/userdata.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup } from '@angular/forms';
import firebase from 'firebase/app';
import { doc, docData } from 'rxfire/firestore';
import { of, combineLatest } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { NgAnalyzedFile } from '@angular/compiler';
import { AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService } from 'firebaseui-angular';



@Component({
  selector: 'app-create-project',

  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})

export class CreateProjectComponent implements OnInit, OnDestroy {

  @Input() profileinfoUid: any;
  @Input() privateList: Observable<projectDetails[]>;
  @Input() publicList: Observable<projectDetails[]>;

  myProjectDetails: projectDetails = {
    projectName: '',//Heading in testcase list
    description: '',//Sub-Heading in testcase list
    photoUrl: '',//Description in testcase view
    projectUid: '',//stackblitzLink in testcase edit/doubleclick
    creationDate: '',
    profileName: '',

  }
  myuserProfile: userProfile = {
    userAuthenObj: null,//Receive User obj after login success
  };

  dialogRef;
  myprivate: any;


  constructor(public fb: FormBuilder, public dialog: MatDialog, public afAuth: AngularFireAuth,
    public developmentservice: UserdataService, private db: AngularFirestore,) {




  }


  ngOnInit(): void {
  }
  ngOnDestroy() {

  }
  addNewOpenDialog(): void {


  }
  newArray = [];
  mydata;
  updatedProject: any[] = [];

  newTaskforUser() {

    this.dialogRef = this.dialog.open(AddNewProjectDialog, { data: { mydata: this.privateList, NewUid: this.profileinfoUid } });

    const createProject = this.dialogRef.afterClosed().pipe(map((values: any) => {

      const mydialog = values;

      this.developmentservice.createnewproject(mydialog, this.profileinfoUid.uid);
      return (null);
    })).subscribe((mydata: any) => {
      //console.log('105', mydata);
      //this.developmentservice.createnewproject(mydata,this.profileinfoUid.uid);
    });
    /*const mysub = combineLatest(this.publicList, this.privateList, this.dialogRef.afterClosed()).pipe(take(1), map((values: any) => {
      const [myprivate, mypublic, mydialog] = values;
      this. updatedPublicProject= myprivate;
            this. updatedPublicProject.push({
             projectName:mydialog.projectName,
             description:mydialog.description,
             photoUrl:mydialog.photoUrl,
             projectUid:mydialog.projectUid,
             profileName:mydialog.profileName,
             creationDate:mydialog.creationDate
            });
            this. updatedPrivateProject= mypublic;
            this. updatedPrivateProject.push({
             projectName:mydialog.projectName,
             description:mydialog.description,
             photoUrl:mydialog.photoUrl,
             projectUid:mydialog.projectUid,
             profileName:mydialog.profileName,
             creationDate:mydialog.creationDate
            });
            this.developmentservice.createnewproject(this.updatedPublicProject,this.updatedPrivateProject,this.profileinfoUid.uid);
      /*
            const updatedPublic={
              projectName:mydialog.projectName,
              description:mydialog.description,
              photoUrl:mydialog.photoUrl,
              projectUid:mydialog.projectUid,
              profileName:mydialog.profileName,
              creationDate:mydialog.creationDate
             }
             console.log(updatedPublic);
      
      return (null);
    })).subscribe((mydata: any) => {
      //console.log('105', mydata);

      
      //this.developmentservice.createnewproject(mydata,this.profileinfoUid.uid);

  
    });*/

    console.log('121', this.mydata);


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

    console.log(this.data.NewUid);



    this.names = new FormGroup({

      projectName: new FormControl(),
      description: new FormControl(),
      creationDate: new FormControl(firebase.firestore.Timestamp.fromDate(new Date())),
      profileName: new FormControl(this.data.NewUid.displayName),
      photoUrl: new FormControl(this.data.NewUid.photoURL),
      projectUid: new FormControl(this.data.NewUid.uid),

    });


  }

  save() {

    console.log(this.names.value);


    this.dialogRef.close(this.names.value);





  }

  closeDialog() {
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

