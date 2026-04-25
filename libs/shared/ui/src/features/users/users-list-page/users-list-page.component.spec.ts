import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { UsersListPageComponent } from './users-list-page.component';
import { UserService } from '../services/user.service';

describe('UsersListPageComponent', () => {
  let component: UsersListPageComponent;
  let fixture: ComponentFixture<UsersListPageComponent>;

  const userServiceMock = {
    getAllUsers: () => of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListPageComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
