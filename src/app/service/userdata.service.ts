import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { map  } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface TestcaseInfo{
  heading: string;//Heading in testcase list
  subHeading:string;//Sub-Heading in testcase list
  description: string;//Description in testcase view
  linktoTest: string;//stackblitzLink in testcase edit/doubleclick
}

export interface projectVariables
{
    initialMainSection?:string;
    testcaseslength?:number;
    publicProjectHint?:string;
    publicProjectHome:Observable<string[]>;
    privateTaskMainEdit:Observable<string[]>;
    privateTaskSubEdit:Observable<string[]>;
    viewSelectedTestcase?:TestcaseInfo;
    testcaseInfodata?: Observable<TestcaseInfo[]>;
    modifiedKeysDb?:TestcaseInfo[];
    editProjectkeysSaved:MainSectionGroup[];
    lastSavedVisibility:boolean;
}
export interface MainSectionGroup {
  disabled: boolean;
  name: string;
  section: SubSection[];
}


export interface SubSection {
  viewvalue: string;
}
@Injectable({
  providedIn: 'root'
})


export class UserdataService {

  constructor(private db: AngularFirestore, ) { 


    
  }

  SimpleFieldsNM(){
    const data = {
      stringExample: 'Hello, World!',
      booleanExample: true,
      numberExample: 3.14159265,
      arrayExample: ['hello0', 'hello'],
      nullExample: null,
      objectExample: {
        ObjarrayExample: [5, true, 'hello'],
        projectName: 'Angular',
      }
    };
    
    const res = this.db.collection('testme').doc('one-id').set(data);
  }

}
