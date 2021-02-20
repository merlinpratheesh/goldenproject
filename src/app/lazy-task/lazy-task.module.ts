import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyTaskRoutingModule } from './lazy-task-routing.module';
import { LazyTaskComponent } from './lazy-task.component';


@NgModule({
  declarations: [LazyTaskComponent],
  imports: [
    CommonModule,
    LazyTaskRoutingModule
  ]
})
export class LazyTaskModule { }
