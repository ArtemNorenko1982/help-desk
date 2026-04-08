import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../../../lib/models/userModel';

@Component({
  selector: 'ui-user-create-page',
  imports: [MatCardModule, UserFormComponent],
  templateUrl: './user-create-page.component.html',
  styleUrl: './user-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreatePageComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  onSave(dto: CreateUserDto | UpdateUserDto): void {
    const createDto = dto as CreateUserDto;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.userService.createUser(createDto).subscribe({
      next: (user) => {
        this.isLoading.set(false);
        this.router.navigate(['/users', user.id]);
      },
      error: (err: Error) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/users']);
  }
}
