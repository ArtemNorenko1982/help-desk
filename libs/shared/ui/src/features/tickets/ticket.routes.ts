import { Routes } from '@angular/router';
import { TicketsShellComponent } from './tickets-shell.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { TicketCreatePageComponent } from './ticket-create-page/ticket-create-page.component';
import { TicketEditPageComponent } from './ticket-edit-page/ticket-edit-page.component';
import { TicketsListPageComponent } from './tickets-list-page/tickets-list-page.component';

export const ticketRoutes: Routes = [
  {
    path: '',
    component: TicketsShellComponent,
    children: [
      { path: '', component: TicketsListPageComponent },
      { path: 'create', component: TicketCreatePageComponent },
      { path: ':id', component: TicketDetailsComponent, 
        children: [
            { path: '', component: TicketDetailsComponent, pathMatch: 'full' },
            { path: 'edit', component: TicketEditPageComponent },
        ],
      },
    ],
  },
];