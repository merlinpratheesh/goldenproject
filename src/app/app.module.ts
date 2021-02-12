import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppSharedModule } from './app-shared/app-shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent,DialogOverviewExampleDialog } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    AppSharedModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  entryComponents: [AppComponent, DialogOverviewExampleDialog],

  bootstrap: [AppComponent]
})
export class AppModule { }
