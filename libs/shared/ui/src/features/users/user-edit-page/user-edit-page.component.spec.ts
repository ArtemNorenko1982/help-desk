import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserEditPageComponent } from './user-edit-page.component';
import { UserService } from '../services/user.service';

describe('UserEditPageComponent', () => {
  let component: UserEditPageComponent;
  let fixture: ComponentFixture<UserEditPageComponent>;

  const userServiceMock = {
    getUserById: () => of({ id: 1, username: 'test', email: 'test@test.com', role: 'user', createdAt: '' }),
    updateUser: () => of({ id: 1, username: 'test', email: 'test@test.com', role: 'user', createdAt: '' }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditPageComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
