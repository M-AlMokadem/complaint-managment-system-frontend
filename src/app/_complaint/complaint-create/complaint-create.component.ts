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
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  options: FormGroup;
  buildingControl = new FormControl('primary', Validators.required);
  floorControl = new FormControl('primary', Validators.required);
  issueControl = new FormControl('primary', Validators.required);
  fontSizeControl = new FormControl(16, Validators.min(10));

  // SelectedBuilding: any = -1;
  ticketNumber: number;

  constructor(
    private formBuilder: FormBuilder,
    private service: publicService
  ) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      staffidCtrl: ['', Validators.required],
      buildingControl: ['', Validators.required],
      floorControl: ['', Validators.required],

    });
    this.secondFormGroup = this.formBuilder.group({
      issueControl: ['', Validators.required],
      descriptionCtrl: ['', Validators.required]
    });
    this.getAllBuildings();
    this.getAllFloors();
    this.getAllIssues();

  }
  addComplaint() {
    console.log(this.firstFormGroup.controls['floorControl']);
    this.complaintObject.staffId = this.firstFormGroup.controls['staffidCtrl'].value;
    this.complaintObject.building = this.firstFormGroup.controls['buildingControl'].value;
    this.complaintObject.floor = this.firstFormGroup.controls['floorControl'].value;
    this.complaintObject.issue = this.secondFormGroup.controls['issueControl'].value;
    this.complaintObject.description = this.secondFormGroup.controls['descriptionCtrl'].value;

    console.log(this.complaintObject);
    // console.log('selected Building is -->', this.SelectedBuilding);
    this.service.post(this.complaintObject, 'complaint', 'add').subscribe(
      res => {
        //Here we can use the response data
        //res.data.ticketNumber
        // console.log(res.data.ticketNumber);
        // this.ticketNumber = res.data.ticketNumber;

      },
      error => {

      }
    );
  }

  getAllBuildings() {
    this.service.getAll('building').subscribe((data: IBuildingModel[]) => {
      this.allBuildings = data;
      // console.log(data);
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
    });
  }

  // doSomething(event) {
  //   debugger;
  //   console.log(event);
  // }


}
