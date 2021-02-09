import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { map  } from 'rxjs/operators';

export interface userProfile {
  userAuthenObj: firebase.User
}
export interface projectDetails{
  projectName: string;//Heading in testcase list
  description:string;//Sub-Heading in testcase list
  photoUrl: string;//Description in testcase view
  projectUid: string;//stackblitzLink in testcase edit/doubleclick
  creationDate:string;
  profileName:string;
}
export interface SubSection {
  viewvalue: string;
}

export interface MainSectionGroup {
  disabled: boolean;
  name: string;
  section: SubSection[];
}
export interface usrinfoDetails {
  profileName: string,
  email: string,
  gender:string,
  areaOfinterest:string,
  skills: string,
  location:string,
  membershipEnd: string,
  membershipType: string,
  projectLocation: string,
  photoUrl: string,
}
export interface projectDetails{
  projectName: string;//Heading in testcase list
  description:string;//Sub-Heading in testcase list
  photoUrl: string;//Description in testcase view
  projectUid: string;//stackblitzLink in testcase edit/doubleclick
  creationDate:string;
  profileName:string;
}
@Injectable({
  providedIn: 'root'
})

export class UserdataService {

  isOnline$!: Observable<boolean>;


  constructor(private db: AngularFirestore) {
    this.isOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine));
   }
  async createnewprofileDetails(uid:string, newprojectinfo: any) : Promise<void>{
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.firestore.doc('Profile/' + uid).set(newprojectinfo,{merge: true}),
      ]);
      return promise;
    });
  }
  async createnewproject(uid:string, projectname: string, newprojectinfo: any, MainSection:any) : Promise<void>{
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.firestore.doc('myProfile/' + uid).set(newprojectinfo,{merge: true}),
        this.db.firestore.doc('projectList/' + uid).set({ownerRecord: firebase.firestore.FieldValue.arrayUnion(projectname)},{merge: true}),
        this.db.firestore.doc('publicProjectKeys/' + projectname).set({MainSection},  {merge: false}) ,
        this.db.firestore.doc('projectList/' + 'publicProjects/').set({public: firebase.firestore.FieldValue.arrayUnion(projectname)},{merge: true})
      ]);
      return promise;
    });
  }
  async createDefKeys(projectname: string,MainSection:any) : Promise<void>{
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([      
        this.db.firestore.doc('publicProjectKeys/' + projectname).set({MainSection},  {merge: false}) ,
        this.db.firestore.doc(projectname+ '/MainSection/items/SubSection').delete()
      ]);
      return promise;
    });
  }
  async deleteproject(uid:string,oldprojectName:string, newprojectinfo: any) : Promise<void>{
    console.log('oldprojectName',oldprojectName);
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.firestore.doc('projectList/' + uid).update({ownerRecord: firebase.firestore.FieldValue.arrayRemove(oldprojectName)}),
        this.db.firestore.doc('projectList/' + 'publicProjects').update({public: firebase.firestore.FieldValue.arrayRemove(oldprojectName)}),
        this.db.firestore.doc('myProfile/' + uid).set(newprojectinfo,{merge: true}),
        this.db.firestore.doc('publicProjectKeys/' + oldprojectName).delete()
      ]);
      return promise;
    });
  }  
  async deleteMainSection(ProjectName: string, MainSection: any) : Promise<void>{    
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.doc('publicProjectKeys/' + ProjectName).set({MainSection },  {merge: false} )
    ]);
    return promise;
  });
  }
  async addMainSection(ProjectName: string,  MainSection: any) : Promise<void>{    
    await this.db.firestore.runTransaction(() => {
      console.log('reached',ProjectName);
      const promise = Promise.all([
        this.db.doc('/publicProjectKeys/' + ProjectName ).set({MainSection },  {merge: false} )
    ]);
    return promise;
  });
  }  
  async updatevisibility(ProjectName: string,MainSection: any) : Promise<void>{
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.doc('publicProjectKeys/' + ProjectName).set({MainSection},  {merge: false})
    ]);
    return promise;
  });}
  async addSubSection(ProjectName: string,MainSectionName:string, SubSectionName: string,MainSection: any) : Promise<void>{
    console.log('195',ProjectName);
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.doc('publicProjectKeys/' + ProjectName).set({MainSection},  {merge: false}),
        this.db.doc(ProjectName + '/' + MainSectionName + '/items/' + SubSectionName ).delete()  
    ]);
    return promise;
  });}
  async deleteSubSection(ProjectName: string, MainSectionName: string, SubSectionName: string, MainSection: any) : Promise<void>{
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.doc( ProjectName + '/' + MainSectionName + '/items/' + SubSectionName + '/').delete(),
        this.db.doc('publicProjectKeys/' + ProjectName).set({MainSection},  {merge: false})        
      ]);
      return promise;
    });
  }
  async updateSubSection(ProjectName: string, MainSectionName: string, SubSectionName: string, MainSection: any) : Promise<void>{
    await this.db.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.db.doc( ProjectName + '/' + MainSectionName + '/items/' + SubSectionName + '/').delete(),
        this.db.doc('publicProjectKeys/' + ProjectName).set({MainSection}),
      ]);
      return promise;
    });
  }
  async UpdateMainSection(ProjectName: string,  MainSection: any) : Promise<void>{    
    await this.db.firestore.runTransaction(() => {
      console.log('reached',ProjectName);
      const promise = Promise.all([
        this.db.doc('/publicProjectKeys/' + ProjectName ).set({MainSection },  {merge: false} )
    ]);
    return promise;
  });
  } 
}
