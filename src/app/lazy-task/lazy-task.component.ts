import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserdataService } from '../service/userdata.service';

@Component({
  selector: 'app-lazy-task',
  templateUrl: './lazy-task.component.html',
  styleUrls: ['./lazy-task.component.scss']
})
export class LazyTaskComponent implements OnInit {




  constructor(private db: AngularFirestore,     public developmentservice: UserdataService,
    ) { 
    
    

  }
  

  ngOnInit(): void {
  }

}
