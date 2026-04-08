import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-user-edit-page',
  imports: [],
  templateUrl: './user-edit-page.component.html',
  styleUrl: './user-edit-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditPageComponent {}
