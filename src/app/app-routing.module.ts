import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';

const routes: Routes = [
  {path: '', redirectTo: '/first-component', pathMatch: 'full'},
  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: 'mytask', loadChildren: () => import('./lazy-task/lazy-task.module').then(m => m.LazyTaskModule) }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
