import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  OnInit,
  inject,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { UserModel, CreateUserDto, USER_ROLES } from '../../../lib/models/userModel';

export type UserFormMode = 'create' | 'edit';

@Component({
  selector: 'ui-user-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  @Input() mode: UserFormMode = 'create';
  @Input() user: UserModel | null = null;
  @Input() isLoading = false;
  @Input() errorMessage: string | null = null;

  @Output() save = new EventEmitter<CreateUserDto | UserModel>();
  @Output() cancel = new EventEmitter<void>();

  readonly userRoles = Object.entries(USER_ROLES).map(([, value]) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  }));

  readonly userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['user', Validators.required],
  });

  get submitLabel(): string {
    return this.mode === 'create' ? 'Create User' : 'Save Changes';
  }

  get isEditMode(): boolean {
    return this.mode === 'edit';
  }

  ngOnInit(): void {
    if (this.mode === 'edit') {
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();

      if (this.user) {
        this.userForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          role: this.user.role,
        });
      }
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const { username, email, password, role } = this.userForm.getRawValue();

    if (this.mode === 'create') {
      const dto: CreateUserDto = {
        username: username!,
        email: email!,
        password: password!,
        role: USER_ROLES[role as keyof typeof USER_ROLES]!,
      };
      this.save.emit(dto);
    } else {
      const dto: UserModel = {
        id: this.user?.id ?? 0,
        username: username ?? '',
        email: email ?? '',
        role: USER_ROLES[role as keyof typeof USER_ROLES]!,
        createdAt: this.user?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.save.emit(dto);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
