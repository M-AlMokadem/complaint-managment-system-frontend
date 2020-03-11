import { Component, OnInit, ViewChild } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { MatTableDataSource, MatPaginator, MatSortModule, MatSort, Sort, MatDialog, MatDialogConfig } from '@angular/material';
import { ComplaintModel } from '../../complaintModels/createComplaintModel';
import { IBuildingModel } from 'src/app/_building/buildingsModels/buildingModel';
import { ComplainViewDialogComponent } from '../../complain-view-dialog/complain-view-dialog.component';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ['none', 'id', 'date', 'location', 'type', 'status', 'actions'];
  statusList: string[] = ['Pending', 'Active', 'In Progress', 'Closed'];
  sortListBy: string[] = ['id', 'status', 'location'];

  complaintList: ComplaintModel[] = [];
  dataSource: MatTableDataSource<ComplaintModel>;
  allBuildings: IBuildingModel[];
  searchText: string;
  selectedColumn = 'id';

  constructor(
    private service: publicService,
    private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<ComplaintModel>();
  }

  ngOnInit(): void {
    this.getAllComplaints();
    this.getAllBuildings();

    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  applyFilter(filterValue: string) {
    if (filterValue == "0")
      this.dataSource.filter = "";

    else {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches

      this.dataSource.filter = filterValue;
    }
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  changeSortedColumn(column: string) {
    const sortState: Sort = { active: column, direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  getAllComplaints() {
    this.service.getAll('complaint').subscribe((data: ComplaintModel[]) => {
      this.fillResult(data);
    }, error => {
      console.error('There was an error!', error);
    });
  }

  getAllBuildings() {
    this.service.getAll('building').subscribe((data: IBuildingModel[]) => {
      this.allBuildings = data;
    }, error => {
      console.error('There was an error!', error);
    });
  }

  openComplaintDialog(complaintModel: ComplaintModel) {
    const dialogConfig = new MatDialogConfig();

    let complainModel: ComplaintModel;
    dialogConfig.data = complaintModel;
    this.dialog.open(ComplainViewDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(ComplainViewDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: ComplaintModel) => {
        console.log("Dialog output:", data.id);
        complainModel = data;
      });

    this.service.post(complainModel, 'complaint', 'put').subscribe(res =>
      console.log(res));
    this.getAllComplaints();
  }

  private fillResult(res: Object) {
    this.dataSource.data = res as ComplaintModel[];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
