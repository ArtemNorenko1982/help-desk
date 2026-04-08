import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-user-details-page',
  imports: [],
  templateUrl: './user-details-page.component.html',
  styleUrl: './user-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsPageComponent {}
