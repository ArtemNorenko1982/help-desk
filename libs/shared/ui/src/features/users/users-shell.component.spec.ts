import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersShellComponentComponent } from './users-shell.component.component';

describe('UsersShellComponentComponent', () => {
  let component: UsersShellComponentComponent;
  let fixture: ComponentFixture<UsersShellComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersShellComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersShellComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
