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
import { RouterModule } from '@angular/router';

import { TicketService } from '../services/ticket.service';
import { TicketModel } from '../../../lib/models/ticket.models';

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
  private readonly ticketService = inject(TicketService);

  readonly displayedColumns: string[] = ['id', 'title'];
  readonly dataSource = new MatTableDataSource<TicketModel>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly tickets = toSignal(this.ticketService.getMyTickets(), {
    initialValue: [] as TicketModel[],
  });

  constructor() {
    effect(() => {
      this.dataSource.data = this.tickets();
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
