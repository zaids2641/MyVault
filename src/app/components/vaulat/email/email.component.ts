import { Component, Output, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from 'src/app/shared/services/service.service';
import { DialogComponent } from '../../dialog/newdatadialog/dialog.component';
import { VieweditdialogComponent } from '../../dialog/vieweditdialog/vieweditdialog.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class EmailComponent implements OnInit {
  private querySubscription: any;
  dataSource!: MatTableDataSource<any>;
  dataLoading: boolean = false;
  errorMessage: any;
  error!: boolean;
  savedChanges!: boolean;
  searchFormData: any;
  docPath: any;
  data: any;
  filters: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Output() type: any;

  displayedColumns = [
    'provider',
    'email',
    'reg_number',
    'auth',
    'recovery_mode',
    '_id',
  ];

  constructor(public dialog: MatDialog, private _services: ServiceService) {}

  openDialog(_type: any) {
    this.dialog.open(DialogComponent, {
      data: this.type,
      // width: '50%',
      // height: '80%',
    });
  }

  openViewEditDialog(docId: any, type: any) {
    this.dialog.open(VieweditdialogComponent, {
      data: { docId: docId, type: type },
      // width: '50%',
      // height: '80%',
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getFilterData(this.filters);
  }

  getAllData() {
    this.dataLoading = true;
    this.querySubscription = this._services.getData('email').subscribe(
      (data: any) => {
        this.data = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLoading = false;
      },

      (error: any) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.error = false;
        this.dataLoading = false;
      }
    );
  }

  // Get Filtered Data
  getFilterData(filters: any) {
    this.querySubscription = this._services
      .getFilterData('email', filters)
      .subscribe(
        (data: any) => {
          this.data = data;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        },

        (error: any) => {
          this.error = true;
          this.errorMessage = error.message;
        },
        () => {
          this.error = false;
        }
      );
  }

  // Data Table result view
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteDoc(docId: any) {
    if (confirm('Are you sure to delete this item?')) {
      this.dataLoading = true;
      this.querySubscription = this._services
        .deleteData('email', docId)
        .then((data) => {
          this.savedChanges = true;
          this.dataLoading = false;
        })
        .catch((error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
