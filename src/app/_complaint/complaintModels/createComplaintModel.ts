import { IBuildingModel } from 'src/app/_building/buildingsModels/buildingModel';
import { FloorModel } from 'src/app/_floor/floorsModel/floorModel';
import { IssueModel } from 'src/app/_issue/issueModels/issueModel';

export class createComplaintModel {
    id: string;
    staffId: string;
    building: {
        _id: string;
        name: string;
    };
    floor: {
        _id: string;
        name: string;
    };
    issue: {
        _id: string;
        name: string;
    };
    description: string;
    status: string;
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

