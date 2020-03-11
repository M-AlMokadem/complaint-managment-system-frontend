import { IBuildingModel } from 'src/app/_building/buildingsModels/buildingModel';
import { FloorModel } from 'src/app/_floor/floorsModel/floorModel';
import { IssueModel } from 'src/app/_issue/issueModels/issueModel';

export class createComplaintModel {
    staffId: string;
    building: number;
    floor: number;
    issue: number;
    description: string;
}

export class ComplaintModel {
    id: number;
    staffId: string;
    building: IBuildingModel;
    floor: FloorModel
    status : string;
    description:string;
    issue : IssueModel; 
    createdOn :Date;
}

