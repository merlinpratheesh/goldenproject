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
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  @Output() projctsDetails = new EventEmitter;
  @Output() firstProject = new EventEmitter;


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
          console.log('61',val.public);
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
  filteredTasksOptions: Subscription;
  optionsTasks: string[] = [];
  optionsTasksNamesBk: string[] = [];
  optionsTasksBk: any[] = [];
  DisplayprojectDetails: Observable<projectDetails[]>;
  optionsTasksSub: Subscription;

  constructor(public developmentservice: UserdataService, private db: AngularFirestore) {

    this.optionsTasksSub = docData(this.db.firestore.doc('projectList/publicProject')).subscribe((readrec: any) => {
      this.optionsTasks = [];
      this.optionsTasksBk = readrec.public;
      console.log(this.optionsTasksBk);
      console.log(this.optionsTasksBk[0]);
      this.firstProject.emit({ firstProjectRef: this.optionsTasksBk[0] });
      
      readrec.public.forEach(element => {
        this.optionsTasks.push(element.projectName);
      });
      this.optionsTasksNamesBk= this.optionsTasks;
      console.log(this.optionsTasks);
    });
    this.filteredTasksOptions = this.emailFormControl.valueChanges.pipe(
      startWith(''),
      map((myvalue: string) => {
        console.log('96',myvalue);
        if (myvalue === '' || myvalue === null) {
          this.publicList = this.getPublicList(this.db.doc('projectList/publicProject'));
          this.optionsTasks= this.optionsTasksNamesBk;
        } else {          
          this.publicList = of(this.optionsTasksBk.filter(option => option.projectName.toLowerCase().indexOf(myvalue.toLowerCase()) === 0));
          this.optionsTasks = this._filter(myvalue);
          //return this.optionsTasksBk.filter(option => option.projectName.toLowerCase().indexOf(value) === 0);
        }
      }
      ))    .subscribe(
        some=>{

        }
      );

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsTasks.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  projectsDetails(some) {
    console.log('56', some);

    console.log('58', some.projectName);

    this.projctsDetails.emit({ 
      profileRef: some.projectUid, 
      keyref: some.projectName,
      creationDateRef:some.creationDate,
      descriptionRef:some.description,
      photoUrlRef:some.photoUrl,
      profileNameRef:some.profileName
     })
  }

  firstDefaultProject(some) {

    console.log('58', some.projectName);
    this.firstProject.emit({ firstProjectRef: some.this.optionsTasks[0] });
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.getPublicListSubscription?.unsubscribe();
  }


}