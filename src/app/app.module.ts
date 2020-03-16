import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './shared/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule, MatFormField, MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintCreateComponent } from './_complaint/complaint-create/complaint-create.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUserDialogComponent } from './users/add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from './users/update-user-dialog/update-user-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    ComplaintCreateComponent,
    UsersComponent,
    AddUserDialogComponent,
    UpdateUserDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    MatFormFieldModule,
    HttpClientModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddUserDialogComponent]
})
export class AppModule { }
