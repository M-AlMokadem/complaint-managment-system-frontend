import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { publicService } from 'src/app/core/publicService.service';
import { createComplaintModel } from '../complaintModels/createComplaintModel';
import { IBuildingModel } from '../../_building/buildingsModels/buildingModel';
import { FloorModel } from '../../_floor/floorsModel/floorModel';
import { IssueModel } from '../../_issue/issueModels/issueModel';


@Component({
  selector: 'app-complaint-create',
  templateUrl: './complaint-create.component.html',
  styleUrls: ['./complaint-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ComplaintCreateComponent implements OnInit {
  allBuildings: IBuildingModel[];
  allFloors: FloorModel[];
  allIssues: IssueModel[];

  complaintObject: createComplaintModel = new createComplaintModel();
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  options: FormGroup;
  buildingControl = new FormControl('primary');
  floorControl = new FormControl('primary');
  issueControl = new FormControl('primary');
  fontSizeControl = new FormControl(16, Validators.min(10));


  constructor(
    private formBuilder: FormBuilder,
    private service: publicService
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      staffidCtrl: ['', Validators.required],
      buildingControl: ['', Validators.required],

    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
      issueControl: ['', Validators.required],
      descriptionCtrl: ['', Validators.required]
    });
    this.getAllBuildings();
    this.getAllFloors();
    this.getAllIssues();

  }
  addComplaint() {
    this.complaintObject.staffId = this.firstFormGroup.controls['staffidCtrl'].value;
    this.complaintObject.building = this.firstFormGroup.controls['buildingControl'].value;
    this.complaintObject.floor = this.firstFormGroup.controls['floorControl'].value;
    this.complaintObject.issue = this.secondFormGroup.controls['issueControl'].value;
    this.complaintObject.description = this.secondFormGroup.controls['descriptionCtrl'].value;

    console.log(this.complaintObject);
    this.service.post(this.complaintObject, 'floor', 'add').subscribe(
      res => {
        //Here we can use the response data
        //res.data.ticketNumber
      },
      error => {

      }
    );
  }

  getAllBuildings() {
    this.service.getAll('building').subscribe((data: IBuildingModel[]) => {
      this.allBuildings = data;
    });
  }
  getAllFloors() {
    this.service.getAll('floor').subscribe((data: FloorModel[]) => {
      this.allFloors = data;
    });
  }
  getAllIssues() {
    this.service.getAll('issue').subscribe((data: IssueModel[]) => {
      this.allIssues = data;
      console.log(this.allIssues);
    });
  }


}
