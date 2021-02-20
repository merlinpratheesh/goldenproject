import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyTaskComponent } from './lazy-task.component';

const routes: Routes = [{ path: '', component: LazyTaskComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyTaskRoutingModule { }
