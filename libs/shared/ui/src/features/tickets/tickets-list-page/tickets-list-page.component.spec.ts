import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TicketsListPageComponent } from './tickets-list-page.component';
import { TicketService } from '../services/ticket.service';

describe('TicketsListPageComponent', () => {
  let component: TicketsListPageComponent;
  let fixture: ComponentFixture<TicketsListPageComponent>;

  const ticketServiceMock = {
    getMyTickets: () => of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsListPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TicketService, useValue: ticketServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
