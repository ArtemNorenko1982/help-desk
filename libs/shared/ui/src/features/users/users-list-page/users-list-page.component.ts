import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  AfterViewInit,
  inject,
  effect,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';

import { UserService } from '../services/user.service';
import { UserModel } from '../../../lib/models/userModel';

@Component({
  selector: 'ui-users-list-page',
  imports: [
    RouterModule,
    DatePipe,
    TitleCasePipe,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListPageComponent implements AfterViewInit {
  private readonly userService = inject(UserService);

  readonly displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'role',
    'createdAt',
    'actions',
  ];
  readonly dataSource = new MatTableDataSource<UserModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly users = toSignal(this.userService.getAllUsers(), {
    initialValue: [] as UserModel[],
  });

  constructor() {
    effect(() => {
      this.dataSource.data = this.users();
    });
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
