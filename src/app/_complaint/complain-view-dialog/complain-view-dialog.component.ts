import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComplaintModel } from '../complaintModels/createComplaintModel';
import { publicService } from 'src/app/core/publicService.service';

@Component({
  selector: 'app-complain-view-dialog',
  templateUrl: './complain-view-dialog.component.html',
  styleUrls: ['./complain-view-dialog.component.css']
})
export class ComplainViewDialogComponent implements OnInit {
  statusList: string[] = ['Pending', 'Active', 'In Progress', 'Closed'];
  complaintModel: ComplaintModel;

  constructor(
    private service: publicService,
    public dialogRef: MatDialogRef<ComplainViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.complaintModel = data;
  }

  ngOnInit(): void {
  }

  // save() {
  //   this.dialogRef.close(this.complaintModel);
  // }

  close() {
    this.dialogRef.close(this.complaintModel);
  }

}
