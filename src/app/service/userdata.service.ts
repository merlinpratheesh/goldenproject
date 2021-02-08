import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { collectionData, doc } from 'rxfire/firestore';
import { map  } from 'rxjs/operators';

export interface SubSection {
  viewvalue: string;
}

export interface MainSectionGroup {
  disabled: boolean;
  name: string;
  section: SubSection[];
}

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private db: AngularFirestore) { }
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
