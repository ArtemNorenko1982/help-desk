import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-users-list-page',
  imports: [],
  templateUrl: './users-list-page.component.html',
  styleUrl: './users-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListPageComponent {}
