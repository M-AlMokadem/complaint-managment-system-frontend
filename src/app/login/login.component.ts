import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModel } from './models/login.Model';
import { Router } from '@angular/router';
import { publicService } from '../core/publicService.service';
import { AuthService } from '../core/auth.service';
import { UserIdleService } from 'angular-user-idle';

import {
  MatSnackBar,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatChipInputEvent
} from '@angular/material';
import { P } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  loginModel: LoginModel;
  loginErrorMSG: string = '';
  loader: boolean;
  constructor(
    private _service: publicService,
    private _authservice: AuthService,
    private _router: Router,

  ) {
    this.loginModel = new LoginModel();
    this.loader = false;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.loader = true;
    this._authservice.login(this.loginModel).subscribe(
      (res: any) => {
        this.loader = false;
        localStorage.setItem('Token', res.Tokken);
        localStorage.setItem('LoginUser', JSON.stringify(this.loginModel));
        console.log('logged in with token ==> ', res.token);
        this._router.navigate(['/complaint/create']);
      },
      (error: any) => {
        this.loader = false;
        console.log(error);
        if (error.error.text == 'User Already Logged In') {
          this.loginErrorMSG = error.text;
        } else if (error.error.text == 'Invalid Email or password') {
          this.loginErrorMSG = 'Login failed ! Invalid email or password';
        } else {
          this.loginErrorMSG =
            'Server error when trying to connect to backend sever, please refresh page. If issue presists; please contact IT Service Desk.';
        }
      });
  }

}
