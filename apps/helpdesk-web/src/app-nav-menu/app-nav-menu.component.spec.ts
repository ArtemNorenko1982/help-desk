import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { AppNavMenuComponent } from './app-nav-menu.component';
import { AuthService } from '@shared-ui';
import { NavItem } from './nav-item';

const mockNavItems: NavItem[] = [
  { label: 'Dashboard', icon: '📊', link: '/dashboard' },
  { label: 'Tickets', icon: '🎫', link: '/tickets' },
  { label: 'Reports', icon: '📈', link: '/reports', requiresAuth: true },
  { label: 'Settings', icon: '⚙️', link: '/settings' },
];

function getNavLabels(nativeElement: HTMLElement): string[] {
  return Array.from(
    nativeElement.querySelectorAll<HTMLSpanElement>('a span.truncate')
  ).map((s) => s.textContent?.trim() ?? '');
}

describe('AppNavMenuComponent', () => {
  let component: AppNavMenuComponent;
  let fixture: ComponentFixture<AppNavMenuComponent>;
  const currentUser = signal<{ token: string } | null>(null);

  const authServiceMock = {
    currentUser,
    get isLoggedIn() {
      return !!currentUser();
    },
  };

  beforeEach(async () => {
    currentUser.set(null);

    await TestBed.configureTestingModule({
      imports: [AppNavMenuComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppNavMenuComponent);
    component = fixture.componentInstance;
    component.navItem = mockNavItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render non-protected nav items regardless of auth state', () => {
    const labels = getNavLabels(fixture.nativeElement);
    expect(labels).toContain('Dashboard');
    expect(labels).toContain('Tickets');
    expect(labels).toContain('Settings');
  });

  it('should hide Reports when user is not logged in', () => {
    const labels = getNavLabels(fixture.nativeElement);
    expect(labels).not.toContain('Reports');
  });

  it('should show Reports when user is logged in', async () => {
    currentUser.set({ token: 'fake-token' } as never);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const labels = getNavLabels(fixture.nativeElement);
    expect(labels).toContain('Reports');
  });
});
