import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-forbidden',
  imports: [],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForbiddenComponent {}
