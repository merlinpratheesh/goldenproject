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
  selector: 'app-private-project',

  templateUrl: './private-project.component.html',
  styleUrls: ['./private-project.component.scss']
})
export class PrivateProjectComponent implements AfterViewInit {
  @Input() profileinfoUid: firebase.User;
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

  privateList: any;
  localprivateList = [];
  getprivateListSubscription: Subscription;
  getprivateListBehaviourSub = new BehaviorSubject(null);
  getPrivateList = (privateProjects: AngularFirestoreDocument<any>) => {
    if (this.getprivateListSubscription !== undefined) {
      this.getprivateListSubscription.unsubscribe();
    }

    this.getprivateListSubscription = privateProjects.valueChanges().subscribe((val: any) => {
      console.log('61',val);

      if (val === undefined) {
        this.getprivateListBehaviourSub.next(undefined);
      } else {

        if (val.private.length === 0) {
          this.getprivateListBehaviourSub.next(null);
        } else {
          this.localprivateList = val.private;
          console.log('61',val.private);
          this.getprivateListBehaviourSub.next(val.private);
        }
      }
    });
    return this.getprivateListBehaviourSub;
  };
  matcher = new MyErrorStateMatcher();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  filteredTasksOptions: Subscription;
  optionsTasks: string[] = [];
  optionsTasksNamesBk: string[] = [];
  optionsTasksBk: any[] = [];
  DisplayprojectDetails: Observable<projectDetails[]>;
  myprojectDetails: any;
  optionsTasksSub: Subscription;

  constructor(public developmentservice: UserdataService, private db: AngularFirestore) {
    
  }

ngAfterViewInit(){

  console.log(this.profileinfoUid);
  this.optionsTasksSub = docData(this.db.firestore.doc('projectList/'+this.profileinfoUid.uid)).subscribe((readrec: any) => {
    this.optionsTasks = [];
    this.optionsTasksBk = readrec.private;
    console.log(this.optionsTasksBk);
    console.log(this.optionsTasksBk[0]);
    
    readrec.private.forEach(element => {
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
          console.log(this.profileinfoUid.uid);

          this.privateList = this.getPrivateList(this.db.doc('projectList/'+this.profileinfoUid.uid));

          this.optionsTasks= this.optionsTasksNamesBk;
        } else {          
          this.privateList = of(this.optionsTasksBk.filter(option => option.projectName.toLowerCase().indexOf(myvalue.toLowerCase()) === 0));
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

    this.projctsDetails.emit({ profileRef: some.projectUid, keyref: some.projectName })

    console.log('130', some.projectName);

  }

  firstDefaultProject(some) {

    console.log('58', some.projectName);
    this.firstProject.emit({ firstProjectRef: some.this.optionsTasks[0] });
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.getprivateListSubscription?.unsubscribe();
  }


}