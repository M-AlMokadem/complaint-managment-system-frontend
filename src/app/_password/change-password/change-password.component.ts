import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { publicService } from 'src/app/core/publicService.service';
import { AuthService } from 'src/app/core/auth.service';

export class PasswordModel{
  password: string;
  userId :string;
}

export function ComparePassword(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if(control.value == matchingControl.value){
      return matchingControl.setErrors(null);
    }

    return matchingControl.setErrors({ mustMatch: true });   
  };
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  hide:boolean = true;
  hidePassword:boolean = true;

  constructor(
    private _service: publicService,
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this._formBuilder.group({
        password: ['', [Validators.required,Validators.pattern('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{7,}')]],
        confirmPassword: ['', [Validators.required]]
    }, {validator: ComparePassword("password", "confirmPassword")});
  }

  changePassword() {
  // let passwordModel: PasswordModel = new PasswordModel();
  // passwordModel.userId = this.getUserId();
  // passwordModel.password = this.resetPasswordForm.controls["password"].value;

  // this._service.put(passwordModel,'','update').subscribe(res=>{
  //   console.log(res);
  // }, error=>{
  //   console.log(error);
  // });

  }

  private getUserId()
  {
    let token = this._authService.decode();
    return token.id;
  }
  
}
