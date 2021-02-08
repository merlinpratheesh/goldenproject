import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule , FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faPinterest } from '@fortawesome/free-brands-svg-icons/faPinterest';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ] ,  
  exports: [
    ReactiveFormsModule ,
    FormsModule,
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    FlexLayoutModule 
  ]
})
export class AppSharedModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faFacebookSquare,faTwitterSquare,faPinterest, faWhatsapp, faSignInAlt, faSignOutAlt  );
    }
  }