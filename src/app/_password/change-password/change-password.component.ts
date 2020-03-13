import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { publicService } from 'src/app/core/publicService.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(
    private _service: publicService,
    private _router: Router,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this._formBuilder.group({
      // passwordGroup: this._formBuilder.group({
        newPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-zA-Z])(?=.*[a-zA-Z])(?=.*[0-9]).{7,20}')]],
        confirmNewPassword:['', [Validators.required,Validators.pattern('(?=.*[a-zA-Z])(?=.*[a-zA-Z])(?=.*[0-9]).{7,20}')]]   
       // confirmNewPassword:['', [Validators.required,Validators.pattern('(?=.*[a-zA-Z])(?=.*[a-zA-Z])(?=.*[0-9]).{7,20}'), this.matchValues('password')]]
      // })
    });
  }
}
