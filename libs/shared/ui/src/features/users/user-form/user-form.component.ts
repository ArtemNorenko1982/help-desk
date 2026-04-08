import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-user-form',
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {}
