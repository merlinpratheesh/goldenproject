import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

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


  constructor() {
    this.isOnline$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(map(() => navigator.onLine));
   }
}
