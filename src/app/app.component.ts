import { AfterViewInit, Component,OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService} from 'firebaseui-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(public afAuth: AngularFireAuth, public firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService) {
    this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
}

    ngAfterViewInit(): void {
      
  }
  successCallback(data: FirebaseUISignInSuccessWithAuthResult) {
    console.log('successCallback', data);

  }

  errorCallback(data: FirebaseUISignInFailure) {
    console.warn('errorCallback', data);
  }

  uiShownCallback() {
    console.log('UI shown');
  }
  
  logout() {
    this.afAuth.signOut();
  }
}