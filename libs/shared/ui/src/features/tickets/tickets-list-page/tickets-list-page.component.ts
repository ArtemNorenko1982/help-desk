import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

export interface UserData {
  id: string;
  name: string;
  status: string;
  executor: string;
}

/** Constants used to fill up our data base. */
const EXECUTORS: string[] = [
  'Garry',
  'Andrew',
  'Toto',
  'Kioto',
  'Muhammad',
  'Oleg',
  'Ivan',
  'Sergiy',
];
const NAMES: string[] = [
  'Set new password',
  'New Application request',
  'Laptop disability',
  'Access restriction',
  'Antivirus expired',
  'Account activation',
  'New keyboard request',
  'Set up new printer',
  'Windows issue',
  'Macbook replacement',
  'Mentor request',
];

@Component({
  selector: 'ui-tickets-list-page',
  imports: [
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './tickets-list-page.component.html',
  styleUrl: './tickets-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketsListPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'executor'];
  dataSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    status: Math.round(Math.random() * 100).toString(),
    executor: EXECUTORS[Math.round(Math.random() * (EXECUTORS.length - 1))],
  };
}
