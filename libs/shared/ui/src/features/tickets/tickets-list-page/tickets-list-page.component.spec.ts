import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketsListPageComponent } from './tickets-list-page.component';

describe('TicketsListPageComponent', () => {
  let component: TicketsListPageComponent;
  let fixture: ComponentFixture<TicketsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
