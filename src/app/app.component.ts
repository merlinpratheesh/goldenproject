import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {of ,Observable, Subscription, BehaviorSubject} from 'rxjs';
import {projectDetails} from './service/userdata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'goldenproject';
  constructor( ) 
{

}
}
