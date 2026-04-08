import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from '../services/user.service';
import { UserModel, CreateUserDto, UpdateUserDto } from '../../../lib/models/userModel';

@Component({
  selector: 'ui-user-edit-page',
  imports: [MatCardModule, MatProgressSpinnerModule, UserFormComponent, NgIf],
  templateUrl: './user-edit-page.component.html',
  styleUrl: './user-edit-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditPageComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly user = signal<UserModel | null>(null);
  readonly isLoading = signal(false);
  readonly isSaving = signal(false);
  readonly errorMessage = signal<string | null>(null);

  private get userId(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    this.isLoading.set(true);
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user.set(user);
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.errorMessage.set(err.message);
        this.isLoading.set(false);
      },
    });
  }

  onSave(dto: CreateUserDto | UpdateUserDto): void {
    const updateDto = dto as UpdateUserDto;
    this.isSaving.set(true);
    this.errorMessage.set(null);

    this.userService.updateUser(this.userId, updateDto).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.router.navigate(['/users', this.userId]);
      },
      error: (err: Error) => {
        this.isSaving.set(false);
        this.errorMessage.set(err.message);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/users', this.userId]);
  }
}
