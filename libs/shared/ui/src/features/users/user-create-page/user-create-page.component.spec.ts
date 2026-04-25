import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { UserCreatePageComponent } from './user-create-page.component';
import { UserService } from '../services/user.service';

describe('UserCreatePageComponent', () => {
  let component: UserCreatePageComponent;
  let fixture: ComponentFixture<UserCreatePageComponent>;

  const userServiceMock = {
    createUser: () => of({ id: 1, username: 'test', email: 'test@test.com', role: 'user', createdAt: '' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreatePageComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
