import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ComplaintCreateComponent } from './_complaint/complaint-create/complaint-create.component';
import { AuthService } from './core/auth.service';



const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'complaint/create', component: ComplaintCreateComponent,
    canActivate: [AuthService]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
