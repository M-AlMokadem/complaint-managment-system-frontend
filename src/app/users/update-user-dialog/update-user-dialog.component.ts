import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { userModel } from '../usersModels/userModel';
import { publicService } from 'src/app/core/publicService.service';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: '../update-user-dialog/update-user-dialog.component.html',
  styleUrls: ['../update-user-dialog/update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {
  userFormGroup: FormGroup;
  userObject: userModel = new userModel();

  constructor(public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private formBuilder: FormBuilder,
    private service: publicService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      emailAddressCtrl: [this.data.email, Validators.required],
      passwordCtrl: [this.data.password, Validators.required]
    });
  }

  updateUser() {
    this.userObject.email = this.userFormGroup.controls['emailAddressCtrl'].value;
    this.userObject.password = this.userFormGroup.controls['passwordCtrl'].value;
    this.userObject.id = this.data._id;
    debugger;
    this.service.put(this.userObject, 'user', 'update').subscribe(
      res => {
        // this.userObject.id = res.userId;
        this.dialogRef.close();
      },
      error => {
        debugger;
        var x = "error";
      }
    );
    // here call the (service) API to update the user
  }

  close() {
    this.dialogRef.close();
  }

}
