import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { ComplaintCreateComponent } from './_complaint/complaint-create/complaint-create.component';
import { IssueListComponent } from './_issue/issueModels/components/issue-list/issue-list.component';
import { ComplaintListComponent } from './_complaint/complaint-list/complaint-list/complaint-list.component';



const routes: Routes = [
  {path: 'login/login', component: LoginComponent},
  {path: 'complaint/create', component: ComplaintCreateComponent},
   {path: 'complaint/list', component: ComplaintListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
