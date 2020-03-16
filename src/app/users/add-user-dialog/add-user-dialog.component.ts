import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { userModel } from '../usersModels/userModel';
import { publicService } from 'src/app/core/publicService.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: '../add-user-dialog/add-user-dialog.component.html',
  styleUrls: ['../add-user-dialog/add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  userFormGroup: FormGroup;
  userObject: userModel = new userModel();

  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private formBuilder: FormBuilder,
    private service: publicService
  ) { }

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      emailAddressCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required]
    });
  }

  addUser() {
    this.userObject.email = this.userFormGroup.controls['emailAddressCtrl'].value;
    this.userObject.password = this.userFormGroup.controls['passwordCtrl'].value;
    this.service.post(this.userObject, 'user', 'add').subscribe(
      res => {
        // this.userObject.id = res.userId;
        this.dialogRef.close();
      },
      error => {

      }
    );
  }

  close() {
    this.dialogRef.close();
  }


}
