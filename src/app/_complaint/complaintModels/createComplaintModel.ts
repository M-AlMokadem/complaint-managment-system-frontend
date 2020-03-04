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
