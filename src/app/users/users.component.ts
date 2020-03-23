import { Component, OnInit, ViewChild } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { userModel } from '../users/usersModels/userModel';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private service: publicService, private matDialog: MatDialog) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = ['emailAddress', 'password', 'actions'];
  UsersList: userModel[] = [];
  dataSource = new MatTableDataSource<userModel>(this.UsersList);

  ngOnInit(): void {
    this.getAllusers();
  }

  getAllusers() {
    this.dataSource = new MatTableDataSource<userModel>();
    this.service.getAll('user').subscribe((data: userModel[]) => {
      this.fillResult(data);
    }, error => {
      console.error('There was an error!', error);
    });
  }

  private fillResult(res: Object) {
    this.dataSource = new MatTableDataSource(res as userModel[]);
    this.dataSource.paginator = this.paginator;
  }
  openAddDialog() {
    this.matDialog.open(AddUserDialogComponent, {
      height: '393px',
      width: '811px',
    });
  }
  openEditDialog(user) {
    const EditDialogConfig = new MatDialogConfig();
    EditDialogConfig.data = user;
    EditDialogConfig.width = '811px';
    EditDialogConfig.height = '393px';
    this.matDialog.open(UpdateUserDialogComponent, EditDialogConfig);
  deleteUser(user) {
    debugger;
    this.service.delete(user, 'user', 'delete').subscribe(
      res => {
        this.getAllusers();
      },
      error => {
      }
    );
  }

}
