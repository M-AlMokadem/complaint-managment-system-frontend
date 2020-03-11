import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { ComplaintCreateComponent } from './_complaint/complaint-create/complaint-create.component';
import { ComplaintListComponent } from './_complaint/complaint-list/complaint-list/complaint-list.component';
import { ComplainViewDialogComponent } from './_complaint/complain-view-dialog/complain-view-dialog.component';



const routes: Routes = [
  {path: 'login/login', component: LoginComponent},
  {path: 'complaint/create', component: ComplaintCreateComponent},
  {path: 'complaint/list', component: ComplaintListComponent},
  {path: 'view', component: ComplainViewDialogComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
