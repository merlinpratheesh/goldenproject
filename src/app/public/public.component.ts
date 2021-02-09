import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { map, switchMap, startWith, withLatestFrom } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { projectDetails, UserdataService } from '../service/userdata.service';
import { docData } from 'rxfire/firestore';
import { ErrorStateMatcher } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  myProjectDetails: projectDetails = {
    projectName: '',//Heading in testcase list
    description: '',//Sub-Heading in testcase list
    photoUrl: '',//Description in testcase view
    projectUid: '',//stackblitzLink in testcase edit/doubleclick
    creationDate: '',
    profileName: '',

  }

  publicList: any;
  localpublicList = [];
  getPublicListSubscription: Subscription;
  getPublicListBehaviourSub = new BehaviorSubject(undefined);
  getPublicList = (publicProjects: AngularFirestoreDocument<any>) => {
    if (this.getPublicListSubscription !== undefined) {
      this.getPublicListSubscription.unsubscribe();
    }
    this.getPublicListSubscription = publicProjects.valueChanges().subscribe((val: any) => {
      if (val === undefined) {
        this.getPublicListBehaviourSub.next(undefined);
      } else {
        if (val.public.length === 0) {
          this.getPublicListBehaviourSub.next(null);
        } else {
          this.localpublicList = val.public;
          console.log(val.public);
          this.getPublicListBehaviourSub.next(val.public);
        }
      }
    });
    return this.getPublicListBehaviourSub;
  };
  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  publicProjectList: any;
  filteredTasksOptions: Observable<any[]>;
  optionsTasks: string[] = [];
  optionsTasksBk: any[] = [];
  DisplayprojectDetails: Observable<projectDetails[]>;
  myprojectDetails: any;
  optionsTasksSub: Subscription;

  constructor(public developmentservice: UserdataService, private db: AngularFirestore) {

    this.optionsTasksSub = docData(this.db.firestore.doc('projectList/publicProject')).subscribe((readrec: any) => {
      this.optionsTasks = [];
      this.optionsTasksBk = readrec.public;
      readrec.public.forEach(element => {
        this.optionsTasks.push(element.projectName);
      });
      console.log(this.optionsTasks);

      this.filteredTasksOptions = this.emailFormControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          console.log(value);
          if (value === '' || value === null) {
            this.publicList = this.getPublicList(this.db.doc('projectList/publicProject'));
            this.optionsTasks = [];
            this.optionsTasksBk.forEach(element => {
              this.optionsTasks.push(element.projectName);
            });
            return readrec.public;
          } else {
            console.log('75', value);
            console.log(this.optionsTasksBk.filter(option => option.projectName.toLowerCase().indexOf(value.toLowerCase()) === 0));
            this.publicList = of(this.optionsTasksBk.filter(option => option.projectName.toLowerCase().indexOf(value.toLowerCase()) === 0));
            this.optionsTasks = this._filter(value);
            return this.optionsTasksBk.filter(option => option.projectName.toLowerCase().indexOf(value) === 0);
          }
        }
        ));
    });

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsTasks.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }



  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.getPublicListSubscription?.unsubscribe();
  }


}