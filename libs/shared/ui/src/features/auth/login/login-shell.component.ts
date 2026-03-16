import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LoginTabComponent } from './login-tab/login-tab.component';
import { RegisterTabComponent } from './register-tab/register-tab.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ui-login-shell',
  imports: [
    LoginTabComponent,
    RegisterTabComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-shell.component.html',
  styleUrls: ['./login-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginShellComponent {
  readonly errorMessage = signal<string | null>(null);
}
