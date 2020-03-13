import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ComplaintCreateComponent } from './_complaint/complaint-create/complaint-create.component';
import { AuthService } from './core/auth.service';
import { ComplaintListComponent } from './_complaint/complaint-list/complaint-list/complaint-list.component';
import { ComplainViewDialogComponent } from './_complaint/complain-view-dialog/complain-view-dialog.component';
import { ChangePasswordComponent } from './_password/change-password/change-password.component';



const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'password/change', component:  ChangePasswordComponent},
  {path: 'complaint/create', component: ComplaintCreateComponent, canActivate: [AuthService]},
  {path: 'complaint/list', component: ComplaintListComponent},
  {path: 'view', component: ComplainViewDialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
