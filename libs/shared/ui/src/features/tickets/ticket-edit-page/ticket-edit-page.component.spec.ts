import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketEditPageComponent } from './ticket-edit-page.component';

describe('TicketEditPageComponent', () => {
  let component: TicketEditPageComponent;
  let fixture: ComponentFixture<TicketEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketEditPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
