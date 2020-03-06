import { Component, OnInit, ViewChild } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { MatTableDataSource, MatPaginator, MatSortModule, MatSort, Sort } from '@angular/material';
import { ComplaintModel } from '../../complaintModels/createComplaintModel';
import { IBuildingModel } from 'src/app/_building/buildingsModels/buildingModel';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ['id', 'date', 'location', 'type', 'status', 'actions'];
  statusList: string[] = ['Pending', 'Active', 'In Progress', 'Closed'];
  sortList: string[] = ['Status', 'Location'];

  complaintList: ComplaintModel[] = [];
  dataSource = new MatTableDataSource<ComplaintModel>(this.complaintList);
  allBuildings: IBuildingModel[];
  searchText: string;
  selectedColumn = 'id';

  constructor(
    private service: publicService) {
  }

  ngOnInit(): void {
    this.getAllComplaints();
    this.getAllBuildings();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  changeSortedColumn(column:string) {
    const sortState: Sort = { active: column, direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  getAllComplaints() {
    this.dataSource = new MatTableDataSource<ComplaintModel>();
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

  private fillResult(res: Object) {
    this.dataSource = new MatTableDataSource(res as ComplaintModel[]);
    this.dataSource.paginator = this.paginator;   
    // this.dataSource.sortingDataAccessor = (item, property) => {
    //   switch(property) {
    //     case 'location': return item.building.Name;
    //     default: return item[property];
    //   }
    // };
    this.dataSource.sort = this.sort;
  }

  // this.dataSource.filterPredicate = function(data, filter: string): boolean {
  //   return  data.issue.name.toLowerCase().includes(filter) 
  //    ||data.building.Name.toLowerCase().includes(filter) || data.floor.Name.toLowerCase().includes(filter) 
  //    || data.building.Name.toString() === filter;
  // };

}
