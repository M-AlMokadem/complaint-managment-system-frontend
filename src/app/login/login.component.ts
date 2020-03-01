import { Component, OnInit,OnDestroy } from '@angular/core';
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
    private _messagePopup: MatSnackBar,
    private _authservice: AuthService,

    private _router: Router,
    private userIdle: UserIdleService
  ) {
    this.loginModel = new LoginModel();
    this.loader = false;
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  ngOnInit() {
    this.loginForm = new FormGroup({
      ntAccount: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });


    if (localStorage.getItem('isNetworkStopped') === 'yes' ||localStorage.getItem('windowCloseSuddenly') === 'yes' )
    {
       this._authservice.logout();

    }
    

    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => {
   
      this._authservice.logout();
    });

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(res => {   
      if (res) {
        this._authservice.logout();
      }
    });
  }
  login() {
    this.loader = true;
    this._authservice.login(this.loginModel).subscribe(
      (res: any) => {
        this.loader = false;
        localStorage.setItem('Token', res.Tokken);
        localStorage.setItem('UserName', res.UserName);
        localStorage.setItem('Role', res.Role);
        localStorage.setItem('LoginUser', JSON.stringify(this.loginModel));
        let role: string = res.Role;
        debugger;
        switch (role.toLowerCase()) {
          case 'admin':
            this._router.navigate(['/admin']);
            break;
          case 'agent':
            this._router.navigate(['/agent']);
            break;
          default:
            break;
        }
      },

      (error: any) => {
        this.loader = false;
        debugger;
        if (error.error == 'User Already Logged In') {
          this.loginErrorMSG = error.error;
        } else if (error.error == 'Invalid NT Account or password') {
          this.loginErrorMSG = 'Invalid NT Account or password';
        } else {
          this.loginErrorMSG =
            'Server error when trying to connect to backend sever, please refresh page. If issue presists; please contact IT Service Desk.';
        }
      }
    );
  }
}
